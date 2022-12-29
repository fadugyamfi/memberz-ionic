import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganisationsPageRoutingModule } from './organisations-routing.module';

import { OrganisationsPage } from './organisations.page';
import { SharedModule } from '../shared/shared.module';
import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganisationsPageRoutingModule,
    SharedModule,
    MainMenuComponent
  ],
  declarations: [
    OrganisationsPage,
    DashboardComponent
  ]
})
export class OrganisationsPageModule {}
