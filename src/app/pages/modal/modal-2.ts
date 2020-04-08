import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import {
    NavController, LoadingController, AlertController, ToastController, ModalController,
    ActionSheetController, Events
} from '@ionic/angular';
import { ModalThree } from './modal-3';

@Component({
    selector: 'modal-2',
    templateUrl: 'modal-2.html'
})
export class ModalTwo implements OnInit, AfterViewInit  {

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
            const nav = document.querySelector('ion-nav');
            if (nav) {
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
        let data = {};
        this.modalCtrl.dismiss(data);
    }

    goToThree() {
        const navs = document.querySelectorAll('ion-nav');
        if (navs && navs.length && navs.length > 0) {
            const nav = navs[navs.length - 1];
            nav.push(ModalThree, {});
        }
    }
}
