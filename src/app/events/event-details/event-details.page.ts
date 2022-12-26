/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { OrganisationEvent } from '../../shared/models/api/organisation-event';
import { OrganisationEventAttendee } from '../../shared/models/api/organisation-event-attendee';
import { OrganisationEventSession } from '../../shared/models/api/organisation-event-session';
import { ApiResponse } from '../../shared/services/api/api.service';
import { OrganisationEventService } from '../../shared/services/api/organisation-event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  @ViewChild('scanner') scanner: NgxScannerQrcodeComponent;

  public event: OrganisationEvent;
  public attendanceSession: OrganisationEventSession;
  public recentAttendees: OrganisationEventAttendee[] = null;

  public captures = [];
  public capturing = false;
  public scanning = false;

  constructor(
    public eventService: OrganisationEventService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

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

      this.eventService.getById(eventId).subscribe({
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

  fetchAttendees() {
    const params = {
      organisation_id: this.event.organisation_id,
      organisation_event_session_id: this.attendanceSession.id,
      limit: 25, sort: 'latest'
    };

    this.recentAttendees = null;

    this.eventService.getAttendees(this.event, params)
      .subscribe({
        next: (attendees) => this.recentAttendees = attendees
      });
  }

  isAttendanceSessionSet() {
    return this.attendanceSession != null;
  }

  setAttendanceSession(session) {
    this.attendanceSession = session;
    this.fetchAttendees();
  }

  scanQRCode() {
    this.scanning = true;

    setTimeout(async () => {
      this.scanner.start();
    }, 400);
  }

  async hideScanner() {
    this.scanner.stop();
    this.scanning = false;
  }

  async onCodeScanned(code: ScannerQRCodeResult) {

    console.log(code);

    if( this.capturing || code == null || !this.isValidMemberCode(code.data) ) {
      return;
    }

    if( this.captures.indexOf(code) > -1 ) {
      Swal.fire('Registered', 'Please try again later', 'error');
      return;
    }

    this.capturing = true;
    // this.hideScanner();

    Swal.fire('Registering', 'Please wait...', 'info');
    Swal.showLoading();

    this.eventService.registerMemberByQRCode({
      membership_uuid: code.data,
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

    setTimeout(() => this.capturing = false, 3000);
    return;
  }

  isValidMemberCode(code: string) {
    return this.checkIfValidUUID(code);
  }

  onWillDismiss(dismiss) {

  }

  confirmEnroll() {

  }

  cancelEnroll() {
    this.attendanceSession = null;
  }

  /* Check if string is valid UUID */
  checkIfValidUUID(str) {
    // Regular expression to check if string is a valid UUID
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    return regexExp.test(str);
  }
}
