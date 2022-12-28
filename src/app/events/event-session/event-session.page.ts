/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OrganisationEvent } from '../../shared/models/api/organisation-event';
import { OrganisationEventAttendee } from '../../shared/models/api/organisation-event-attendee';
import { OrganisationEventSession } from '../../shared/models/api/organisation-event-session';
import { OrganisationEventSessionService } from '../../shared/services/api/organisation-event-session.service';
import { OrganisationEventService } from '../../shared/services/api/organisation-event.service';
import { OrganisationService } from '../../shared/services/api/organisation.service';

@Component({
  selector: 'app-event-session',
  templateUrl: './event-session.page.html',
  styleUrls: ['./event-session.page.scss'],
})
export class EventSessionPage implements OnInit {

  public attendanceSession: OrganisationEventSession;
  public recentAttendees: OrganisationEventAttendee[] = null;

  public scanning = false;
  public searching = false;
  public captures = [];

  public event: OrganisationEvent;
  public session: OrganisationEventSession;

  constructor(
    public eventService: OrganisationEventService,
    public organisationService: OrganisationService,
    public sessionService: OrganisationEventSessionService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadSession();
  }

  getEventDetailsURL() {
    return `/tabs/pages/events/${this.route.snapshot.paramMap.get('id')}`;
  }

  loadSession() {
    this.session = this.sessionService.getSelectedModel();
    this.event = this.eventService.getSelectedModel();

    if( !this.session ) {
      const sessionId = this.route.snapshot.paramMap.get('session_id');

      if( !sessionId ) {
        this.router.navigate([ this.getEventDetailsURL() ]);
        return;
      }

      this.sessionService.getById(sessionId).subscribe({
        next: (session) => {
          this.session = session;
          this.fetchAttendees();
        },
        error: (error) => this.router.navigate([ this.getEventDetailsURL() ])
      });
    } else {
      this.fetchAttendees();
    }
  }

  fetchAttendees() {
    const params = {
      organisation_id: this.session.organisation_id,
      organisation_event_session_id: this.session.id,
      limit: 25,
      sort: 'latest'
    };

    this.recentAttendees = null;

    const event = this.event || new OrganisationEvent({ id: this.session.organisation_event_id });

    this.eventService.getAttendees(event, params)
      .subscribe({
        next: (attendees) => this.recentAttendees = attendees
      });
  }

  scanQRCode() {
    this.scanning = true;
  }

  searchMemberships() {
    this.searching = true;
  }

  async onCodeScanned(code: string) {

    if( code == null || !this.isValidMemberCode(code) ) {
      return;
    }

    if( this.captures.indexOf(code) > -1 ) {
      Swal.fire('Registered', 'Please try again later', 'error');
      return;
    }

    // this.capturing = true;
    // this.hideScanner();

    Swal.fire('Registering', 'Please wait...', 'info');
    Swal.showLoading();

    this.eventService.registerMemberByQRCode({
      membership_uuid: code,
      organisation_id: this.attendanceSession.organisation_id,
      organisation_event_session_id: this.attendanceSession.id,
      organisation_event_id: this.attendanceSession.organisation_event_id
    }).subscribe({
      next: (attendee: OrganisationEventAttendee) => {
        this.captures.push(code);
        this.recentAttendees.unshift(attendee);

        Swal.fire('Registered', `${attendee.member.name()} registed successfully`, 'info');
        Swal.hideLoading();
      },
      error: (error) => {
        Swal.fire('Registration Failed', `${error.error.message}`, 'error');
        Swal.hideLoading();
      }
    });

    // setTimeout(() => this.capturing = false, 3000);
    return;
  }

  isValidMemberCode(code: string) {
    return this.checkIfValidUUID(code);
  }

  /* Check if string is valid UUID */
  checkIfValidUUID(str) {
    // Regular expression to check if string is a valid UUID
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    return regexExp.test(str);
  }

  onHideScanner() {
    this.scanning = false;
  }

  onMemberRegistered(attendee) {
    this.recentAttendees.unshift(attendee);
  }

  isAttendanceSessionSet() {
    return this.attendanceSession != null;
  }

  setAttendanceSession(session) {
    this.attendanceSession = session;
    this.fetchAttendees();
  }
}
