/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganisationEvent } from '../../shared/models/api/organisation-event';
import { OrganisationEventAttendee } from '../../shared/models/api/organisation-event-attendee';
import { OrganisationEventSession } from '../../shared/models/api/organisation-event-session';
import { OrganisationEventSessionService } from '../../shared/services/api/organisation-event-session.service';
import { OrganisationEventService } from '../../shared/services/api/organisation-event.service';
import { OrganisationService } from '../../shared/services/api/organisation.service';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.page.html',
    styleUrls: ['./event-details.page.scss'],
    standalone: false
})
export class EventDetailsPage implements OnInit {

  public attendanceSession: OrganisationEventSession;
  public recentAttendees: OrganisationEventAttendee[] = null;

  public scanning = false;
  public searching = false;
  public captures = [];

  private iEvent: OrganisationEvent;

  constructor(
    public eventService: OrganisationEventService,
    public organisationService: OrganisationService,
    public sessionService: OrganisationEventSessionService,
    public route: ActivatedRoute,
    public router: Router
  ) { }


  get event(): OrganisationEvent {
    return this.iEvent;
  }

  set event(value: OrganisationEvent) {
    this.iEvent = value;
    if( value ) {
      this.organisationService.setActiveOrganisation(value.organisation);
    }
  }


  ngOnInit() {
    this.loadEvent();
  }

  loadEvent() {
    this.event = this.eventService.getSelectedModel();

    if( !this.event ) {
      const eventId = this.route.snapshot.paramMap.get('id');

      if( !eventId ) {
        this.router.navigate(['/tabs/pages/events']);
        return;
      }

      this.eventService.getById(eventId, { contain: ['sessions', 'organisation'].join(',')}).subscribe({
        next: (event) => {
          this.event = event;
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/tabs/pages/events']);
        }
      });
    }
  }

  setAttendanceSession(session: OrganisationEventSession) {
    this.sessionService.setSelectedModel(session);
    this.router.navigate(['/tabs/pages/events', this.event.id, 'sessions', session.id]);
  }

  onWillDismiss(dismiss) {

  }

  confirmEnroll() {

  }

  cancelEnroll() {
    this.attendanceSession = null;
  }

}
