import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarSource, AvatarModule } from 'ngx-avatar';

const avatarSourcesOrder = [AvatarSource.CUSTOM, AvatarSource.INITIALS];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AvatarModule.forRoot({
      sourcePriorityOrder: avatarSourcesOrder
    }),
  ],
  exports: [
    AvatarModule
  ]
})
export class SharedModule { }
