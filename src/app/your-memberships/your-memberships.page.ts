import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberAccount } from '../shared/models/api/member-account';
import { OrganisationMember } from '../shared/models/api/organisation-member';
import { AuthService } from '../shared/services/api/auth.service';
import { OrganisationMemberService } from '../shared/services/api/organisation-member.service';

@Component({
  selector: 'app-your-memberships',
  templateUrl: './your-memberships.page.html',
  styleUrls: ['./your-memberships.page.scss'],
})
export class YourMembershipsPage implements OnInit {

  public memberships$: Observable<OrganisationMember[]>;
  public user: MemberAccount;

  constructor(
    public membershipService: OrganisationMemberService,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadUser();
    this.fetchUserMemberships();
  }

  loadUser() {
    this.user = this.authService.getLoggedInUser();
  }

  fetchUserMemberships() {
    const user = this.authService.getLoggedInUser();
    this.memberships$ = this.membershipService.getUserMemberships( user.member_id );
  }

  discover() {
    this.router.navigate(['/discover']);
  }
}
