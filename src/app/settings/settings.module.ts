import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsPage } from './settings.page';

import { SettingsPageRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SettingsPageRoutingModule,
    SharedModule,
    NgxScannerQrcodeModule,
    MainMenuComponent
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
