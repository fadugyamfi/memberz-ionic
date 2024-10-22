/* eslint-disable @typescript-eslint/member-ordering */

import { AppModel } from './app.model';
import dayjs from 'dayjs';
import { SubscriptionType } from './subscription-type';
import { OrganisationInvoice } from './organisation-invoice';

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export class OrganisationSubscription extends AppModel {

  public id: any;
  /* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
  public organisation_id: number;
  public start_dt: string;
  public end_dt: string;
  public _subscription_type: SubscriptionType;
  public subscription_type_id: number;
  public _organisation_invoice: any;

  constructor(data) {
    super(data);
  }

  get subscription_type() {
    return this._subscription_type;
  }

  set subscription_type(value) {
    this._subscription_type = value ? new SubscriptionType(value) : null;
  }

  get organisation_invoice(): OrganisationInvoice {
    return this._organisation_invoice;
  }

  set organisation_invoice(value) {
    this._organisation_invoice = value ? new OrganisationInvoice(value) : null;
  }



  expiresIn(): string {
    if( this.validForever() ) {
      return 'Never Expires';
    }

    const daysRemaining = dayjs(this.end_dt).fromNow();

    return this.isExpired() ? `Expired ${daysRemaining}` : `Expires ${daysRemaining}`;
  }

  validForever() {
    return this.subscription_type && this.subscription_type.validity === 'forever';
  }

  isExpired(): boolean {
    return !this.validForever() && dayjs(this.end_dt).isBefore(dayjs());
  }

  isExpiring() {
    return !this.isExpired() && !this.validForever() && dayjs(this.end_dt).subtract(60, 'days').isBefore(dayjs());
  }

  invoicePaid(): boolean {
    return this.organisation_invoice != null && this.organisation_invoice.paid;
  }

  isFreePlan() {
    return this.subscription_type?.description === 'Free Plan';
  }

  isBasicPlan() {
    return this.subscription_type?.description === 'Basic Plan';
  }

  isProPlan() {
    return this.subscription_type?.description === 'Pro Plan';
  }

  canAccessFinance() {
    return this.subscription_type?.revenue_tracking === 1;
  }

  /**
   * Returns the cost of renewal with discount pre-calculated
   *
   * @param sub_length length of the subscription in months
   */
  nextRenewalCost(sub_length: number) {
    const length = sub_length === 12 ? sub_length - 2 : (sub_length === 6 ? sub_length - 1 : sub_length);

    return this.subscription_type.renewal_price * length;
  }

  nextRenewalDate(sub_length: number) {
    return this.isExpired() ? dayjs().add(sub_length, 'month') : dayjs(this.end_dt).add(sub_length, 'month');
  }
}
