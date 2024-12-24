import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { Observable, Subscription, of, tap } from 'rxjs';
import { MemberAccount } from '../shared/models/api/member-account';
import { Organisation } from '../shared/models/api/organisation';
import { OrganisationMember } from '../shared/models/api/organisation-member';
import { AuthService } from '../shared/services/api/auth.service';
import { OrganisationMemberService } from '../shared/services/api/organisation-member.service';
import { OrganisationService } from '../shared/services/api/organisation.service';
import { StorageService } from '../shared/services/storage.service';
import {
    IonRouterLink, IonHeader, IonToolbar, IonTitle, IonLabel, IonContent, IonRefresher,
    IonRefresherContent, IonList, IonListHeader, IonItem, IonSpinner, IonText, IonButton
} from '@ionic/angular/standalone';
import { AvatarModule } from 'ngx-avatars';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-memberships',
    templateUrl: './memberships.page.html',
    styleUrls: ['./memberships.page.scss'],
    imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonLabel,
    AvatarModule,
    RouterLink,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonListHeader,
    IonItem,
    IonSpinner,
    IonText,
    IonButton,
    AsyncPipe
]
})
export class MembershipsPage implements OnInit, OnDestroy {

    public memberships$: Observable<OrganisationMember[]>;
    public user: MemberAccount;
    public content = 'memberships';
    public organisations$: Observable<Organisation[]>;

    public cacheKey: string;
    public subscription: Subscription = new Subscription();

    constructor(
        public membershipService: OrganisationMemberService,
        public organisationService: OrganisationService,
        public authService: AuthService,
        public route: ActivatedRoute,
        public router: Router,
        public storage: StorageService
    ) { }

    ngOnInit() {
        this.loadUser();
        this.fetchUserMemberships();
        this.fetchUserOrganisations();
        this.subscribeToRouterEvents();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    subscribeToRouterEvents() {
        const sub = this.router.events.subscribe({
            next: (event) => {
                if (event instanceof NavigationEnd) {
                    if (this.route.snapshot.queryParamMap.has('refresh')) {
                        this.storage.remove(this.cacheKey);
                        this.fetchUserMemberships();
                        this.router.navigate([], { queryParams: {} });
                    }
                }
            }
        });

        this.subscription.add(sub);
    }

    loadUser() {
        this.user = this.authService.getLoggedInUser();
        this.cacheKey = `cache:${this.user.member_id}:memberships`;
    }

    fetchUserMemberships() {
        const user = this.authService.getLoggedInUser();

        this.memberships$ = this.membershipService.getUserMemberships(user.member_id);
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
