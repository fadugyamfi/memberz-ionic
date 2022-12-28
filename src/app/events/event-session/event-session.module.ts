import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventSessionPageRoutingModule } from './event-session-routing.module';

import { EventSessionPage } from './event-session.page';
import { CardScannerComponent } from './card-scanner/card-scanner.component';
import { MemberSearchComponent } from './member-search/member-search.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventSessionPageRoutingModule,
    SharedModule,
    NgxScannerQrcodeModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EventSessionPage,
    CardScannerComponent,
    MemberSearchComponent
  ]
})
export class EventSessionPageModule {}