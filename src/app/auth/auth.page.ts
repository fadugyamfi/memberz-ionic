import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/api/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
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
