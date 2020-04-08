import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import {
    NavController, LoadingController, AlertController, ToastController, ModalController,
    ActionSheetController, Events
} from '@ionic/angular';
import { ModalRootPage } from './modal-root';
import { ModalOne } from './modal-1';

@Component({
    selector: 'modal-3',
    templateUrl: 'modal-3.html'
})
export class ModalThree implements OnInit, AfterViewInit  {

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
