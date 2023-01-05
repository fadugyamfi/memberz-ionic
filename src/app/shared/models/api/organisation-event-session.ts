/* eslint-disable @typescript-eslint/naming-convention */

import { AppModel } from './app.model';


export class OrganisationEventSession extends AppModel {

  public id: any;
  public organisation_id: number;
  public organisation_event_id: number;
  public session_name: string;
  public session_dt: any;
  public attendees_count: number;

  constructor(data) {
    super(data);
  }

  get name() {
    return this.session_name;
  }
}
