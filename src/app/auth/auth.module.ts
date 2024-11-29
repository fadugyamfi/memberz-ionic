import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import {
    IonHeader, IonBackButton, IonTitle, IonContent, IonGrid, IonRow,
    IonCol, IonItem, IonInput, IonButton, IonSpinner, IonText, IonList, IonIcon, IonLabel
} from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthPageRoutingModule,
        IonHeader,
        IonBackButton,
        IonTitle,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonItem,
        IonInput,
        IonButton,
        IonSpinner,
        IonText,
        IonList,
        IonIcon,
        IonLabel,
        AuthPage
    ]
})
export class AuthPageModule { }
