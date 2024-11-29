import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./discover.page').then(m => m.DiscoverPage),
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
