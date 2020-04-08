import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { AboutPage } from './about';
import { ModalRootPage } from '../modal/modal-root';
import { ModalOne } from '../modal/modal-1';
import { ModalTwo } from '../modal/modal-2';
import { ModalThree } from '../modal/modal-3';

const routes: Routes = [
  {
    path: '',
    component: AboutPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [ModalRootPage, ModalOne, ModalTwo, ModalThree],
  entryComponents: [ModalRootPage, ModalOne, ModalTwo, ModalThree]
})
export class AboutPageRoutingModule { }
