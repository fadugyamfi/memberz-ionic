import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserNotLoggedInGuard } from '../shared/guards/user-not-logged-in.guard';



const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth.page').then(m => m.AuthPage),
    canActivate: [UserNotLoggedInGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '2fa',
    loadChildren: () => import('./two-factor-auth/two-factor-auth.module').then( m => m.TwoFactorAuthPageModule),
    canActivate: [UserNotLoggedInGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'verify-otp',
    loadChildren: () => import('./verify-otp/verify-otp.module').then( m => m.VerifyOtpPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
