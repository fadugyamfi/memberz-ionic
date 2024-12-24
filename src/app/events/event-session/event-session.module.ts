import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventSessionPageRoutingModule } from './event-session-routing.module';

import { EventSessionPage } from './event-session.page';
import { CardScannerComponent } from './card-scanner/card-scanner.component';
import { MemberSearchComponent } from './member-search/member-search.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { AddMembershipComponent } from './add-membership/add-membership.component';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonListHeader, IonLabel, IonText, IonBadge, IonButton, IonIcon, IonItem, IonSpinner, IonModal, IonSelect, IonSelectOption, IonInput, IonDatetimeButton, IonPopover, IonDatetime, IonSearchbar } from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EventSessionPageRoutingModule,
        SharedModule,
        NgxScannerQrcodeModule,
        ReactiveFormsModule,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonContent,
        IonList,
        IonListHeader,
        IonLabel,
        IonText,
        IonBadge,
        IonButton,
        IonIcon,
        IonItem,
        IonSpinner,
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonSelect,
        IonSelectOption,
        IonInput,
        IonDatetimeButton,
        IonPopover,
        IonDatetime,
        IonSpinner,
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonContent,
        IonSpinner,
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonSearchbar,
        IonText,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonIcon,
        IonSpinner,
        EventSessionPage,
        CardScannerComponent,
        MemberSearchComponent,
        AddMembershipComponent
    ]
})
export class EventSessionPageModule { }
