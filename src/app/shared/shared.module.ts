import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarSource, AvatarModule } from 'ngx-avatars';
import { QrCodeModule } from 'ng-qrcode';

const avatarSourcesOrder = [AvatarSource.CUSTOM, AvatarSource.INITIALS];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QrCodeModule,
    AvatarModule.forRoot({
      sourcePriorityOrder: avatarSourcesOrder
    }),
  ],
  exports: [
    AvatarModule,
    QrCodeModule
  ]
})
export class SharedModule { }
