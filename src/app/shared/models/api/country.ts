
import { AppModel } from './app.model';

export class Country extends AppModel {

  public id: any;
  public name: string;
  public capital: string;
  public active: number;

  constructor(data) {
    super(data);
  }
}
