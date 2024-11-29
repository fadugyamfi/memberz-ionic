/* eslint-disable @typescript-eslint/naming-convention */
import { Component, HostListener, OnDestroy, OnInit, input, output, viewChild } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    IonModal, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonButtons,
    IonButton, IonContent, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput,
    IonDatetimeButton, IonPopover, IonDatetime, IonSpinner
} from '@ionic/angular/standalone';
import { Observable, of, tap } from 'rxjs';
import { OrganisationEventSession } from '../../../shared/models/api/organisation-event-session';
import { OrganisationMember } from '../../../shared/models/api/organisation-member';
import { OrganisationMemberCategory } from '../../../shared/models/api/organisation-member-category';
import { OrganisationMemberCategoryService } from '../../../shared/services/api/organisation-member-category.service';
import { OrganisationMemberService } from '../../../shared/services/api/organisation-member.service';
import { ModalBackButtonService } from '../../../shared/services/modal-back-button.service';
import { StorageService } from '../../../shared/services/storage.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-add-membership',
    templateUrl: './add-membership.component.html',
    styleUrls: ['./add-membership.component.scss'],
    imports: [
        IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
        IonContent, FormsModule, ReactiveFormsModule, IonList, IonItem, IonLabel, IonSelect,
        IonSelectOption, IonInput, IonDatetimeButton, IonPopover, IonDatetime, IonSpinner, AsyncPipe
    ]
})
export class AddMembershipComponent implements OnInit, OnDestroy {

    readonly modal = viewChild<IonModal>('ionModal');
    readonly searchbar = viewChild<IonSearchbar>('searchbar');

    readonly close = output();
    readonly register = output<OrganisationMember>();

    readonly eventSession = input<OrganisationEventSession>(undefined);


    public open = true;
    public addForm: UntypedFormGroup;
    public categories$: Observable<OrganisationMemberCategory[]>;

    constructor(
        public categoryService: OrganisationMemberCategoryService,
        public membershipService: OrganisationMemberService,
        public storage: StorageService,
        public modalBackButton: ModalBackButtonService
    ) { }

    ngOnInit() {
        this.setupForm();
        this.fetchCategories();
        this.modalBackButton.pushModalState();
    }

    @HostListener('window:popstate', ['$event'])
    dismissModal() {
        this.onCancel();
    }

    ngOnDestroy(): void {
        this.modalBackButton.clearModalState();
    }

    setupForm() {
        this.addForm = new FormGroup({
            organisation_id: new FormControl<number>(this.eventSession().organisation_id),
            organisation_member_category_id: new FormControl<number>(null),
            last_name: new FormControl<string>(''),
            first_name: new FormControl<string>(''),
            dob: new FormControl<string>(new Date(2000, 1, 1).toISOString()),
            gender: new FormControl<string>(null),
            address: new FormControl<string>(null),
            mobile_number: new FormControl<string>('')
        });
    }

    onCancel() {
        this.modal().dismiss(null, 'cancel');
        this.close.emit();
    }

    onWillDismiss(event) {

    }

    fetchCategories() {
        const cacheKey = `cache:${this.eventSession().organisation_id}:categories`;

        if (this.storage.has(cacheKey)) {
            this.categories$ = of(this.storage.get(cacheKey));
            return;
        }

        const params = {
            sort: 'name:asc',
            organisation_id: this.eventSession().organisation_id
        };

        this.categories$ = this.categoryService.getAll(params)
            .pipe(
                tap(categories => this.storage.set(cacheKey, categories))
            );
    }

    onSubmit(event) {
        event.preventDefault();

        if (!this.addForm.valid) {
            return;
        }

        const form = Object.assign({}, this.addForm.value, {
            dob: new Date(this.addForm.value.dob).toISOString().split('T')[0]
        });

        const membership = new OrganisationMember(form);

        this.membershipService.create(membership).subscribe({
            next: (model: OrganisationMember) => {
                this.modal().dismiss(null, 'added');
                this.register.emit(model);
            },
            error: (error) => console.log('add error', error)
        });
    }
}
