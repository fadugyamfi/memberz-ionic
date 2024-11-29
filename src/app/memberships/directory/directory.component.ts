import { Component, OnInit, ViewChild, input } from '@angular/core';
import { IonSearchbar, IonHeader, IonToolbar, IonList, IonItemGroup, IonItem, IonLabel, IonSkeletonText } from '@ionic/angular/standalone';
import { Observable, of } from 'rxjs';
import { OrganisationMember } from '../../shared/models/api/organisation-member';
import { OrganisationMemberService } from '../../shared/services/api/organisation-member.service';
import { AsyncPipe } from '@angular/common';
import { AvatarModule } from 'ngx-avatars';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';

@Component({
    selector: 'app-membership-directory',
    templateUrl: './directory.component.html',
    styleUrls: ['./directory.component.scss'],
    imports: [
    IonHeader,
    IonToolbar,
    IonSearchbar,
    IonList,
    IonItemGroup,
    IonItem,
    AvatarModule,
    IonLabel,
    IonSkeletonText,
    ProfileDetailsComponent,
    AsyncPipe
]
})
export class DirectoryComponent implements OnInit {

    @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;
    public readonly membership = input<OrganisationMember>(undefined);

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
