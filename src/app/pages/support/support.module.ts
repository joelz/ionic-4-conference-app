import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupportPage } from './support';
import { SupportPageRoutingModule } from './support-routing.module';
import { SupportDetailPage } from './support-detail';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportPageRoutingModule
  ],
  declarations: [
    SupportPage,
    SupportDetailPage,
  ]
})
export class SupportModule { }
