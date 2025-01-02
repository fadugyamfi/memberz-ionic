import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/api/auth.service';
import { addIcons } from 'ionicons';
import { helpCircle, pencil } from 'ionicons/icons';
import {
    IonHeader, IonBackButton, IonTitle, IonContent, IonInput,
    IonButton, IonSpinner, IonText, IonIcon, IonInputPasswordToggle,
    IonFooter
} from '@ionic/angular/standalone';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
    imports: [
    IonHeader, IonBackButton, RouterLink, IonTitle, IonContent, FormsModule, ReactiveFormsModule,
    IonInput, IonButton, IonSpinner, IonText, IonIcon,
    IonInputPasswordToggle, IonFooter
]
})
export class AuthPage implements OnInit {

    public loginForm: UntypedFormGroup;
    public emailLogin = false;
    public validating = false;

    // separateDialCode = true;
    // SearchCountryField = SearchCountryField;
    // CountryI = CountryI;
    // PhoneNumberFormat = PhoneNumberFormat;
    // preferredCountries: CountryISO[] = [CountryISO.Ghana, CountryISO.Nigeria, CountryISO.Togo];

    constructor(
        public router: Router,
        private fb: UntypedFormBuilder,
        public authService: AuthService
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
            rememberMe: [true]
        });
        addIcons({ helpCircle, pencil });
    }

    ngOnInit() { }

    // Simple Login
    doLogin() {
        const login = this.loginForm.value;

        if (!this.emailLogin) {
            // login.username = login.username.e164Number;
        }

        this.authService.login(login.username.replaceAll(' ', ''), login.password, true);
    }

}
