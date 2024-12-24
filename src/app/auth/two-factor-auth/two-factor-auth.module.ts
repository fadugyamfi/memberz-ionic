import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TwoFactorAuthPageRoutingModule } from './two-factor-auth-routing.module';

import { TwoFactorAuthPage } from './two-factor-auth.page';
import { IonHeader, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonButton, IonText } from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TwoFactorAuthPageRoutingModule,
        IonHeader,
        IonTitle,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonItem,
        IonInput,
        IonButton,
        IonText,
        TwoFactorAuthPage
    ]
})
export class TwoFactorAuthPageModule { }
