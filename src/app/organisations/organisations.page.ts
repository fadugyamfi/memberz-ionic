import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberAccount } from '../shared/models/api/member-account';
import { Organisation } from '../shared/models/api/organisation';
import { OrganisationMember } from '../shared/models/api/organisation-member';
import { AuthService } from '../shared/services/api/auth.service';
import { OrganisationMemberService } from '../shared/services/api/organisation-member.service';
import { OrganisationService } from '../shared/services/api/organisation.service';
import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';
import {
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonLabel, IonContent,
    IonList, IonItem, IonSpinner, IonText, IonButton
} from '@ionic/angular/standalone';
import { AvatarModule } from 'ngx-avatars';
import { NgClass, NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-organisations',
    templateUrl: './organisations.page.html',
    styleUrls: ['./organisations.page.scss'],
    imports: [
        MainMenuComponent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
        IonLabel, AvatarModule, IonContent, NgClass, NgIf, IonList, NgFor, IonItem, IonSpinner,
        IonText, IonButton, AsyncPipe
    ]
})
export class OrganisationsPage implements OnInit {

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
        this.fetchUserOrganisations();
    }

    loadUser() {
        this.user = this.authService.getLoggedInUser();
    }

    fetchUserOrganisations() {
        const user = this.authService.getLoggedInUser();
        this.organisations$ = this.membershipService.getUserOrganisations(user.member_id);
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

    loadOrganisation(organisation: Organisation) {
        this.organisationService.setSelectedModel(organisation);
        this.router.navigate(['/tabs/pages/organisations', organisation.id]);
    }
}
