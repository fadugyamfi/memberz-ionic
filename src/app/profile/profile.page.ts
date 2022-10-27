import { Component } from '@angular/core';
import { AuthService } from '../shared/services/api/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage {

  constructor(
    public authService: AuthService
  ) {}

  doLogout() {
    this.authService.logout();
  }
}
