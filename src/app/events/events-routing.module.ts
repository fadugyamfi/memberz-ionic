import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./events.page').then(m => m.EventsPage),
  },

  {
    path: 'create',
    loadChildren: () => import('./create-event/create-event.module').then( m => m.CreateEventPageModule),
  },

  {
    path: ':id',
    loadChildren: () => import('./event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
  {
    path: ':id/sessions/:session_id',
    loadChildren: () => import('./event-session/event-session.module').then( m => m.EventSessionPageModule)
  },
  {
    path: 'create-event',
    loadChildren: () => import('./create-event/create-event.module').then( m => m.CreateEventPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsPageRoutingModule {}
