import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembershipsPageRoutingModule } from './memberships-routing.module';

import { MembershipsPage } from './memberships.page';
import { SharedModule } from '../shared/shared.module';
import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembershipsPageRoutingModule,
    SharedModule,
    MainMenuComponent
  ],
  declarations: [
    MembershipsPage,
    DetailsComponent
  ]
})
export class MembershipsPageModule {}
