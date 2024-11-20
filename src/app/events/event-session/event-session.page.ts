/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { MemberAccount } from '../../shared/models/api/member-account';
import { OrganisationEvent } from '../../shared/models/api/organisation-event';
import { OrganisationEventAttendee } from '../../shared/models/api/organisation-event-attendee';
import { OrganisationEventSession } from '../../shared/models/api/organisation-event-session';
import { OrganisationMember } from '../../shared/models/api/organisation-member';
import { AuthService } from '../../shared/services/api/auth.service';
import { OrganisationEventAttendeeService } from '../../shared/services/api/organisation-event-attendee.service';
import { OrganisationEventSessionService } from '../../shared/services/api/organisation-event-session.service';
import { OrganisationEventService } from '../../shared/services/api/organisation-event.service';
import { OrganisationService } from '../../shared/services/api/organisation.service';
import { addIcons } from 'ionicons';
import { camera, search, add, trash } from 'ionicons/icons';

const SwAlert = Swal.mixin({
    heightAuto: false
});

@Component({
    selector: 'app-event-session',
    templateUrl: './event-session.page.html',
    styleUrls: ['./event-session.page.scss'],
    standalone: false
})
export class EventSessionPage implements OnInit {

    public attendanceSession: OrganisationEventSession;
    public recentAttendees: OrganisationEventAttendee[] = null;

    public scanning = false;
    public searching = false;
    public adding = false;
    public captures = [];

    public event: OrganisationEvent;
    public session: OrganisationEventSession;
    public user: MemberAccount;

    constructor(
        public eventService: OrganisationEventService,
        public organisationService: OrganisationService,
        public sessionService: OrganisationEventSessionService,
        public attendeeService: OrganisationEventAttendeeService,
        public route: ActivatedRoute,
        public router: Router,
        public authService: AuthService
    ) {
        addIcons({ camera, search, add, trash });
    }

    ngOnInit() {
        this.loadSession();
        this.user = this.authService.getLoggedInUser();
    }

    userIsAdmin() {
        return this.user?.isOrganisationAdmin(this.session?.organisation_id);
    }

    getEventDetailsURL() {
        return `/tabs/pages/events/${this.route.snapshot.paramMap.get('id')}`;
    }

    loadSession() {
        this.session = this.sessionService.getSelectedModel();
        this.event = this.eventService.getSelectedModel();

        if (!this.session) {
            const sessionId = this.route.snapshot.paramMap.get('session_id');

            if (!sessionId) {
                this.router.navigate([this.getEventDetailsURL()]);
                return;
            }

            this.sessionService.getById(sessionId, { count: ['attendees'].join(',') }).subscribe({
                next: (session) => {
                    this.session = session;
                    this.fetchAttendees();
                },
                error: (error) => this.router.navigate([this.getEventDetailsURL()])
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

    addMembership() {
        this.adding = true;
    }

    async onCodeScanned(code: string) {

        if (code == null || !this.isValidMemberCode(code)) {
            return;
        }

        if (this.captures.indexOf(code) > -1) {
            SwAlert.fire('Already Registered', 'Please register a different guest', 'error');
            return;
        }

        await this.registerMembers([code]);
        this.captures.push(code);
    }

    async registerMembers(codes: string[]) {
        SwAlert.fire('Registering', 'Please wait...', 'info');
        SwAlert.showLoading();

        return this.eventService.registerMemberByQRCode({
            membership_uuids: codes,
            organisation_id: this.session.organisation_id,
            organisation_event_session_id: this.session.id,
            organisation_event_id: this.session.organisation_event_id
        }).subscribe({
            next: (attendees: OrganisationEventAttendee[]) => {
                if (attendees.length > 0) {
                    this.recentAttendees.unshift(...attendees);
                    const names = attendees.map(attendee => attendee.member.name()).join('<br />');

                    SwAlert.fire(`Registered ${attendees.length}/${codes.length} Successfully`, names, 'info');
                    SwAlert.hideLoading();
                } else {
                    SwAlert.fire('Registration Failed', 'No members registered', 'error');
                }
            },
            error: (error) => {
                const message = error.error?.message || error.message;
                SwAlert.fire('Registration Failed', `${message}`, 'error');
                SwAlert.hideLoading();
            }
        });
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

    onCloseAddModal() {
        this.adding = false;
    }

    onMemberRegistered(attendee) {
        this.recentAttendees.unshift(attendee);
    }

    onMembersSelected(memberships: OrganisationMember[]) {
        this.searching = false;
        this.registerMembers(memberships.map(membership => membership.uuid));
    }

    onMemberAdded(membership: OrganisationMember) {
        this.adding = false;
        this.registerMembers([membership.uuid]);
    }

    isAttendanceSessionSet() {
        return this.attendanceSession != null;
    }

    setAttendanceSession(session) {
        this.attendanceSession = session;
        this.fetchAttendees();
    }

    removeAttendee(attendee: OrganisationEventAttendee) {
        SwAlert.fire({
            title: 'Remove Attendee',
            text: 'Are you sure you want to remove this attendee from this event session?',
            icon: 'warning',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showCancelButton: true
        }).then(
            (response) => {
                if (response.isConfirmed) {
                    this.attendeeService.remove(attendee);

                    const index = this.recentAttendees.findIndex(item => item.id === attendee.id);
                    this.recentAttendees.splice(index, 1);
                }
            }
        );
    }
}
