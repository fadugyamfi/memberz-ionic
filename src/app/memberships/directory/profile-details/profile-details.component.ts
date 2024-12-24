import { Component, HostListener, OnInit, input, viewChild, output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {
    IonModal, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle
} from '@ionic/angular/standalone';
import { Observable, of } from 'rxjs';
import { OrganisationMember } from '../../../shared/models/api/organisation-member';
import { OrganisationMemberService } from '../../../shared/services/api/organisation-member.service';
import { ModalBackButtonService } from '../../../shared/services/modal-back-button.service';
import { AvatarModule } from 'ngx-avatars';


@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss'],
    imports: [
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonContent,
        IonCard,
        IonCardContent,
        AvatarModule,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle
    ]
})
export class ProfileDetailsComponent implements OnInit {

    public searchForm: UntypedFormGroup;

    readonly modal = viewChild<IonModal>('ionModal');

    readonly close = output();
    readonly membership = input<OrganisationMember>(undefined);

    public memberships$: Observable<OrganisationMember[]> = of([]);
    public open = true;
    public selected: OrganisationMember[] = [];

    constructor(
        public membershipService: OrganisationMemberService,
        private modalBackButton: ModalBackButtonService
    ) { }

    ngOnInit() {
        this.modalBackButton.pushModalState();
    }

    @HostListener('window:popstate', ['$event'])
    dismissModal() {
        this.onCancel();
    }

    ngOnDestroy(): void {
        this.modalBackButton.clearModalState();
    }

    onCancel() {
        this.modal().dismiss(null, 'cancel');
        this.close.emit();
    }

    onWillDismiss(event) {

    }

    onSearch(event) {
        this.memberships$ = this.membershipService.findMembers({ term: event.target.value }, 1, 30);
    }

    onSelect(membership: OrganisationMember) {
        const index = this.selected.indexOf(membership);

        if (index > -1) {
            membership.selected = false;
            this.selected.splice(index, 1);
            return;
        }

        membership.selected = true;
        this.selected.push(membership);
    }


}
