import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

import { ResetPasswordPage } from './reset-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordPageRoutingModule,
    ReactiveFormsModule,
    RouterOutlet
  ],
  declarations: [ResetPasswordPage]
})
export class ResetPasswordPageModule {}
