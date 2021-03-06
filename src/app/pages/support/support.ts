import { Component, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController, ToastController, Events } from '@ionic/angular';
import { NavHelperService } from '../../providers/nav-helper.service';



@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
  styleUrls: ['./support.scss'],
})
export class SupportPage implements OnInit, OnDestroy {
  submitted = false;
  supportMessage: string;
  callbackKey = 'SupportPage.getDataFromNextPage';
  paymentPlanChangedSub = null;
  detailBackSub: (data: any) => void;

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private router: Router,
    private navHelper: NavHelperService,
    private ionicEvents: Events,
  ) { }

  async ionViewDidEnter() {
    const toast = await this.toastCtrl.create({
      message: 'This does not actually send a support request.',
      duration: 3000
    });
    await toast.present();
  }

  async submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.supportMessage = '';
      this.submitted = false;

      const toast = await this.toastCtrl.create({
        message: 'Your support request has been sent.',
        duration: 3000
      });
      await toast.present();
    }
  }

  ngOnInit() {
    this.paymentPlanChangedSub = this.navHelper.paymentPlanChanged.subscribe(data => {
      this.getDataFromNextPage(data);
    });

    this.detailBackSub = (data) => {
      console.log('data get from Ionic Events:', data);
    };
    this.ionicEvents.subscribe('support:back-from-detail', this.detailBackSub);
  }

  ngOnDestroy() {
    this.navHelper.callbacks[this.callbackKey] = null;
    this.paymentPlanChangedSub.unsubscribe();

    if (this.detailBackSub) {
      this.ionicEvents.unsubscribe('support:back-from-detail', this.detailBackSub);
    }
  }

  // If the user enters text in the support question and then navigates
  // without submitting first, ask if they meant to leave the page
  // async ionViewCanLeave(): Promise<boolean> {
  //   // If the support message is empty we should just navigate
  //   if (!this.supportMessage || this.supportMessage.trim().length === 0) {
  //     return true;
  //   }

  //   return new Promise((resolve: any, reject: any) => {
  //     const alert = await this.alertCtrl.create({
  //       title: 'Leave this page?',
  //       message: 'Are you sure you want to leave this page? Your support message will not be submitted.',
  //       buttons: [
  //         { text: 'Stay', handler: reject },
  //         { text: 'Leave', role: 'cancel', handler: resolve }
  //       ]
  //     });

  //     await alert.present();
  //   });
  // }

  buttonClick() {
    this.router.navigate(['/support/detail'], { state: { a: 1, b: 'qrcode', callback: this.callbackKey } });

    // 直接这样存放引用不行，当前页面无法离开
    // setTimeout(() => {
    //   this.navHelper.callbacks[this.callbackKey] = this.getDataFromNextPage;
    // }, 500);
  }

  getDataFromNextPage(data) {
    console.log('current page is SupportPage, data from detail page: ', data);
  }
}
