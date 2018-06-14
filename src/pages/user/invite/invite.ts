import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InviteRulePage } from '../invite-rule/invite-rule'


@IonicPage()
@Component({
  selector: 'page-invite',
  templateUrl: './invite.html',
})
export class InvitePage {

  contrast: number = 1890;
  rewardPoint = (this.contrast-1800)*0.05

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dragRange()
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitePage');
  }

  toRule(){
    this.navCtrl.push('InviteRulePage')
  }
  dragRange(){
    this.rewardPoint = (this.contrast-1800)*0.05.toFixed(2)
  }


}
