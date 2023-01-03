import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentsPage } from './payments.page';

import { PaymentsPageRoutingModule } from './payments-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: PaymentsPage }]),
    PaymentsPageRoutingModule,
  ],
  declarations: [PaymentsPage]
})
export class PaymentsPageModule {}
