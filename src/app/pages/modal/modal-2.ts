import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
export class ModalTwo implements OnInit, AfterViewInit, OnDestroy  {

    isInDesktop = false;
    rootPage: any;
    rootPageParam: any;
    canGoBack = false;

    navsCount = 0;

    callbackWhenBack: any;

    constructor(
        public navParams: NavParams,
        protected modalCtrl: ModalController
    ) {
        if (this.navParams.get('callbackWhenBack')) {
            this.callbackWhenBack = this.navParams.get('callbackWhenBack');
        }
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

    ngOnDestroy() {
        console.log('ModalTwo - ngOnDestroy');
        // 这句写在ionViewWillLeave中不行
        // A->B->C, 当前页是B
        // ionViewWillLeave在B回A和B->C时都会触发
        // 而ngOnDestroy只在B回A时触发
        if (this.callbackWhenBack) {
            this.callbackWhenBack({ name: 'Joe', age: 15 });
        }
    }

    ionViewWillEnter() {
        console.log('ModalTwo - ionViewWillEnter');
    }
    ionViewDidEnter() {
        console.log('ModalTwo - ionViewDidEnter');
    }
    ionViewWillLeave() {
        console.log('ModalTwo - ionViewWillLeave');
    }
    ionViewDidLeave() {
        console.log('ModalTwo - ionViewDidLeave');
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
