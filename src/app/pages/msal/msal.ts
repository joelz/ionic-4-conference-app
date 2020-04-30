import { Component, ViewEncapsulation, OnInit, AfterViewInit, NgZone  } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';

import { JwtHelperService } from "@auth0/angular-jwt";
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-msal',
  templateUrl: 'msal.html',
  styleUrls: ['./msal.scss'],
})
export class MsalPage implements OnInit, AfterViewInit  {
  
  jwtHelper: JwtHelperService;
  cachedAccounts: any = [];
  selectedAccountId = '';
  signInResult = '';

  constructor(
    public popoverCtrl: PopoverController,
    protected modalCtrl: ModalController,
    public confData: ConferenceData,
    // * [angular2 changedetection - Triggering change detection manually in Angular - Stack Overflow]
    // (https://stackoverflow.com/questions/34827334/triggering-change-detection-manually-in-angular/41724333#41724333)
    public zone: NgZone,
  ) { 
    this.jwtHelper = new JwtHelperService();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // TODO: 为什么写在这里页面不会刷新
    this.getAccounts();

    //console.log(this.confData.cachedAccounts);
    //this.cachedAccounts = this.confData.cachedAccounts;
  }

  signInSilent() {
    const _ = this;
    if (!_.selectedAccountId) {
      alert('Please choose a account!');
      return;
    }
    (window.cordova.plugins as any).msalPlugin.signInSilent(
      function (msg) {
        const decodedToken = _.jwtHelper.decodeToken(msg);
        const expirationDate = _.jwtHelper.getTokenExpirationDate(msg);
        const isExpired = _.jwtHelper.isTokenExpired(msg);

        console.log(decodedToken);
        console.log(expirationDate);
        console.log(isExpired);

        _.callMsGraphApi(msg);
        // msg is your JWT for the account we found.
      },
      function (err) {
        _.handlerError(err);
        // err probably says "No accounts found" but maybe other debugging info
        // Don't show this to the user; just use it for debugging.
        // Here's where you either call the next prompt or wait for the user

        // TODO- fallback to interaction when silent call fails
        console.log("silent token acquisition fails. acquiring token using popup");
        // scenario 01-AADSTS50173: The session is not valid due to password expiration or recent password change.
        // scenario 02-"No accounts found" in iOS
        _.signInInteractive();
      },
      _.selectedAccountId
    );
  }

  signInInteractive() {
    const _ = this;
    (window.cordova.plugins as any).msalPlugin.signInInteractive(
      function (msg) {
        const decodedToken = _.jwtHelper.decodeToken(msg);
        const expirationDate = _.jwtHelper.getTokenExpirationDate(msg);
        const isExpired = _.jwtHelper.isTokenExpired(msg);

        console.log(decodedToken);
        console.log(expirationDate);
        console.log(isExpired);

        _.callMsGraphApi(msg);
        _.getAccounts();
        // msg is your JWT for the account the user just signed into
        // Also never use a preposition to end a sentence with
      },
      function (err) {
        _.handlerError(err);
        // Usually if we get an error it just means the user cancelled the
        // signin process and closed the popup window. Handle this however
        // you want, depending again if you want guest access or not.
      }
    );
  }

  signOut() {
    const _ = this;
    if (!_.selectedAccountId) {
      alert('Please choose a account!');
      return;
    }
    (window.cordova.plugins as any).msalPlugin.signOut(
      function (msg) {
        console.log(msg);
        _.zone.run(() => {
          _.signInResult = msg;
        });
        // msg is just the "OK" plugin result

        _.getAccounts();
      },
      function (err) {
        _.handlerError(err);
        // An error here usually either means you accidentally tried to
        // sign out someone who wasn't signed in, or there was a problem
        // communicating with the server.
      },
      _.selectedAccountId
    );
  }

  getAccounts() {
    const _ = this;
    _.selectedAccountId = '';
    (window.cordova.plugins as any).msalPlugin.getAccounts(
      (accounts) => {
        if (accounts.length === 0) {
          console.log('no accounts');
          _.zone.run(() => {
            _.cachedAccounts = [];
          });
        } else {
          console.log('getAccounts():', accounts);
          _.zone.run(() => {
            _.cachedAccounts = accounts;
          });
        }
      },
      (err) => {
        _.handlerError(err);
      }
    );
  }

  callMsGraphApi(jwt) {
    const _ = this;
    this.confData.callMsGraphApi(jwt).subscribe(
      response => {
        console.log(response);
        _.zone.run(() => {
          _.signInResult = JSON.stringify(response, null, 2);
        });
      },
      error => {
        console.log('confData.callMsGraphApi error', error);
      },
      () => {
        console.log('confData.callMsGraphApi done.');
      }
    );
  }

  handlerError(err) {
    console.log('error', err);

    this.zone.run(() => { 
      this.signInResult = 'ERROR：' + JSON.stringify(err, null, 2);
    });
  }
}
