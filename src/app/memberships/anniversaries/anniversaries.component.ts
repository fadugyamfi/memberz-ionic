import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { OrganisationMember } from '../../shared/models/api/organisation-member';
import { OrganisationMemberAnniversary } from '../../shared/models/api/organisation-member-anniversary';
import { OrganisationMemberAnniversaryService } from '../../shared/services/api/organisation-member-anniversary.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
    selector: 'app-membership-anniversaries',
    templateUrl: './anniversaries.component.html',
    styleUrls: ['./anniversaries.component.scss'],
    standalone: false
})
export class AnniversariesComponent implements OnInit {

    @Input()
    public membership: OrganisationMember;
    public anniversaries$: Observable<OrganisationMemberAnniversary[]>;

    @Output() load = new EventEmitter<any>();

    public cacheKey: string;

    constructor(
        public memberAnniversaries: OrganisationMemberAnniversaryService,
        public storage: StorageService
    ) { }

    ngOnInit() {
        this.cacheKey = `cache:membership:${this.membership.id}:anniversaries`;
        this.loadAnniversaries();
    }

    loadAnniversaries() {
        if (this.storage.has(this.cacheKey)) {
            const anniversaries = this.storage.get(this.cacheKey);
            this.anniversaries$ = of(anniversaries);
            this.load.emit(anniversaries);
            return;
        }

        // eslint-disable-next-line @typescript-eslint/naming-convention
        const options = { organisation_member_id: this.membership.id };

        this.anniversaries$ = this.memberAnniversaries.getAll(options)
            .pipe(
                tap(anniversaries => {
                    this.storage.set(this.cacheKey, anniversaries, 1, 'days');
                    this.load.emit(anniversaries);
                })
            );
    }
}
