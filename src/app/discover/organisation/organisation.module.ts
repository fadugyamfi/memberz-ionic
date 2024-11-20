import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrganisationPageRoutingModule } from './organisation-routing.module';

import { OrganisationPage } from './organisation.page';
import { SharedModule } from '../../shared/shared.module';
import { IonHeader, IonToolbar, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonIcon, IonButton } from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OrganisationPageRoutingModule,
        SharedModule,
        IonHeader,
        IonToolbar,
        IonBackButton,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonGrid,
        IonRow,
        IonCol,
        IonIcon,
        IonButton
    ],
    declarations: [OrganisationPage]
})
export class OrganisationPageModule { }
