import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEventPageRoutingModule } from './create-event-routing.module';

import { CreateEventPage } from './create-event.page';
import {
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton,
    IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonList, IonInput,
    IonNote, IonDatetimeButton, IonPopover, IonDatetime, IonTextarea
} from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CreateEventPageRoutingModule,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonButton,
        IonContent,
        IonItem,
        IonLabel,
        IonSelect,
        IonSelectOption,
        IonList,
        IonInput,
        IonNote,
        IonDatetimeButton,
        IonPopover,
        IonDatetime,
        IonTextarea
    ],
    declarations: [CreateEventPage]
})
export class CreateEventPageModule { }
