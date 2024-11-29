/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organisation } from '../../shared/models/api/organisation';
import { OrganisationMember } from '../../shared/models/api/organisation-member';
import { OrganisationMemberService } from '../../shared/services/api/organisation-member.service';
import { OrganisationService } from '../../shared/services/api/organisation.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ApiResponse } from '../../shared/services/api/api.service';
import { addIcons } from 'ionicons';
import { peopleOutline, calendarOutline, card, trash } from 'ionicons/icons';
import {
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonSegment, IonSegmentButton,
    IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonLabel,
    IonAccordionGroup, IonAccordion, IonItem, IonIcon, IonList, IonListHeader
} from '@ionic/angular/standalone';
import { AvatarModule } from 'ngx-avatars';
import { NgClass, NgIf, DatePipe } from '@angular/common';
import { DirectoryComponent } from '../directory/directory.component';
import { QrCodeModule } from 'ng-qrcode';
import { GroupsComponent } from '../groups/groups.component';
import { AnniversariesComponent } from '../anniversaries/anniversaries.component';
import { PaymentsComponent } from '../payments/payments.component';

const SwAlert = Swal.mixin({
    heightAuto: false
});
@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    imports: [
        IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, AvatarModule, IonSegment,
        IonSegmentButton, IonContent, NgClass, DirectoryComponent, IonCard, IonCardContent,
        QrCodeModule, IonCardHeader, IonCardTitle, IonCardSubtitle, NgIf, IonLabel, IonAccordionGroup,
        IonAccordion, IonItem, IonIcon, GroupsComponent, AnniversariesComponent, IonList, IonListHeader,
        PaymentsComponent, DatePipe
    ]
})
export class DetailsComponent implements OnInit {

    public organisation: Organisation;
    public membership: OrganisationMember;
    public content = 'membership';
    public groups = [];
    public anniversaries = [];

    constructor(
        public organisationService: OrganisationService,
        public membershipService: OrganisationMemberService,
        public router: Router,

    ) {
        addIcons({ peopleOutline, calendarOutline, card, trash });
    }

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
        this.membership = this.membershipService.getSelectedModel();

        if (!this.membership) {
            this.router.navigate(['/tabs/pages/memberships']);
        }


    }

    setContent(event) {
        this.content = event.target.value;
    }

    showMembership() {
        return this.content === 'membership';
    }

    showPayments() {
        return this.content === 'payments';
    }

    showDirectory() {
        return this.content === 'directory';
    }

    confirnCancelMembership() {
        SwAlert.fire({
            title: 'Cancel Membership',
            text: 'Are you sure you want to cancel this membership?',
            showCancelButton: true
        }).then((action: SweetAlertResult) => {
            if (action.isDismissed) {
                return;
            }

            this.cancelMembership();
        });
    }

    cancelMembership() {
        const url = `/organisations/${this.organisation.slug}/memberships/${this.membership.id}`;
        const headers = this.organisation.getTenantHeaders();
        this.membershipService.delete(url, {}, headers).subscribe({
            next: (response: ApiResponse) => {
                const membership = new OrganisationMember(response.data);
                this.router.navigate(['/tabs/pages/memberships'], { queryParams: { refresh: true } });
            },
            error: (error) => SwAlert.fire('Error', error.error.message, 'error')
        });
    }
}
