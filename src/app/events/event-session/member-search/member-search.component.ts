/* eslint-disable @typescript-eslint/naming-convention */
import { Component, HostListener, OnInit, output, viewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {
    IonModal, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonButtons,
    IonButton, IonText, IonContent, IonList, IonItem, IonLabel, IonIcon, IonSpinner
} from '@ionic/angular/standalone';
import { Observable, of } from 'rxjs';
import { OrganisationMember } from '../../../shared/models/api/organisation-member';
import { OrganisationMemberService } from '../../../shared/services/api/organisation-member.service';
import { ModalBackButtonService } from '../../../shared/services/modal-back-button.service';
import { addIcons } from 'ionicons';
import { checkbox } from 'ionicons/icons';
import { AsyncPipe } from '@angular/common';
import { AvatarModule } from 'ngx-avatars';

@Component({
    selector: 'app-member-search',
    templateUrl: './member-search.component.html',
    styleUrls: ['./member-search.component.scss'],
    imports: [
        IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonSearchbar,
        IonText, IonContent, IonList, IonItem, AvatarModule, IonLabel, IonIcon, IonSpinner, AsyncPipe
    ]
})
export class MemberSearchComponent implements OnInit {

    public searchForm: UntypedFormGroup;

    readonly modal = viewChild<IonModal>('ionModal');
    readonly searchbar = viewChild<IonSearchbar>('searchbar');

    readonly close = output();
    readonly register = output<any>();

    public memberships$: Observable<OrganisationMember[]> = of([]);
    public open = true;
    public selected: OrganisationMember[] = [];

    constructor(
        public membershipService: OrganisationMemberService,
        private modalBackButton: ModalBackButtonService
    ) {
        addIcons({ checkbox });
    }

    ngOnInit() {
        setTimeout(() => { // this will make the execution after the above boolean has changed
            this.searchbar()?.setFocus();
        }, 100);
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

    onRegister() {
        this.modal().dismiss(null, 'searched');
        setTimeout(() => this.register.emit(this.selected), 200);
    }
}
