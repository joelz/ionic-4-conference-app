import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import {
    NavController, LoadingController, AlertController, ToastController, ModalController,
    ActionSheetController, Events
} from '@ionic/angular';
import { ModalTwo } from './modal-2';

@Component({
    selector: 'modal-1',
    templateUrl: 'modal-1.html'
})
export class ModalOne implements OnInit, AfterViewInit  {

    isInDesktop = false;
    rootPage: any;
    rootPageParam: any;

    canGoBack = false;

    navsCount = 0;

    constructor(
        public navParams: NavParams,
        protected modalCtrl: ModalController
    ) {
    }

    ngOnInit(): void {
        const navs = document.querySelectorAll('ion-nav');
        if (navs && navs.length && navs.length > 0) { 
            this.navsCount = navs.length;
        }
    }


    ngAfterViewInit() {
        setTimeout(() => {
            // 這里要写一个函数去找到离自己最近的那个ion-nav
            const navs = document.querySelectorAll('ion-nav');
            if (navs && navs.length && navs.length > 0) {
                const nav = navs[navs.length - 1];
                nav.canGoBack().then(v => {
                    console.log(v);
                    this.canGoBack = v;
                });
            }
        }, 100 * 1);
    }

    ionViewDidEnter() {

    }

    dismissModal() {
        this.modalCtrl.dismiss();
    }

    goToTwo() {
        const navs = document.querySelectorAll('ion-nav');
        if (navs && navs.length && navs.length > 0) {
            const nav = navs[navs.length - 1];
            nav.push(ModalTwo, {});
        }
    }
}
