import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwoFactorAuthPage } from './two-factor-auth.page';

const routes: Routes = [
  {
    path: '',
    component: TwoFactorAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwoFactorAuthPageRoutingModule {}
