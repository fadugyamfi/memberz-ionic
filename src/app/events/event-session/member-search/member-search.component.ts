/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IonInput, IonModal, IonSearchbar } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { OrganisationMember } from '../../../shared/models/api/organisation-member';
import { OrganisationMemberService } from '../../../shared/services/api/organisation-member.service';
import { ModalBackButtonService } from '../../../shared/services/modal-back-button.service';

@Component({
    selector: 'app-member-search',
    templateUrl: './member-search.component.html',
    styleUrls: ['./member-search.component.scss'],
    standalone: false
})
export class MemberSearchComponent implements OnInit {

  public searchForm: UntypedFormGroup;

  @ViewChild('ionModal') modal: IonModal;
  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() register: EventEmitter<any> = new EventEmitter();

  public memberships$: Observable<OrganisationMember[]> = of([]);
  public open = true;
  public selected: OrganisationMember[] = [];

  constructor(
    public membershipService: OrganisationMemberService,
    private modalBackButton: ModalBackButtonService
  ) { }

  ngOnInit() {
    setTimeout(() => { // this will make the execution after the above boolean has changed
      this.searchbar?.setFocus();
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
    this.modal.dismiss(null, 'cancel');
    this.close.emit();
  }

  onWillDismiss(event) {

  }

  onSearch(event) {
    this.memberships$ = this.membershipService.findMembers({ term: event.target.value }, 1, 30);
  }

  onSelect(membership: OrganisationMember) {
    const index = this.selected.indexOf(membership);

    if( index > -1 ) {
      membership.selected = false;
      this.selected.splice(index, 1);
      return;
    }

    membership.selected = true;
    this.selected.push(membership);
  }

  onRegister() {
    this.modal.dismiss(null, 'searched');
    setTimeout(() => this.register.emit(this.selected), 200);
  }
}
