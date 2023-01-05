import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';

import { MembershipsPage } from './memberships.page';

const routes: Routes = [
  {
    path: '',
    component: MembershipsPage
  },
  {
    path: ':id',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembershipsPageRoutingModule {}
