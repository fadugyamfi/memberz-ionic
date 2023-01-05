import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { MemberAccount } from '../shared/models/api/member-account';
import { Organisation } from '../shared/models/api/organisation';
import { OrganisationMember } from '../shared/models/api/organisation-member';
import { AuthService } from '../shared/services/api/auth.service';
import { OrganisationMemberService } from '../shared/services/api/organisation-member.service';
import { OrganisationService } from '../shared/services/api/organisation.service';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.page.html',
  styleUrls: ['./memberships.page.scss'],
})
export class MembershipsPage implements OnInit {

  public memberships$: Observable<OrganisationMember[]>;
  public user: MemberAccount;
  public content = 'memberships';
  public organisations$: Observable<Organisation[]>;

  public cacheKey: string;

  constructor(
    public membershipService: OrganisationMemberService,
    public organisationService: OrganisationService,
    public authService: AuthService,
    public router: Router,
    public storage: StorageService
  ) { }

  ngOnInit() {
    this.loadUser();
    this.fetchUserMemberships();
    this.fetchUserOrganisations();
  }

  loadUser() {
    this.user = this.authService.getLoggedInUser();
    this.cacheKey = `cache:${this.user.member_id}:memberships`;
  }

  fetchUserMemberships() {
    const user = this.authService.getLoggedInUser();

    if( this.storage.has(this.cacheKey) ) {
      this.memberships$ = of( this.storage.get(this.cacheKey) );
      return;
    }

    this.memberships$ = this.membershipService.getUserMemberships( user.member_id )
      .pipe(
        tap(memberships => this.storage.set(this.cacheKey, memberships, 7, 'days'))
      );
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

  loadMembership(membership: OrganisationMember) {
    this.membershipService.setSelectedModel(membership, true);
    this.organisationService.setSelectedModel(membership.organisation, true);
    this.organisationService.setActiveOrganisation(membership.organisation);
    this.router.navigate(['/tabs/pages/memberships', membership.id]);
  }

  handleRefresh(event) {
    this.storage.remove(this.cacheKey);
    this.fetchUserMemberships();
    event.target.complete();
  }
}
