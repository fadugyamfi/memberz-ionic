/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Organisation } from '../../shared/models/api/organisation';
import { OrganisationService } from '../../shared/services/api/organisation.service';
import { OrganisationMemberService } from '../../shared/services/api/organisation-member.service';
import { OrganisationMember } from '../../shared/models/api/organisation-member';
import { AuthService } from '../../shared/services/api/auth.service';
import { OrganisationMemberCategoryService } from '../../shared/services/api/organisation-member-category.service';
import { OrganisationMemberCategory } from '../../shared/models/api/organisation-member-category';
import { StorageService } from '../../shared/services/storage.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { thumbsUpOutline, peopleOutline } from 'ionicons/icons';

const SwAlert = Swal.mixin({
    heightAuto: false
});
@Component({
    selector: 'app-organisation',
    templateUrl: './organisation.page.html',
    styleUrls: ['./organisation.page.scss'],
    standalone: false
})
export class OrganisationPage implements OnInit {

    public organisation: Organisation;
    public categories: OrganisationMemberCategory[];

    constructor(
        public organisationService: OrganisationService,
        public membershipService: OrganisationMemberService,
        public categoryService: OrganisationMemberCategoryService,
        public authService: AuthService,
        public route: ActivatedRoute,
        public router: Router,
        public storage: StorageService
    ) {
        addIcons({ thumbsUpOutline, peopleOutline });
    }

    ngOnInit() {
        this.loadOrganisation();
    }

    async loadOrganisation() {
        this.organisation = this.organisationService.getSelectedModel();

        if (this.organisation) {
            this.loadMembershipCategories();
            return;
        }

        const slug = this.route.snapshot.paramMap.get('slug');

        this.organisationService.getBySlug(slug).subscribe({
            next: (organisation: Organisation) => {
                this.organisation = organisation;
                this.loadMembershipCategories();
            }
        });
    }

    loadMembershipCategories() {
        this.categoryService.get(
            `/organisations/${this.organisation.slug}/membership_categories`,
            {},
            this.organisation.getTenantHeaders()
        ).subscribe({
            next: (response: any): void => {
                this.categories = response.data;
            }
        });
    }

    join() {
        const user = this.authService.getLoggedInUser();
        if (!user) {
            // route to join form
            return;
        }

        let defaultCategory = this.categories.find(category => category.default);

        if (!defaultCategory && this.categories.length >= 1) {
            defaultCategory = this.categories[0];
        }

        const membership = new OrganisationMember({
            organisation_id: this.organisation.id,
            member_id: user.member_id,
            organisation_member_category_id: defaultCategory?.id
        });

        this.organisationService.post(
            `/organisations/${this.organisation.slug}/memberships`,
            membership, {},
            this.organisation.getTenantHeaders()
        ).subscribe({
            next: (newMembership: OrganisationMember) => {
                this.membershipService.clearUserMembershipCache(user.member_id);
                this.router.navigate(['/tabs/pages/memberships'], {
                    queryParams: { refresh: true }
                });
            },
            error: (error: HttpErrorResponse) => {
                SwAlert.fire('Error', error.error.message, 'error');
            }
        });
    }
}
