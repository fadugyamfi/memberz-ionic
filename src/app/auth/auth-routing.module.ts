import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserNotLoggedInGuard } from '../shared/guards/user-not-logged-in.guard';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: 'login',
    component: AuthPage,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
