import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OtherQuestionsPage } from '../other-questions/other-questions'

@IonicPage()
@Component({
  selector: 'page-help-center',
  templateUrl: './help-center.html',
})
export class HelpCenterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  pushPage(page) {
    this.navCtrl.push(page)
  }

}
