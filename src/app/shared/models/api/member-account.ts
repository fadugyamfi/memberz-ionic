/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */

import { AppModel } from './app.model';
import { Member } from './member';

export class MemberAccount extends AppModel {

  public id: any;
  public _member: Member;
  public username: string;
  public deleted: boolean;
  public active: boolean;
  public timezone: string;

  public member_id: number;
  public organisation_account: any[];
  public email_2fa: number;

  constructor(data) {
    super(data);
  }

  get member() {
    return this._member;
  }

  set member(value) {
    this._member = value ? new Member(value) : null;
  }

  firstName() {
    return this.member.first_name;
  }

  name() {
    return this.member.name();
  }

  occupation() {
    return this.member.occupation;
  }

  photoURL() {
    return this.member.profile_photo && this.member.profile_photo.url;
  }

  thumbPhotoURL() {
    return this.member.profile_photo && this.member.profile_photo.thumb_url;
  }

  isOrganisationAdmin(organisation_id: number) {
    return this.organisation_account &&
           this.organisation_account.some(account => account.organisation_id === organisation_id);
  }

  getOrganisationAccount(organisation_id: number) {
    return this.isOrganisationAdmin(organisation_id) ?
           this.organisation_account.find(account => account.organisation_id === organisation_id) :
           null;
  }

  isTwoFactorAuthEnabled() {
    return this.email_2fa === 1;
  }
}
