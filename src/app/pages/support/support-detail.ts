import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NavHelperService } from '../../providers/nav-helper.service';

@Component({
  selector: 'page-support-detail',
  templateUrl: 'support-detail.html'
})
export class SupportDetailPage implements  OnInit, AfterViewInit, OnDestroy {
  session: any;
  isFavorite = false;
  defaultHref = '';
  sessionId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navHelper: NavHelperService,
  ) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');
    console.log('SupportDetailPage - ngOnInit');
    console.log('SupportDetailPage - paramMap', this.route.snapshot.paramMap);
    console.log('SupportDetailPage - queryParamMap', this.route.snapshot.queryParamMap);
    console.log('SupportDetailPage - NavigationExtras#state', this.router.getCurrentNavigation().extras.state);
  }

  ngAfterViewInit() {
    console.log('SupportDetailPage - ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('SupportDetailPage - ngOnDestroy');
    this.navHelper.paymentPlanChanged.next({ name: 'Emily', age: 8, error: true });
  }

  ionViewWillEnter() {
    console.log('SupportDetailPage - ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('SupportDetailPage - ionViewDidEnter');
    this.defaultHref = '/support';
  }
  ionViewWillLeave() {
    console.log('SupportDetailPage - ionViewWillLeave');
  }
  ionViewDidLeave() {
    console.log('SupportDetailPage - ionViewDidLeave');
  }

  buttonClick() {
    this.navHelper.showRouterOutletInfo();
  }
}
