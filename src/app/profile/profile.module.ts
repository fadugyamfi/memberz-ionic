import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ProfilePageRoutingModule,
    SharedModule,
    NgxScannerQrcodeModule,
    MainMenuComponent
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
