import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
export class ModalOne implements OnInit, AfterViewInit, OnDestroy  {

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

    ngOnDestroy() {
        console.log('ModalOne - ngOnDestroy');
    }

    ionViewWillEnter() {
        console.log('ModalOne - ionViewWillEnter');
    }
    ionViewDidEnter() {
        console.log('ModalOne - ionViewDidEnter');
    }
    ionViewWillLeave() {
        console.log('ModalOne - ionViewWillLeave');
    }
    ionViewDidLeave() {
        console.log('ModalOne - ionViewDidLeave');
    }

    dismissModal() {
        this.modalCtrl.dismiss();
    }

    goToTwo() {
        const navs = document.querySelectorAll('ion-nav');
        if (navs && navs.length && navs.length > 0) {
            const nav = navs[navs.length - 1];
            // 把callback通过navParam传递给下一页
            nav.push(ModalTwo, { callbackWhenBack: this.getDataFromNextPage });
        }
    }

    getDataFromNextPage(data) {
        console.log('current page is ModalOne, data from next page is: ', data);
    }
}
