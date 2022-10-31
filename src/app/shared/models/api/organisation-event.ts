/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */

import * as moment from 'moment';
import { AppModel } from './app.model';
import { Organisation } from './organisation';
import { OrganisationCalendar } from './organisation-calendar';

export class OrganisationEvent extends AppModel {

  public id: string|number;
  public organisation_id: number;
  public event_name: string;
  public short_description: string;
  public long_description: string;
  public start_dt: any;
  public end_dt: any;
  private _organisation: Organisation;
  public _organisation_calendar;
  public all_day: boolean;
  public sessions: any;
  public venue: string;
  public photo: string;
  public photo_thumbnail: string;
  public photo_url: string;

  constructor(data) {
    super(data);
  }

  get organisation() {
    return this._organisation;
  }

  set organisation(value) {
    this._organisation = value ? new Organisation(value) : null;
  }

  get organisation_calendar(): OrganisationCalendar {
    return this._organisation_calendar;
  }

  set organisation_calendar(value) {
    this._organisation_calendar = value ? new OrganisationCalendar(value) : null;
  }



  get dates() {
    const start_dt = moment(this.start_dt);
    const end_dt = moment(this.end_dt);

    if( start_dt.isSame(end_dt, 'month') && !start_dt.isSame(end_dt, 'day') ) {
      return start_dt.format('Do') + ' - ' + end_dt.format('Do MMM, YYYY');
    }

    if( start_dt.isSame(end_dt, 'day') ) {
      if( this.all_day ) {
        return 'All Day';
      }

      return start_dt.format('Do MMM, YYYY');
    }

    if( this.all_day ) {
      return start_dt.format('Do MMM') + ' - ' + end_dt.format('Do MMM, YYYY');
    }

    return start_dt.format('Do MMM') + ' - ' + end_dt.format('Do MMM, YYYY');
  }

  get times() {
    const start_dt = moment(this.start_dt);
    const end_dt = moment(this.end_dt);

    if( start_dt.isSame(end_dt, 'month') && !start_dt.isSame(end_dt, 'day') ) {
      return start_dt.format('HH:mm') + ' - ' + end_dt.format('HH:mm');
    }

    if( start_dt.isSame(end_dt, 'day') ) {
      if( this.all_day ) {
        return 'All Day';
      }

      return `${start_dt.format('HH:mm')} - ${end_dt.format('HH:mm')}`;
    }

    return start_dt.format('HH:mm') + ' - ' + end_dt.format('HH:mm');
  }
}
