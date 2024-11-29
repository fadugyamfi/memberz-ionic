/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Organisation } from '../../shared/models/api/organisation';
import { OrganisationEvent } from '../../shared/models/api/organisation-event';
import { AuthService } from '../../shared/services/api/auth.service';
import { OrganisationEventService } from '../../shared/services/api/organisation-event.service';
import { OrganisationMemberService } from '../../shared/services/api/organisation-member.service';
import { OrganisationService } from '../../shared/services/api/organisation.service';
import { StorageService } from '../../shared/services/storage.service';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonList, IonInput, IonNote, IonDatetimeButton, IonPopover, IonDatetime, IonTextarea } from '@ionic/angular/standalone';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

const SwAlert = Swal.mixin({
    heightAuto: false
});

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.page.html',
    styleUrls: ['./create-event.page.scss'],
    imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonContent, FormsModule, ReactiveFormsModule, IonItem, IonLabel, IonSelect, NgIf, NgFor, IonSelectOption, IonList, IonInput, IonNote, IonDatetimeButton, IonPopover, IonDatetime, IonTextarea, AsyncPipe]
})
export class CreateEventPage implements OnInit {

    public addForm: FormGroup;
    public organisations$: Observable<Organisation[]>;
    private organisations: Organisation[] = [];

    constructor(
        public organisationService: OrganisationService,
        public eventService: OrganisationEventService,
        public authService: AuthService,
        public membershipService: OrganisationMemberService,
        public router: Router,
        public storage: StorageService
    ) { }

    ngOnInit() {
        this.setupForm();
        this.fetchUserOrganisations();
    }

    setupForm() {
        this.addForm = new FormGroup({
            organisation_id: new FormControl<number>(null, [Validators.required]),
            event_name: new FormControl<string>('', [Validators.required]),
            venue: new FormControl<string>(''),
            start_dt: new FormControl<string>('', [Validators.required]),
            end_dt: new FormControl<string>('', [Validators.required]),
            long_description: new FormControl<string>('', [Validators.required])
        });
    }

    fetchUserOrganisations() {
        const user = this.authService.getLoggedInUser();
        this.organisations$ = this.membershipService.getUserOrganisations(user.member_id).pipe(
            tap(organisations => this.organisations = organisations)
        );
    }

    canCreate() {
        return window.navigator.onLine;
    }

    onSubmit(ev) {
        ev.preventDefault();

        if (!this.canCreate()) {
            return;
        }

        const event = new OrganisationEvent(this.addForm.value);
        const user = this.authService.getLoggedInUser();
        const organisation = this.organisations.find(o => o.id === this.addForm.value.organisation_id);

        const params = {
            contain: 'sessions,calendar,organisation'
        };

        const headers = {
            'X-Tenant-Id': organisation.uuid
        };

        this.eventService.create(event, params, headers).subscribe({
            next: (orgEvent: OrganisationEvent) => {
                this.storage.remove(`cache:${user.member_id}:events:upcoming`);
                this.eventService.setSelectedModel(orgEvent);
                this.router.navigate(['/tabs/pages/events', orgEvent.id]);
            },
            error: (error) => {
                SwAlert.fire('Failed', 'Event creation failed', 'error');
            }
        });
    }
}
