import { AuthService } from './../../shared/services/api/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { logInOutline, pencil } from 'ionicons/icons';
import {
    IonHeader, IonBackButton, IonTitle, IonContent,
    IonInput, IonButton, IonText, IonFooter,
    IonSpinner
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
    imports: [
        IonHeader, IonBackButton, IonTitle, IonContent, FormsModule, ReactiveFormsModule,
        IonInput, IonButton, IonText, RouterLink,
        IonFooter, IonSpinner
    ]
})
export class ForgotPasswordPage implements OnInit {

    public forgotpassForm: FormGroup;

    constructor(
        public authService: AuthService,
        private fb: FormBuilder,
    ) {
        this.forgotpassForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
        addIcons({ logInOutline, pencil });
    }

    ngOnInit() {
    }


    forgotpass() {
        const input = this.forgotpassForm.value;
        this.authService.forgotPassword(input.email);
    }
}
