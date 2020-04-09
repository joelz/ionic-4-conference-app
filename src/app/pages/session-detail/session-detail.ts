import { Component, OnInit, AfterViewInit, OnDestroy  } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-session-detail',
  styleUrls: ['./session-detail.scss'],
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage implements OnInit, AfterViewInit, OnDestroy  {
  session: any;
  isFavorite = false;
  defaultHref = '';
  sessionId = '';

  constructor(
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');
    console.log('SessionDetailPage - ngOnInit');
    console.log('SessionDetailPage - paramMap', this.route.snapshot.paramMap);
    console.log('SessionDetailPage - queryParamMap', this.route.snapshot.queryParamMap);
    console.log('SessionDetailPage - NavigationExtras#state', this.router.getCurrentNavigation().extras.state);
  }

  ngAfterViewInit() {
    console.log('SessionDetailPage - ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('SessionDetailPage - ngOnDestroy');
  }

  ionViewWillEnter() {
    console.log('SessionDetailPage - ionViewWillEnter');
    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.schedule && data.schedule[0] && data.schedule[0].groups) {
        const sessionId = this.route.snapshot.paramMap.get('sessionId');
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === sessionId) {
                this.session = session;

                this.isFavorite = this.userProvider.hasFavorite(
                  this.session.name
                );

                break;
              }
            }
          }
        }
      }
    });
  }

  ionViewDidEnter() {
    console.log('SessionDetailPage - ionViewDidEnter');
    this.defaultHref = `/app/tabs/schedule`;
  }
  ionViewWillLeave() {
    console.log('SessionDetailPage - ionViewWillLeave');
  }
  ionViewDidLeave() {
    console.log('SessionDetailPage - ionViewDidLeave');
  }

  sessionClick(item: string) {
    console.log('Clicked', item);
    if (item == 'watch') {
      this.router.navigate(['/app/tabs/schedule/session/' + this.sessionId + '/watch'], { state: { a: 1, b: 'qrcode' } });
    }
  }

  toggleFavorite() {
    if (this.userProvider.hasFavorite(this.session.name)) {
      this.userProvider.removeFavorite(this.session.name);
      this.isFavorite = false;
    } else {
      this.userProvider.addFavorite(this.session.name);
      this.isFavorite = true;
    }
  }

  shareSession() {
    console.log('Clicked share session');
  }
}
