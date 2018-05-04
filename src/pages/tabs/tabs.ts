import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';

import { HomePage } from '../home/home';
import { LottoryCenterPage } from '../lottory-center/lottory-center';
import { ActivityPage } from '../activity/activity';
import { UserCenterPage } from '../user/user-center/user-center';

@Component({
  selector: 'page-tab',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root = HomePage;
  tab2Root = LottoryCenterPage;
  tab3Root = ActivityPage;
  tab4Root = UserCenterPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidEnter() {
    let pageIndex = this.navParams.get('pageIndex');
    pageIndex ? this.tabRef.select(pageIndex) : this.tabRef.select(0);
  }
}
