import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberAccount } from '../shared/models/api/member-account';
import { OrganisationEvent } from '../shared/models/api/organisation-event';
import { AuthService } from '../shared/services/api/auth.service';
import { OrganisationEventService } from '../shared/services/api/organisation-event.service';

@Component({
  selector: 'app-events',
  templateUrl: 'events.page.html',
  styleUrls: ['events.page.scss']
})
export class EventsPage implements OnInit {

  public user: MemberAccount;
  public events$: Observable<OrganisationEvent[]>;

  constructor(
    public authService: AuthService,
    public eventService: OrganisationEventService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.fetchUpcomingEvents();
  }

  loadUser() {
    this.user = this.authService.getLoggedInUser();
  }

  fetchUpcomingEvents() {
    this.events$ = this.eventService.getUserUpcomingEvents(this.user.member_id);
  }

  loadEventDetails(event: OrganisationEvent) {
    this.eventService.setSelectedModel(event);
    this.router.navigate(['/tabs/pages/events', event.id]);
  }
}
