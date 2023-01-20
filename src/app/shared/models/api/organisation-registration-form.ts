/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */

import * as dayjs from 'dayjs';
import { AppModel } from './app.model';

export class OrganisationRegistrationForm extends AppModel {

  public id: any;
  public uuid: string;
  public slug: string;
  public name: string;
  public description: string;
  public _expiration_dt: string;
  public excluded_standard_fields: any;
  public _custom_fields: string;
  public deleted_at: string;
  public organisation_id: number;
  public organisation_member_category_id: number;
  public decoded_custom_fields;

  constructor(data) {
    super(data);
  }

  get custom_fields() {
    return this._custom_fields;
  }

  get isClosed() {
    return dayjs().isAfter( dayjs(this.expiration_dt) );
  }

  get expiration_dt() {
    return this._expiration_dt;
  }

  set expiration_dt(value) {
    this._expiration_dt = value;
  }

  set custom_fields(value) {
    this._custom_fields = value;

    if( value && typeof value == 'string' ) {
      this.decoded_custom_fields = JSON.parse(this._custom_fields);
    }
  }


  excludesBusinessName() {
    return this.excludesField('business_name');
  }

  excludesOccupation() {
    return this.excludesField('occupation');
  }

  excludesEmail() {
    return this.excludesField('email');
  }

  excludesProfession() {
    return this.excludesField('profession');
  }

  excludesGender() {
    return this.excludesField('gender');
  }

  excludesBirthDate() {
    return this.excludesField('dob');
  }

  private excludesField(fieldName) {
    return this.excluded_standard_fields?.split(',').includes(fieldName);
  }

}
