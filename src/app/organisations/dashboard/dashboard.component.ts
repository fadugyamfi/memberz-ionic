import { Component, OnInit } from '@angular/core';
import { Organisation } from '../../shared/models/api/organisation';
import { OrganisationMember } from '../../shared/models/api/organisation-member';
import { OrganisationMemberService } from '../../shared/services/api/organisation-member.service';
import { OrganisationService } from '../../shared/services/api/organisation.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})
export class DashboardComponent implements OnInit {

    public organisation: Organisation;
    public membership: OrganisationMember;

    constructor(
        public organisationService: OrganisationService,
        public membershipService: OrganisationMemberService
    ) { }

    ngOnInit() {
        this.loadOrganisation();
        this.loadMembership();
    }

    loadOrganisation() {
        this.organisation = this.organisationService.getSelectedModel();

        if (!this.organisation) {

        }
    }

    loadMembership() {

    }
}
