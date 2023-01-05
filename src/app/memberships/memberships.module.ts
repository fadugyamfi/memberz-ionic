import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembershipsPageRoutingModule } from './memberships-routing.module';

import { MembershipsPage } from './memberships.page';
import { SharedModule } from '../shared/shared.module';
import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';
import { DetailsComponent } from './details/details.component';
import { GroupsComponent } from './groups/groups.component';
import { AnniversariesComponent } from './anniversaries/anniversaries.component';
import { PaymentsComponent } from './payments/payments.component';
import { DirectoryComponent } from './directory/directory.component';

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
    DetailsComponent,
    GroupsComponent,
    AnniversariesComponent,
    PaymentsComponent,
    DirectoryComponent
  ]
})
export class MembershipsPageModule {}
