import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, of, tap } from 'rxjs';
import { MemberAccount } from '../shared/models/api/member-account';
import { OrganisationEvent } from '../shared/models/api/organisation-event';
import { AuthService } from '../shared/services/api/auth.service';
import { OrganisationEventService } from '../shared/services/api/organisation-event.service';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-events',
  templateUrl: 'events.page.html',
  styleUrls: ['events.page.scss']
})
export class EventsPage implements OnInit {

  public user: MemberAccount;
  public events$: Observable<OrganisationEvent[]>;

  public cacheKey: string;

  constructor(
    public authService: AuthService,
    public eventService: OrganisationEventService,
    public router: Router,
    public storage: StorageService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.fetchUpcomingEvents();
  }

  loadUser() {
    this.user = this.authService.getLoggedInUser();
    this.cacheKey = `cache:${this.user.member_id}:events`;
  }

  fetchUpcomingEvents() {
    if( this.storage.has(this.cacheKey) ) {
      this.events$ = of( this.storage.get(this.cacheKey) );
      return;
    }

    return this.events$ = this.eventService.getUserUpcomingEvents(this.user.member_id)
      .pipe(
        tap(events => this.storage.set(this.cacheKey, events, 1, 'days'))
      );
  }

  loadEventDetails(event: OrganisationEvent) {
    this.eventService.setSelectedModel(event);
    this.router.navigate(['/tabs/pages/events', event.id]);
  }

  handleRefresh(event) {
    this.storage.remove(this.cacheKey);
    this.fetchUpcomingEvents();
    event.target.complete();
  }
}
