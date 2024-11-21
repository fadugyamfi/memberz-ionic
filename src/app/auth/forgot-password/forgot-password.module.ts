import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordPage } from './forgot-password.page';
import {
    IonHeader, IonBackButton, IonTitle, IonContent, IonGrid, IonRow,
    IonCol, IonItem, IonInput, IonButton, IonText, IonList, IonIcon, IonLabel
} from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ForgotPasswordPageRoutingModule,
        ReactiveFormsModule,
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
        IonText,
        IonList,
        IonIcon,
        IonLabel
    ],
    declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule { }
