/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { APIService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventsService } from '../events.service';
import { StorageService } from '../storage.service';
import { map, switchMap } from 'rxjs/operators';
import { MemberAccount } from '../../models/api/member-account';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OrganisationService } from './organisation.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

const Alert = Swal.mixin({
  heightAuto: false
});

export interface RegisterUserContract {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  dob: string;
  gender: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends APIService<MemberAccount> {
  public userData: MemberAccount;
  public _sessionId: MemberAccount;
  public currentLang: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public DAYS_TO_REMEMBER_USER = 30;

  constructor(
    public http: HttpClient,
    public events: EventsService,
    public storage: StorageService,
    public router: Router,
    public organisationService: OrganisationService,
    public translate: TranslateService
  ) {
    super(http, events, storage);

    this.url = '/auth';
    this.model_name = 'Auth';

    translate.setDefaultLang('en');

    if (this.storage.has('current_lang')) {
      this.currentLang = this.storage.get('current_lang');
      translate.use(this.currentLang);
    }

    this.setupEvents();
    this.loadUserData();
  }

  get isLoggedIn(): boolean {
    return this.storage.has('auth') && this.storage.has('user');
  }

  get showLoader() {
    return this.requesting;
  }

  public setupEvents() {
    this.events.on('api:authentication:required', () => this.logout({ force: true }));
    this.events.on('api:authentication:clear', () => this.clearAndRedirect());
    this.events.on('auth:logout', () => this.logout());
    this.events.on('auth:refresh', () => this.me(true).subscribe());
  }

  public login(username: string, password: string, rememberMe: boolean = false) {
    const DURATION = rememberMe ? this.DAYS_TO_REMEMBER_USER : 1;
    const params = { username, password };

    this.storage.set('loginUser', params);
    this.storage.set('remember_me', rememberMe);

    return this.post(`${this.url}/login`, params).subscribe({
      next: (res: any) => {
        // eslint-disable-next-line eqeqeq
        if (res.status == '2fa') {
          this.router.navigate(['/auth/2fa']);
        } else {
          this.performLogin(res, DURATION, rememberMe);
        }
      },
      error: () => {
        Alert.fire(
          this.translate.instant('Login Failed'),
          this.translate.instant('Username or Password may be incorrect') + '. ' + this.translate.instant('Please try again'),
          'error'
        );
        this.requesting = false;
      },
      complete: () => Alert.close()
    });
  }


  public validateTwoFactorAuthLogin(code: string) {
    const login = this.storage.get('loginUser');
    const rememberMe = this.storage.get('remember_me');

    const DURATION = rememberMe ? this.DAYS_TO_REMEMBER_USER : 1;
    const params = { username: login.username, password: login.password, code };

    return this.post(`${this.url}/2fa-validate`, params).subscribe({
      next: (res) => {
        this.performLogin(res, DURATION, rememberMe);
      },
      error: () => {
        Alert.fire(
          this.translate.instant('Login Failed'),
          this.translate.instant('Username or Password may be incorrect') + '.' + this.translate.instant('Please try again'),
          'error'
        );
        this.requesting = false;
      }
    });
  }

  public performLogin(res: object, DURATION: number, rememberMe: boolean) {
    this.storage.remove('loginUser');
    this.storage.remove('remember_me');
    this.storage.set('auth', res, DURATION, 'day');

    this.me(rememberMe).subscribe({
      next: () => this.router.navigate(['/tabs']),
      error: () => {
        Alert.fire(
          this.translate.instant('Account Info Not Found'),
          this.translate.instant('Please attempt login again'),
          'info'
        ).then(() => {
          this.router.navigate(['/auth/login']);
        });
      }
    });
  }

  public register(data: RegisterUserContract) {
    Alert.fire(
      this.translate.instant('Registering Your Account'),
      this.translate.instant('You will be logged in automatically when successful'),
      'info'
    );
    Alert.showLoading();

    return this.post(`${this.url}/register`, data).subscribe({
      next: () => {
        this.login(data.email, data.password);
        Alert.fire(
          this.translate.instant('Registration Successful'),
          this.translate.instant('Logging in to the application'),
          'success'
        );
        Alert.showLoading();
      },
      error: () => {
        Alert.fire(
          this.translate.instant('Registration Failed'),
          this.translate.instant('Please try again'),
          'error'
        );
        Alert.hideLoading();
        this.requesting = false;
      },
      complete: () => Alert.close()
    });
  }

  public forgotPassword(email: string) {
    return this.post(`${this.url}/forgot-password`, {
      username: email,
    }).subscribe({
      next: () => {
        Alert.fire(
          this.translate.instant('Request Successful'),
          this.translate.instant('A password reset link has been sent to your email') + '.' +
          this.translate.instant('Please use that link to reset your password'),
          'success'
        );
        this.router.navigate(['/auth/login']);
      },
      error: () => (this.requesting = false)
    });
  }

  public resetPassword(username: string, password: string, token: string) {
    const params = { username, password, token };

    return this.post(`${this.url}/reset-password`, params).subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: () => (this.requesting = false)
    });
  }

  public me(rememberUser: boolean = false) {
    const DURATION = rememberUser ? this.DAYS_TO_REMEMBER_USER : 1;

    return this.get(`${this.url}/me`).pipe(
      map((response) => {
        const user = new MemberAccount(response);
        this.storage.set('user', user, DURATION, 'day');
        this.loadUserData();
        this.events.trigger('auth:refreshed');
        return user;
      })
    );
  }

  // Sign out
  public logout(options = { force: false }) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    if (!this.storage.isValid('auth') || options.force) {
      this.clearAndRedirect();
      return;
    }

    this.post(`${this.url}/logout`, {}).subscribe({
      next: () => this.clearAndRedirect(), // on success
      error: () => this.clearAndRedirect() // on error
    });
  }

  public clearAndRedirect() {
    Alert.close();
    this.clearSession();
    this.router.navigate(['/auth/login']);
  }

  public clearSession() {
    this.storage.engine.clear();
  }

  loadUserData() {
    if (this.storage.has('user')) {
      this.userData = this.userStorageData();
      this._sessionId = this.userData;
    }
  }

  getLoggedInUser(): MemberAccount {
    return this.userData;
  }

  public userStorageData(): MemberAccount {
    return new MemberAccount(this.storage.get('user'));
  }
}
