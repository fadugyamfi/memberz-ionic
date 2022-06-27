/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */

import { AppModel } from './app.model';
import { OrganisationSubscription } from './organisation-subscription';
import { OrganisationType } from './organisation-type';

export class Organisation extends AppModel {

  public id: any;
  public uuid: string;
  public name: string;
  public email: string;
  public phone: string;
  public logo: string;
  public country_id: number;
  public currency_id: number;
  public slug: string;
  public address: string;
  public city: string;
  public state: string;
  private _activeSubscription: OrganisationSubscription;
  private _organisationType: OrganisationType;

  constructor(data) {
    super(data);
  }

  get active_subscription(): OrganisationSubscription {
    return this._activeSubscription;
  }

  set active_subscription(value) {
    this._activeSubscription = value ? new OrganisationSubscription(value) : null;
  }

  get organisation_type(): OrganisationType {
    return this._organisationType;
  }

  set organisation_type(value) {
    this._organisationType = value ? new OrganisationType(value) : null;
  }
}
