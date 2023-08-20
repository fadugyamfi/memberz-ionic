/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/api/auth.service';
import { MemberAccount } from '../../shared/models/api/member-account';
import { MemberAccountService } from '../../shared/services/api/member-account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
      password: new UntypedFormControl('', [Validators.required]),
    });
  }

  validate() {
    this.authService.register(this.newAccountForm.value);
  }
}
