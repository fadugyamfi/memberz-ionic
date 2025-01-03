/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/api/auth.service';
import { MemberAccountService } from '../../shared/services/api/member-account.service';
import { IonHeader, IonBackButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
    imports: [IonHeader, IonBackButton, IonTitle, IonContent, FormsModule, ReactiveFormsModule, IonGrid, IonRow, IonCol, IonItem, IonInput, IonButton]
})
export class RegisterPage implements OnInit {

    public newAccountForm: UntypedFormGroup;

    constructor(
        public authService: AuthService,
        public accountService: MemberAccountService
    ) { }

    ngOnInit() {
        this.setupForm();
    }

    setupForm() {
        this.newAccountForm = new FormGroup({
            first_name: new UntypedFormControl('', [Validators.required]),
            last_name: new UntypedFormControl('', [Validators.required]),
            email: new UntypedFormControl('', [Validators.required, Validators.email]),
            mobile_number: new UntypedFormControl('', [Validators.required]),
            // eslint-disable-next-line max-len
            password: new UntypedFormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
        });
    }

    validate() {
        this.authService.register(this.newAccountForm.value);
    }
}
