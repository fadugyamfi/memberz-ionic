import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventsPage } from './events.page';

import { EventsPageRoutingModule } from './events-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';
import { IonHeader, IonToolbar, IonTitle, IonLabel, IonSegment, IonSegmentButton, IonFab, IonFabButton, IonIcon, IonContent, IonRefresher, IonRefresherContent, IonList, IonItem, IonSpinner, IonText } from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EventsPageRoutingModule,
        SharedModule,
        MainMenuComponent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonLabel,
        IonSegment,
        IonSegmentButton,
        IonFab,
        IonFabButton,
        IonIcon,
        IonContent,
        IonRefresher,
        IonRefresherContent,
        IonList,
        IonItem,
        IonSpinner,
        IonText
    ],
    declarations: [EventsPage]
})
export class EventsPageModule { }
