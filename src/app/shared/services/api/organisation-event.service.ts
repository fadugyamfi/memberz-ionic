/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { ApiResponse, APIService } from './api.service';
import { EventsService } from '../events.service';
import { HttpClient } from '@angular/common/http';
import { OrganisationEvent } from '../../models/api/organisation-event';
import { StorageService } from '../storage.service';
import { map, Observable, of, tap, throwError } from 'rxjs';
import { OrganisationEventAttendee } from '../../models/api/organisation-event-attendee';

interface EventAttendeeRequest {
  organisation_id: number;
  organisation_event_id: number;
  organisation_event_session_id: number;
  membership_uuids?: string[];
  organisation_member_ids?: number[];
  member_ids?: number[];
}

@Injectable({
  providedIn: 'root'
})
export class OrganisationEventService extends APIService<OrganisationEvent> {

  constructor(http: HttpClient, protected events: EventsService, protected storage: StorageService) {
    super(http, events, storage);

    this.url = '/events';
    this.model =  OrganisationEvent;
    this.model_name = 'OrganisationEvent';
  }

  public getAttendees(event: OrganisationEvent, options = {}): Observable<OrganisationEventAttendee[]> {
    return this.get(`${this.url}/${event.id}/attendees`, options).pipe(
      map((response: ApiResponse) => response.data.map(data => new OrganisationEventAttendee(data)))
    );
  }

  statistics() {
    return this.get(`${this.url}/statistics`);
  }

  getUserUpcomingEvents(memberId: number): Observable<OrganisationEvent[]> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const params = { member_id: memberId };

    return this.get(`/members/${memberId}/upcoming-events`, params).pipe(
      map((response: ApiResponse) => response.data.map(data => new OrganisationEvent(data)))
    );
  }

  getUserPastEvents(memberId: number): Observable<OrganisationEvent[]> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const params = { member_id: memberId };

    return this.get(`/members/${memberId}/past-events`, params).pipe(
      map((response: ApiResponse) => response.data.map(data => new OrganisationEvent(data)))
    );
  }

  registerMemberByQRCode(request: EventAttendeeRequest, options = {}): Observable<OrganisationEventAttendee[]> {
    return this.post(`/events/${request.organisation_event_id}/register`, request).pipe(
      map(
        (response: ApiResponse) => {
          if( response.data.skipped.length > 0 && response.data.attendees.length === 0 ) {
            throw new Error('Guest(s) already registered');
          }

          return response.data.attendees.map(attendee => new OrganisationEventAttendee(attendee));
        }
      )
    );
  }
}
