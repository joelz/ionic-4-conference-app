import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SupportPage } from './support';
import { SupportDetailPage } from './support-detail';

const routes: Routes = [
  {
    path: 'detail',
    component: SupportDetailPage
  },  
  {
    path: '',
    component: SupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportPageRoutingModule { }
