import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AboutUsPage } from '../about-us/about-us'
import { HelpCenterPage } from '../help-center/help-center'
import { FeedbackPage } from '../feedback/feedback'
import { AgreementPage } from '../agreement/agreement'

@IonicPage()
@Component({
  selector: 'page-more-option',
  templateUrl: './more-option.html',
})
export class MoreOptionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  pushPage(page) {
    this.navCtrl.push(page)
  }

}
