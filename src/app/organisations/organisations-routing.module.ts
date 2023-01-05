import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { OrganisationsPage } from './organisations.page';

const routes: Routes = [
  {
    path: '',
    component: OrganisationsPage
  },
  {
    path: ':id',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganisationsPageRoutingModule {}
