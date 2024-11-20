import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

import { ResetPasswordPage } from './reset-password.page';
import { IonHeader, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonButton, IonText } from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ResetPasswordPageRoutingModule,
        ReactiveFormsModule,
        RouterOutlet,
        IonHeader,
        IonTitle,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonItem,
        IonInput,
        IonButton,
        IonText
    ],
    declarations: [ResetPasswordPage]
})
export class ResetPasswordPageModule { }
