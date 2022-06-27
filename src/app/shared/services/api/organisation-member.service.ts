import { Injectable } from '@angular/core';
import { ApiResponse, APIService } from './api.service';
import { EventsService } from '../events.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { OrganisationMember } from '../../models/api/organisation-member';
import { StorageService } from '../storage.service';
import { OrganisationService } from './organisation.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganisationMemberService extends APIService<OrganisationMember> {

  constructor(
    protected http: HttpClient,
    protected events: EventsService,
    protected storage: StorageService,
    protected organisationService: OrganisationService
  ) {
    super(http, events, storage);

    this.url = '/organisation_members';
    this.model =  OrganisationMember;
    this.model_name = 'OrganisationMember';
  }

  getUserMemberships(memberId: number): Observable<OrganisationMember[]> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const params = { member_id: memberId, contain: 'organisation' };

    return this.get(`${this.url}`, params).pipe(
      map((response: ApiResponse) => response.data.map(data => new OrganisationMember(data)))
    );
  }

  findMembers(options: object, page = 1, limit = 30): Observable<OrganisationMember[]> {
    const params = Object.assign(options, {
      page,
      limit,
      sort: 'last_name:asc'
    });

    return this.search(params);
  }

  getProfile(id: number) {
    const params = {};

    return this.getById(id, params);
  }

  approveRegistration(membership: OrganisationMember) {
    membership.approved = 1;
    membership.active = 1;

    return this.update(membership);
  }

  rejectRegistration(membership: OrganisationMember) {
    membership.approved = 0;
    membership.active = 0;

    return this.update(membership);
  }

  statistics() {
    const organisation = this.organisationService.getActiveOrganisation();

    return this.get(`/organisations/${organisation.id}/memberships/statistics`).pipe(
      map((response: ApiResponse) => response.data.map(result => ({ value: result.total, name: result.category_name }))));
  }

  unapproved(options = {}) {
    return this.get(`${this.url}/unapproved`, options).pipe(
      map((response: ApiResponse) => response.data.map(result => new OrganisationMember(result)))
    );
  }

  birthdays(options = {}) {
    return this.get(`${this.url}/birthdays`, options);
  }

  birthdaySummary(options = {}) {
    return this.get(`${this.url}/birthdays/summary`, options);
  }
}
