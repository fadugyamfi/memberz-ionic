import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { OrganisationMember } from '../../shared/models/api/organisation-member';
import { OrganisationMemberAnniversary } from '../../shared/models/api/organisation-member-anniversary';
import { OrganisationMemberAnniversaryService } from '../../shared/services/api/organisation-member-anniversary.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-membership-anniversaries',
  templateUrl: './anniversaries.component.html',
  styleUrls: ['./anniversaries.component.scss'],
})
export class AnniversariesComponent implements OnInit {

  @Input()
  public membership: OrganisationMember;
  public anniversaries$: Observable<OrganisationMemberAnniversary[]>;

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
    if( this.storage.has(this.cacheKey) ) {
      this.anniversaries$ = of( this.storage.get(this.cacheKey) );
      return;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const options = { organisation_member_id: this.membership.id };

    this.anniversaries$ = this.memberAnniversaries.getAll(options)
      .pipe(
        tap(anniversaries => {
          this.storage.set(this.cacheKey, anniversaries, 1, 'days');
        })
      );
  }
}
