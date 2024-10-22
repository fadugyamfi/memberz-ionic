/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */

import { AppModel } from './app.model';
import { Member } from './member';
import { Organisation } from './organisation';
import { OrganisationEventAttendee } from './organisation-event-attendee';
import { OrganisationMemberCategory } from './organisation-member-category';
import { OrganisationRegistrationForm } from './organisation-registration-form';

export class OrganisationMember extends AppModel {

  public id: any;
  public uuid: string;
  public selected = false;
  public _member: Member;
  public organisation_no: string;
  public organisation_id: number;
  public approved: number;
  public active: number;
  public member_id: number;
  public _organisation_member_category: OrganisationMemberCategory;
  public _organisation_registration_form: OrganisationRegistrationForm;
  public event_attendee: OrganisationEventAttendee;
  public _organisation: Organisation;
  public membership_start_dt: string;
  public membership_end_dt: string;

  constructor(data) {
    super(data);
  }

  get member(): Member {
    return this._member;
  }

  set member(value) {
    this._member = value ? new Member(value) : null;
  }

  get organisation_member_category() {
    return this._organisation_member_category;
  }

  set organisation_member_category(value) {
    this._organisation_member_category = value ? new OrganisationMemberCategory(value) : null;
  }

  get category() {
    return this.organisation_member_category;
  }

  set category(value) {
    // noop
  }

  get organisation_registration_form() {
    return this._organisation_registration_form;
  }

  set organisation_registration_form(value) {
    this._organisation_registration_form = value ? new OrganisationRegistrationForm(value) : null;
  }

  get organisation(): Organisation {
    return this._organisation;
  }

  set organisation(value) {
    this._organisation = value ? new Organisation(value) : null;
  }

  name() {
    return this.member && this.member.firstThenLastName();
  }

  nameLastFirst() {
    return this.member && this.member.lastThenFirstName();
  }

  fullname() {
    return this.member && this.member.fullname();
  }


  pendingApproval() {
    // eslint-disable-next-line eqeqeq
    return this.approved == 0 && this.active == 1;
  }


}
