import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscoverPage } from './discover.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { DiscoverPageRoutingModule } from './discover-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ExploreContainerComponentModule,
    DiscoverPageRoutingModule
  ],
  declarations: [DiscoverPage]
})
export class DiscoverPageModule {}
