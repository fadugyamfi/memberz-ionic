import { Component, OnInit } from '@angular/core';
import { IonHeader, IonTitle, IonContent, IonButton, IonText } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-verify-otp',
    templateUrl: './verify-otp.page.html',
    styleUrls: ['./verify-otp.page.scss'],
    imports: [IonHeader, IonTitle, IonContent, FormsModule, IonButton, IonText]
})
export class VerifyOtpPage implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
