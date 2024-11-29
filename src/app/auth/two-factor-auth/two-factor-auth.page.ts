import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../shared/services/api/auth.service';
import { StorageService } from '../../shared/services/storage.service';
import { IonHeader, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonButton, IonText } from '@ionic/angular/standalone';

@Component({
    selector: 'app-two-factor-auth',
    templateUrl: './two-factor-auth.page.html',
    styleUrls: ['./two-factor-auth.page.scss'],
    imports: [IonHeader, IonTitle, IonContent, FormsModule, ReactiveFormsModule, IonGrid, IonRow, IonCol, IonItem, IonInput, IonButton, IonText]
})
export class TwoFactorAuthPage implements OnInit {

    public twoFactorAuthForm: UntypedFormGroup;

    constructor(
        public router: Router,
        public fb: UntypedFormBuilder,
        public storage: StorageService,
        public translate: TranslateService,
        public authService: AuthService
    ) {
        this.twoFactorAuthForm = this.fb.group({
            code: ['', [Validators.required]]
        });
    }

    ngOnInit() {
    }

    validate() {
        const twoFactorAuthForm = this.twoFactorAuthForm.value;

        this.authService.validateTwoFactorAuthLogin(twoFactorAuthForm.code);
    }
}
