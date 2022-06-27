import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourMembershipsPage } from './your-memberships.page';

const routes: Routes = [
  {
    path: '',
    component: YourMembershipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourMembershipsPageRoutingModule {}
