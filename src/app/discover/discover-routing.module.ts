import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverPage } from './discover.page';

const routes: Routes = [
  {
    path: '',
    component: DiscoverPage,
  },
  {
    path: 'organisation/:slug',
    loadChildren: () => import('./organisation/organisation.module').then( m => m.OrganisationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscoverPageRoutingModule {}
