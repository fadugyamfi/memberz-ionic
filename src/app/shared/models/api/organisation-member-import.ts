/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */

import { AppModel } from './app.model';
import { OrganisationMember } from './organisation-member';

export class OrganisationMemberImport extends AppModel {

  public id: any;
  public organisation_id: number;
  public _organisation_member: OrganisationMember;

  constructor(data) {
    super(data);
  }

  get organisation_member(): OrganisationMember {
    return this._organisation_member;
  }

  set organisation_member(value) {
    this._organisation_member = value ? new OrganisationMember(value) : null;
  }
}
