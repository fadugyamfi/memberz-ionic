import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventSessionPage } from './event-session.page';

const routes: Routes = [
  {
    path: '',
    component: EventSessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventSessionPageRoutingModule {}
