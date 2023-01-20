/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */

import { AppModel } from './app.model';
import { OrganisationMember } from './organisation-member';
import { ContributionReceipt } from './contribution-receipt';
import { ContributionType } from './contribution-type';
import * as dayjs from 'dayjs';

export class Contribution extends AppModel {

  public id: any;
  public organisation_member_id: number;
  public amount: number;
  public week: number;
  public month: number;
  public year: number;
  public _organisation_member: OrganisationMember;
  public _contribution_receipt: ContributionReceipt;
  public _contribution_type: ContributionType;
  public currency_code: string;
  public currency_id: number;
  public receipt_dt: string;
  public receipt_no: string;
  public description: string;

  constructor(data) {
    super(data);
  }

  get organisation_member(): OrganisationMember {
    return this._organisation_member;
  }

  set organisation_member(value) {
    this._organisation_member = new OrganisationMember(value);
  }

  get contribution_receipt(): ContributionReceipt {
    return this._contribution_receipt;
  }

  set contribution_receipt(value) {
    this._contribution_receipt = new ContributionReceipt(value);
  }

  get contribution_type(): ContributionType {
    return this._contribution_type;
  }

  set contribution_type(value) {
    this._contribution_type = new ContributionType(value);
  }

  period() {
    const month = dayjs().month(this.month - 1).format('MMM');
    return `Wk ${this.week}, ${month} ${this.year}`;
  }
}
