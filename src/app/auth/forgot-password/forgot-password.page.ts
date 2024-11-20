import { AuthService } from './../../shared/services/api/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { logInOutline, pencil } from 'ionicons/icons';
import { IonRouterLink } from '@ionic/angular/standalone';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
    standalone: false
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
