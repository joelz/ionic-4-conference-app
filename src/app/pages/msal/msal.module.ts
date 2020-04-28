import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MsalPage } from './msal';
import { MsalPageRoutingModule } from './msal-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MsalPageRoutingModule
  ],
  declarations: [MsalPage],
  bootstrap: [MsalPage],
})
export class MsalModule {}
