import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./memberships.page').then(m => m.MembershipsPage)
  },
  {
    path: ':id',
    loadComponent: () => import('./details/details.component').then(m => m.DetailsComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembershipsPageRoutingModule {}
