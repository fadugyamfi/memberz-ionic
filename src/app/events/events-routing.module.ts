import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsPage } from './events.page';

const routes: Routes = [
  {
    path: '',
    component: EventsPage,
  },

  {
    path: ':id',
    loadChildren: () => import('./event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
  {
    path: ':id/sessions/:session_id',
    loadChildren: () => import('./event-session/event-session.module').then( m => m.EventSessionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsPageRoutingModule {}
