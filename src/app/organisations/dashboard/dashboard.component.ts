import { Component, OnInit } from '@angular/core';
import { Organisation } from '../../shared/models/api/organisation';
import { OrganisationMember } from '../../shared/models/api/organisation-member';
import { OrganisationMemberService } from '../../shared/services/api/organisation-member.service';
import { OrganisationService } from '../../shared/services/api/organisation.service';
import {
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard,
    IonCardContent, IonGrid, IonRow, IonCol, IonText
} from '@ionic/angular/standalone';
import { AvatarModule } from 'ngx-avatars';
import { NgIf } from '@angular/common';
import { QrCodeModule } from 'ng-qrcode';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [
        IonHeader, IonToolbar, IonButtons, IonBackButton, AvatarModule, IonTitle, IonContent,
        NgIf, IonCard, IonCardContent, IonGrid, IonRow, IonCol, QrCodeModule, IonText
    ]
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
