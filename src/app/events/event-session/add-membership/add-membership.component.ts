/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IonModal, IonSearchbar } from '@ionic/angular';
import { Observable, of, tap } from 'rxjs';
import { OrganisationEvent } from '../../../shared/models/api/organisation-event';
import { OrganisationEventSession } from '../../../shared/models/api/organisation-event-session';
import { OrganisationMember } from '../../../shared/models/api/organisation-member';
import { OrganisationMemberCategory } from '../../../shared/models/api/organisation-member-category';
import { OrganisationMemberCategoryService } from '../../../shared/services/api/organisation-member-category.service';
import { OrganisationMemberService } from '../../../shared/services/api/organisation-member.service';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-add-membership',
  templateUrl: './add-membership.component.html',
  styleUrls: ['./add-membership.component.scss'],
})
export class AddMembershipComponent implements OnInit {

  @ViewChild('ionModal') modal: IonModal;
  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() register: EventEmitter<any> = new EventEmitter();

  @Input() eventSession: OrganisationEventSession;

  public open = true;
  public addForm: UntypedFormGroup;
  public categories$: Observable<OrganisationMemberCategory[]>;

  constructor(
    public categoryService: OrganisationMemberCategoryService,
    public membershipService: OrganisationMemberService,
    public storage: StorageService
  ) { }

  ngOnInit() {
    this.setupForm();
    this.fetchCategories();
  }

  setupForm() {
    this.addForm = new FormGroup({
      organisation_id: new FormControl<number>(this.eventSession.organisation_id),
      organisation_member_category_id: new FormControl<number>(null),
      last_name: new FormControl<string>(''),
      first_name: new FormControl<string>(''),
      dob: new FormControl<string>( new Date(2000, 1, 1).toISOString() ),
      gender: new FormControl<string>(null),
      address: new FormControl<string>(null),
      mobile_number: new FormControl<string>('')
    });
  }

  onCancel() {
    this.modal.dismiss(null, 'cancel');
    this.close.emit();
  }

  onWillDismiss(event) {

  }

  fetchCategories() {
    const cacheKey = `cache:${this.eventSession.organisation_id}:categories`;

    if( this.storage.has(cacheKey) ) {
      this.categories$ = of( this.storage.get(cacheKey) );
      return;
    }

    const params = {
      sort: 'name:asc',
      organisation_id: this.eventSession.organisation_id
    };

    this.categories$ = this.categoryService.getAll(params)
      .pipe(
        tap(categories => this.storage.set(cacheKey, categories))
      );
  }

  onSubmit(event) {
    event.preventDefault();

    if( !this.addForm.valid ) {
      return;
    }

    const form = Object.assign({}, this.addForm.value, {
      dob: new Date(this.addForm.value.dob).toISOString().split('T')[0]
    });

    const membership = new OrganisationMember(form);

    this.membershipService.create(membership).subscribe({
      next: (model: OrganisationMember) => {
        this.modal.dismiss(null, 'added');
        this.register.emit(model);
      },
      error: (error) => console.log('add error', error)
    });
  }
}
