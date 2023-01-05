/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Contribution } from '../../shared/models/api/contribution';
import { OrganisationMember } from '../../shared/models/api/organisation-member';
import { ContributionService } from '../../shared/services/api/contribution.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-membership-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {

  @Input()
  public membership: OrganisationMember;
  public contributions$: Observable<Contribution[]>;

  public cacheKey: string;

  constructor(
    public contributionService: ContributionService,
    public storage: StorageService
  ) { }

  ngOnInit() {
    this.cacheKey = `cache:${this.membership.id}:contributions`;
    this.loadRecentPayments();
  }

  loadRecentPayments() {
    if( this.storage.has(this.cacheKey) ) {
      this.contributions$ = of( this.storage.get(this.cacheKey) );
      return;
    }

    const options = {
      organisation_member_id: this.membership.id,
      sort: 'latest'
    };

    this.contributions$ = this.contributionService.getAll(options)
      .pipe(
        tap(contributions => {
          this.storage.set(this.cacheKey, contributions, 1, 'days');
        })
      );
  }

  handleRefresh(event) {
    this.storage.remove(this.cacheKey);
    this.loadRecentPayments();
  }
}
