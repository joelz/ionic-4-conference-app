import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionDetailPage } from './session-detail';
import { SessionWatchPage } from './session-watch';
import { SessionDetailPageRoutingModule } from './session-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SessionDetailPageRoutingModule
  ],
  declarations: [
    SessionDetailPage,
    SessionWatchPage,
  ]
})
export class SessionDetailModule { }
