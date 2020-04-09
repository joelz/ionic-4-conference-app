import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
    selector: 'modal-root',
    templateUrl: 'modal-root.html'
})
export class ModalRootPage implements OnInit, AfterViewInit  {

    isInDesktop = false;
    rootPage: any;
    rootPageParam: any;

    constructor(public navParams: NavParams) {
        console.log('ModalRootComponent-constructor');
    }

    ngOnInit(): void {
        console.log('ModalRootComponent-ngOnInit');
    }


    ngAfterViewInit() {
        console.log('ModalRootComponent-ngAfterViewInit');
        if (this.navParams.get('rootPageParam')) {
            this.rootPageParam = this.navParams.get('rootPageParam');
        }
        if (this.navParams.get('rootPage')) {
            this.rootPage = this.navParams.get('rootPage');
        }

        // TODO- 這里要写一个函数去找到离自己最近的那个ion-nav
        const navs = document.querySelectorAll('ion-nav');
        const nav = navs[navs.length - 1];
        nav.setRoot(this.rootPage, this.rootPageParam);
    }

    ionViewWillEnter() {
        console.log('ModalRootComponent - ionViewWillEnter');
    }
    ionViewDidEnter() {
        console.log('ModalRootComponent - ionViewDidEnter');
    }
    ionViewWillLeave() {
        console.log('ModalRootComponent - ionViewWillLeave');
    }
    ionViewDidLeave() {
        console.log('ModalRootComponent - ionViewDidLeave');
    }
}
