import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TwoFactorAuthPageRoutingModule } from './two-factor-auth-routing.module';

import { TwoFactorAuthPage } from './two-factor-auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TwoFactorAuthPageRoutingModule
  ],
  declarations: [TwoFactorAuthPage]
})
export class TwoFactorAuthPageModule {}
