/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, input, output } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { OrganisationMember } from '../../shared/models/api/organisation-member';
import { OrganisationMemberGroup } from '../../shared/models/api/organisation-member-group';
import { OrganisationMemberGroupService } from '../../shared/services/api/organisation-member-group.service';
import { StorageService } from '../../shared/services/storage.service';
import { AsyncPipe } from '@angular/common';
import { IonItemGroup, IonItem, IonLabel, IonSkeletonText } from '@ionic/angular/standalone';

@Component({
    selector: 'app-membership-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
    imports: [IonItemGroup, IonItem, IonLabel, IonSkeletonText, AsyncPipe]
})
export class GroupsComponent implements OnInit {

    public readonly membership = input<OrganisationMember>(undefined);
    public memberGroups$: Observable<OrganisationMemberGroup[]>;

    public readonly load = output<any>();
    public cacheKey = '';

    constructor(
        public memberGroupService: OrganisationMemberGroupService,
        public storage: StorageService
    ) { }

    ngOnInit() {
        this.cacheKey = `cache:membership:${this.membership().id}:groups`;
        this.loadMemberGroups();
    }

    loadMemberGroups() {
        if (this.storage.has(this.cacheKey)) {
            const groups = this.storage.get(this.cacheKey);
            this.memberGroups$ = of(groups);
            this.load.emit(groups);
            return;
        }

        const options = {
            organisation_member_id: this.membership().id,
        };

        this.memberGroups$ = this.memberGroupService.getAll(options)
            .pipe(
                tap((groups) => {
                    this.storage.set(this.cacheKey, groups, 1, 'days');
                    this.load.emit(groups);
                })
            );
    }
}
