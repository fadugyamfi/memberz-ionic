/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IonInput, IonModal, IonSearchbar } from '@ionic/angular';
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
  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() register: EventEmitter<any> = new EventEmitter();

  public memberships$: Observable<OrganisationMember[]> = of([]);
  public open = true;

  constructor(
    public membershipService: OrganisationMemberService
  ) { }

  ngOnInit() {
    setTimeout(() => { // this will make the execution after the above boolean has changed
      this.searchbar.setFocus();
    }, 100);
  }

  onCancel() {
    this.modal.dismiss(null, 'cancel');
    this.close.emit();
  }

  onWillDismiss(event) {

  }

  onSearch(event) {
    this.memberships$ = this.membershipService.findMembers({ term: event.target.value }, 1, 30);
  }

  onSelect(membership: OrganisationMember) {
    this.modal.dismiss(null, 'searched');
    setTimeout(() => this.register.emit(membership), 200);
  }
}
