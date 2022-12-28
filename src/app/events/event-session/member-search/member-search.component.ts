/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IonInput, IonModal } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { OrganisationMember } from '../../../shared/models/api/organisation-member';
import { OrganisationMemberService } from '../../../shared/services/api/organisation-member.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.scss'],
})
export class MemberSearchComponent implements OnInit {

  public searchForm: UntypedFormGroup;

  @ViewChild('ionModal') modal: IonModal;
  @ViewChild('search', { static: false }) searchElement: IonInput;

  @Output() close: EventEmitter<any> = new EventEmitter();

  public memberships$: Observable<OrganisationMember[]> = of([]);

  constructor(
    public membershipService: OrganisationMemberService
  ) { }

  ngOnInit() {
    this.createForm();

    setTimeout(() => { // this will make the execution after the above boolean has changed
      this.searchElement.setFocus();
    }, 100);
  }

  createForm() {
    this.searchForm = new UntypedFormGroup({
      term: new UntypedFormControl(''),
    });
  }

  onCancel() {
    this.modal.dismiss(null, 'cancel');
    this.close.emit();
  }

  onWillDismiss(event) {

  }

  onSearch() {
    this.memberships$ = this.membershipService.findMembers(this.searchForm.value, 1, 30);
  }
}
