import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrganisationsPageRoutingModule } from './organisations-routing.module';

import { OrganisationsPage } from './organisations.page';
import { SharedModule } from '../shared/shared.module';
import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonLabel,
    IonContent, IonList, IonItem, IonSpinner, IonText, IonButton, IonBackButton,
    IonCard, IonCardContent, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OrganisationsPageRoutingModule,
        SharedModule,
        MainMenuComponent,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonMenuButton,
        IonTitle,
        IonLabel,
        IonContent,
        IonList,
        IonItem,
        IonSpinner,
        IonText,
        IonButton,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonContent,
        IonCard,
        IonCardContent,
        IonGrid,
        IonRow,
        IonCol,
        IonText,
        OrganisationsPage,
        DashboardComponent
    ]
})
export class OrganisationsPageModule { }
