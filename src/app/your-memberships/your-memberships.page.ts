import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberAccount } from '../shared/models/api/member-account';
import { Organisation } from '../shared/models/api/organisation';
import { OrganisationMember } from '../shared/models/api/organisation-member';
import { AuthService } from '../shared/services/api/auth.service';
import { OrganisationMemberService } from '../shared/services/api/organisation-member.service';
import { OrganisationService } from '../shared/services/api/organisation.service';

@Component({
  selector: 'app-your-memberships',
  templateUrl: './your-memberships.page.html',
  styleUrls: ['./your-memberships.page.scss'],
})
export class YourMembershipsPage implements OnInit {

  public memberships$: Observable<OrganisationMember[]>;
  public user: MemberAccount;
  public content = 'organisations';
  public organisations$: Observable<Organisation[]>;

  constructor(
    public membershipService: OrganisationMemberService,
    public organisationService: OrganisationService,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadUser();
    this.fetchUserMemberships();
    this.fetchUserOrganisations();
  }

  loadUser() {
    this.user = this.authService.getLoggedInUser();
  }

  fetchUserMemberships() {
    const user = this.authService.getLoggedInUser();
    this.memberships$ = this.membershipService.getUserMemberships( user.member_id );
  }

  fetchUserOrganisations() {
    const user = this.authService.getLoggedInUser();
    this.organisations$ = this.membershipService.getUserOrganisations( user.member_id );
  }

  discover() {
    this.router.navigate(['/discover']);
  }

  showMemberships() {
    return this.content === 'memberships';
  }

  showOrganisations() {
    return this.content === 'organisations';
  }

  setContent(event) {
    this.content = event.target.value;
  }
}
