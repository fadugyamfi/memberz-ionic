import { Component, OnInit } from '@angular/core';
import { MemberAccount } from '../shared/models/api/member-account';
import { AuthService } from '../shared/services/api/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  public user: MemberAccount;

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser();
  }

  doLogout() {
    this.authService.logout();
  }

  doRefresh() {
    window.location.reload();
  }
}
