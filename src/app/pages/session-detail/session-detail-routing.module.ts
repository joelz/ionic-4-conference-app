import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SessionDetailPage } from './session-detail';
import { SessionWatchPage } from './session-watch';

const routes: Routes = [
  {
    path: 'watch',
    component: SessionWatchPage
  },
  {
    path: '',
    component: SessionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionDetailPageRoutingModule { }
