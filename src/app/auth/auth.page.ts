import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/api/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  public loginForm: UntypedFormGroup;
  public emailLogin = false;

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

    this.authService.login(login.username, login.password, login.remember_me);
  }

}
