import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit, AfterViewInit, OnDestroy {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config
  ) { }

  ngOnInit() {
    console.log('SchedulePage - ngOnInit');
    this.updateSchedule();

    this.ios = this.config.get('mode') === 'ios';
  }

  ngAfterViewInit() {
    console.log('SchedulePage - ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('SchedulePage - ngOnDestroy');
  }

  ionViewWillEnter() {
    console.log('SchedulePage - ionViewWillEnter');
  }
  ionViewDidEnter() {
    console.log('SchedulePage - ionViewDidEnter');
  }
  ionViewWillLeave() {
    console.log('SchedulePage - ionViewWillLeave');
  }
  ionViewDidLeave() { 
    console.log('SchedulePage - ionViewDidLeave');
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: ScheduleFilterPage,
      componentProps: { excludedTracks: this.excludeTracks }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.excludeTracks = data;
      this.updateSchedule();
    }
  }

  async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      const alert = await this.alertCtrl.create({
        header: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      await alert.present();
    }

  }

  async removeFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any, title: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }

  showSessionDetail(session) {
    // NavigationExtras#state 中不能放function
    // core.js:6014 ERROR Error: Uncaught (in promise): DataCloneError: Failed to execute 'pushState' on 'History': 
    // getDataFromNextPage(data) {
    // console.log('current page is SchedulePage, data from detail page: ', data);
    // } could not be cloned.
    /*  this.router.navigate(['/app/tabs/schedule/session/' + session.id], {
      state: {
        a: 1,
        b: 'qrcode',
        callbackWhenBack: this.getDataFromNextPage
      }
    }); */

    // TODO: 如何把getDataFromNextPage传递给detail？
    //       难道只能用一个共享的service来存放这个引用？
    this.router.navigate(['/app/tabs/schedule/session/' + session.id], {
      state: {
        a: 1,
        b: 'qrcode'
      }
    });
  }
  getDataFromNextPage(data) {
    console.log('current page is SchedulePage, data from detail page: ', data);
  }

}
