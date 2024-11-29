/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, input } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Contribution } from '../../shared/models/api/contribution';
import { OrganisationMember } from '../../shared/models/api/organisation-member';
import { ContributionService } from '../../shared/services/api/contribution.service';
import { StorageService } from '../../shared/services/storage.service';
import { addIcons } from 'ionicons';
import { refresh } from 'ionicons/icons';
import { IonList, IonListHeader, IonLabel, IonButton, IonIcon, IonSpinner, IonItemGroup, IonItem, IonSkeletonText } from '@ionic/angular/standalone';
import { AsyncPipe, UpperCasePipe, DecimalPipe, TitleCasePipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-membership-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss'],
    imports: [IonList, IonListHeader, IonLabel, IonButton, IonIcon, IonSpinner, IonItemGroup, IonItem, IonSkeletonText, AsyncPipe, UpperCasePipe, DecimalPipe, TitleCasePipe, DatePipe]
})
export class PaymentsComponent implements OnInit {

    public readonly membership = input<OrganisationMember>(undefined);
    public contributions$: Observable<Contribution[]>;

    public cacheKey: string;
    public refreshing = false;

    constructor(
        public contributionService: ContributionService,
        public storage: StorageService
    ) {
        addIcons({ refresh });
    }

    ngOnInit() {
        this.cacheKey = `cache:${this.membership().id}:contributions`;
        this.loadRecentPayments();
    }

    loadRecentPayments() {
        if (this.storage.has(this.cacheKey)) {
            this.contributions$ = of(this.storage.get(this.cacheKey));
            return;
        }

        const options = {
            organisation_member_id: this.membership().id,
            sort: 'latest'
        };

        this.contributions$ = this.contributionService.getAll(options)
            .pipe(
                tap(contributions => {
                    this.storage.set(this.cacheKey, contributions, 1, 'days');
                    this.refreshing = false;
                })
            );
    }

    handleRefresh(event) {
        this.refreshing = true;
        this.storage.remove(this.cacheKey);
        this.loadRecentPayments();
    }
}
