import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { OrganisationMember } from '../../shared/models/api/organisation-member';
import { OrganisationMemberService } from '../../shared/services/api/organisation-member.service';

@Component({
  selector: 'app-membership-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
})
export class DirectoryComponent implements OnInit {

  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;
  @Input() public membership: OrganisationMember;

  public memberships$: Observable<OrganisationMember[]> = of([]);
  public viewingProfile = false;
  public selectedProfile: OrganisationMember = null;

  constructor(
    public membershipService: OrganisationMemberService
  ) { }

  ngOnInit() {
    setTimeout(() => { // this will make the execution after the above boolean has changed
      this.searchbar.setFocus();
    }, 100);
  }

  searchDirectory(event: Event) {
    const options = {
      term: (event.target as HTMLInputElement).value
    };

    this.memberships$ = this.membershipService.getAll(options);
  }

  viewProfileDetails(membership: OrganisationMember) {
    this.selectedProfile = membership;
    this.viewingProfile = true;
  }
}
