import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './../../shared/services/api/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/shared/services/events.service';
import { IonHeader, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonButton, IonText } from '@ionic/angular/standalone';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.page.html',
    styleUrls: ['./reset-password.page.scss'],
    imports: [IonHeader, IonTitle, IonContent, IonGrid, FormsModule, ReactiveFormsModule, IonRow, IonCol, IonItem, IonInput, IonButton, IonText]
})
export class ResetPasswordPage implements OnInit {
    public resetPasswordForm: FormGroup;
    private token = '';
    private email = '';


    constructor(
        public authService: AuthService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        public events: EventsService,
        private router: Router
    ) {
        this.resetPasswordForm = this.fb.group({
            email: [this.email, [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: new UntypedFormControl('', [Validators.required]),
        });
    }

    ngOnInit() {
        this.authService.requesting = false;
        this.route.queryParams.subscribe((params) => {
            this.token = params.token;
            this.email = params.email;
        });
    }

    resetPassword() {
        const input = this.resetPasswordForm.value;

        this.authService.resetPassword(input.email, input.password, this.token);
    }

    cancelReset() {
        this.router.navigate(['/auth/login']);
    }

}
