import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventDetailsPageRoutingModule } from './event-details-routing.module';

import { EventDetailsPage } from './event-details.page';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonListHeader, IonLabel, IonButton, IonIcon, IonText, IonItem, IonBadge } from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EventDetailsPageRoutingModule,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonList,
        IonListHeader,
        IonLabel,
        IonButton,
        IonIcon,
        IonText,
        IonItem,
        IonBadge
    ],
    declarations: [
        EventDetailsPage,

    ]
})
export class EventDetailsPageModule { }
