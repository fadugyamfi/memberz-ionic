import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organisation } from '../../shared/models/api/organisation';
import { OrganisationMember } from '../../shared/models/api/organisation-member';
import { OrganisationMemberService } from '../../shared/services/api/organisation-member.service';
import { OrganisationService } from '../../shared/services/api/organisation.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  public organisation: Organisation;
  public membership: OrganisationMember;

  constructor(
    public organisationService: OrganisationService,
    public membershipService: OrganisationMemberService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadOrganisation();
    this.loadMembership();
  }

  loadOrganisation() {
    this.organisation = this.organisationService.getSelectedModel();

    if( !this.organisation ) {

    }
  }

  loadMembership() {
    this.membership = this.membershipService.getSelectedModel();

    if( !this.membership ) {
      this.router.navigate(['/tabs/pages/memberships']);
    }
  }
}
