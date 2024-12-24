import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VerifyOtpPageRoutingModule } from './verify-otp-routing.module';

import { VerifyOtpPage } from './verify-otp.page';
import { IonHeader, IonTitle, IonContent, IonButton, IonText } from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        VerifyOtpPageRoutingModule,
        IonHeader,
        IonTitle,
        IonContent,
        IonButton,
        IonText,
        VerifyOtpPage
    ]
})
export class VerifyOtpPageModule { }
