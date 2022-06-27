import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourMembershipsPageRoutingModule } from './your-memberships-routing.module';

import { YourMembershipsPage } from './your-memberships.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourMembershipsPageRoutingModule,
    SharedModule
  ],
  declarations: [YourMembershipsPage]
})
export class YourMembershipsPageModule {}
