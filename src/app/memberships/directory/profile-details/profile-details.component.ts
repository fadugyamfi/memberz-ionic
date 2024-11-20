import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { IonModal, IonSearchbar } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { OrganisationMember } from '../../../shared/models/api/organisation-member';
import { OrganisationMemberService } from '../../../shared/services/api/organisation-member.service';
import { ModalBackButtonService } from '../../../shared/services/modal-back-button.service';

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss'],
    standalone: false
})
export class ProfileDetailsComponent implements OnInit {

  public searchForm: UntypedFormGroup;

  @ViewChild('ionModal') modal: IonModal;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() membership: OrganisationMember;

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


}
