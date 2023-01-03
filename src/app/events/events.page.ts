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

  public upcomingEvents$: Observable<OrganisationEvent[]>;
  public pastEvents$: Observable<OrganisationEvent[]>;

  public content = 'upcoming';
  public upcomingCacheKey: string;
  public pastCacheKey: string;

  constructor(
    public authService: AuthService,
    public eventService: OrganisationEventService,
    public router: Router,
    public storage: StorageService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.fetchUpcomingEvents();
    this.fetchPastEvents();
  }

  loadUser() {
    this.user = this.authService.getLoggedInUser();
    this.upcomingCacheKey = `cache:${this.user.member_id}:events:upcoming`;
    this.pastCacheKey = `cache:${this.user.member_id}:events:past`;
  }

  fetchUpcomingEvents() {
    if( this.storage.has(this.upcomingCacheKey) ) {
      this.upcomingEvents$ = of( this.storage.get(this.upcomingCacheKey) );
      return;
    }

    return this.upcomingEvents$ = this.eventService.getUserUpcomingEvents(this.user.member_id)
      .pipe(
        tap(events => this.storage.set(this.upcomingCacheKey, events, 1, 'days'))
      );
  }

  fetchPastEvents() {
    if( this.storage.has(this.pastCacheKey) ) {
      this.pastEvents$ = of( this.storage.get(this.pastCacheKey) );
      return;
    }

    return this.pastEvents$ = this.eventService.getUserPastEvents(this.user.member_id)
      .pipe(
        tap(events => this.storage.set(this.pastCacheKey, events, 1, 'days'))
      );
  }

  loadEventDetails(event: OrganisationEvent) {
    this.eventService.setSelectedModel(event);
    this.router.navigate(['/tabs/pages/events', event.id]);
  }

  handleRefresh(event) {
    this.storage.remove(this.upcomingCacheKey);
    this.fetchUpcomingEvents();
    event.target.complete();
  }

  handleRefreshOfPastEvents(event) {
    this.storage.remove(this.pastCacheKey);
    this.fetchPastEvents();
    event.target.complete();
  }

  setContent(event) {
    this.content = event.target.value;
  }

  showUpcoming() {
    return this.content === 'upcoming';
  }

  showPast() {
    return this.content === 'past';
  }
}
