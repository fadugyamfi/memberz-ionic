import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'pages',
    component: TabsPage,
    children: [
      {
        path: 'events',
        loadChildren: () => import('../events/events.module').then(m => m.EventsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('../payments/payments.module').then(m => m.PaymentsPageModule)
      },
      {
        path: 'memberships',
        loadChildren: () => import('../memberships/memberships.module').then(m => m.MembershipsPageModule)
      },
      {
        path: 'organisations',
        loadChildren: () => import('../organisations/organisations.module').then( m => m.OrganisationsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/pages/memberships',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/pages/memberships',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
