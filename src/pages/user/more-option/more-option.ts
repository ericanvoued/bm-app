import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AboutUsPage } from '../about-us/about-us'
@IonicPage()
@Component({
  selector: 'page-more-option',
  templateUrl: './more-option.html',
})
export class MoreOptionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreOptionPage');
  }

  pushPage() {
    this.navCtrl.push('AboutUsPage')
  }

}
