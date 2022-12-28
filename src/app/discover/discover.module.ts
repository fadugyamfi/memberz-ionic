import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscoverPage } from './discover.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { DiscoverPageRoutingModule } from './discover-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ExploreContainerComponentModule,
    DiscoverPageRoutingModule,
    MainMenuComponent
  ],
  declarations: [DiscoverPage]
})
export class DiscoverPageModule {}
