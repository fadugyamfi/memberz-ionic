/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { OrganisationMember } from '../../shared/models/api/organisation-member';
import { OrganisationMemberGroup } from '../../shared/models/api/organisation-member-group';
import { OrganisationMemberGroupService } from '../../shared/services/api/organisation-member-group.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
    selector: 'app-membership-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
    standalone: false
})
export class GroupsComponent implements OnInit {

  @Input()
  public membership: OrganisationMember;
  public memberGroups$: Observable<OrganisationMemberGroup[]>;

  @Output() public load = new EventEmitter();
  public cacheKey = '';

  constructor(
    public memberGroupService: OrganisationMemberGroupService,
    public storage: StorageService
  ) { }

  ngOnInit() {
    this.cacheKey = `cache:membership:${this.membership.id}:groups`;
    this.loadMemberGroups();
  }

  loadMemberGroups() {
    if( this.storage.has(this.cacheKey) ) {
      const groups = this.storage.get(this.cacheKey);
      this.memberGroups$ = of( groups );
      this.load.emit(groups);
      return;
    }

    const options = {
      organisation_member_id: this.membership.id,
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
