import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-session-watch',
  styleUrls: ['./session-watch.scss'],
  templateUrl: 'session-watch.html'
})
export class SessionWatchPage implements  OnInit, AfterViewInit, OnDestroy {
  session: any;
  isFavorite = false;
  defaultHref = '';
  sessionId = '';

  constructor(
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');
    console.log('SessionWatchPage - ngOnInit');
    console.log('SessionWatchPage - paramMap', this.route.snapshot.paramMap);
    console.log('SessionWatchPage - queryParamMap', this.route.snapshot.queryParamMap);
    console.log('SessionWatchPage - NavigationExtras#state', this.router.getCurrentNavigation().extras.state);
  }

  ngAfterViewInit() {
    console.log('SessionWatchPage - ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('SessionWatchPage - ngOnDestroy');
  }

  ionViewWillEnter() {
    console.log('SessionWatchPage - ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('SessionWatchPage - ionViewDidEnter');
    this.defaultHref = '/app/tabs/schedule/session/' + this.sessionId;
  }
  ionViewWillLeave() {
    console.log('SessionWatchPage - ionViewWillLeave');
  }
  ionViewDidLeave() {
    console.log('SessionWatchPage - ionViewDidLeave');
  }
}
