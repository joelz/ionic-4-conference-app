import { Component, ViewEncapsulation } from '@angular/core';

import { PopoverController, ModalController } from '@ionic/angular';

import { PopoverPage } from '../about-popover/about-popover';
import { ModalRootPage } from '../modal/modal-root';
import { ModalOne } from '../modal/modal-1';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {
  conferenceDate = '2047-05-17';

  constructor(
    public popoverCtrl: PopoverController,
    protected modalCtrl: ModalController,
  ) { }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }

  async showModal() {
    const articleModal = await this.modalCtrl.create({
      component: ModalRootPage,
      componentProps: {
        rootPage: ModalOne,
        rootPageParam: { id: 1, sectionId: 1 }
      }
    });
    await articleModal.present();
  }
}
