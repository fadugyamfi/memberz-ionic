import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsPage } from './settings.page';

import { SettingsPageRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';
import {
    IonHeader, IonToolbar, IonTitle, IonLabel, IonContent, IonList,
    IonItemGroup, IonListHeader, IonItem, IonIcon
} from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SettingsPageRoutingModule,
        SharedModule,
        NgxScannerQrcodeModule,
        MainMenuComponent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonLabel,
        IonContent,
        IonList,
        IonItemGroup,
        IonListHeader,
        IonItem,
        IonIcon
    ],
    declarations: [SettingsPage]
})
export class SettingsPageModule { }
