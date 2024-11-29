import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentsPage } from './payments.page';

import { PaymentsPageRoutingModule } from './payments-routing.module';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: '', component: PaymentsPage }]),
        PaymentsPageRoutingModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        PaymentsPage
    ]
})
export class PaymentsPageModule { }
