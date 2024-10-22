/* eslint-disable @typescript-eslint/naming-convention */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export class AppModel {

  public id: any;
  public created: string;
  public modified: string;

  public deleted_at: string;
  public created_at: string;
  public updated_at: string;

  constructor(data: object) {
    this.update(data);
  }

  update(data) {
    Object.assign(this, data);
  }

  whenCreated() {
    return dayjs(this.created || this.created_at).fromNow();
  }

  lastModified() {
    return dayjs(this.modified || this.updated_at).fromNow();
  }

  toJSON() {

    // start with an empty object (see other alternatives below)
    const jsonObj = Object.assign({}, this);

    // add all properties
    const proto = Object.getPrototypeOf(this);
    for (const key of Object.getOwnPropertyNames(proto)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      const hasGetter = desc && typeof desc.get === 'function';
      if (hasGetter) {
        jsonObj[key] = this[key];
      }
    }

    return jsonObj;
  }
}
