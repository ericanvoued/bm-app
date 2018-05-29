import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CommonStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-common-status',
  templateUrl: './common-status.html',
})
export class CommonStatusPage {

  statusData = {
    status:'',
    text:'waiting'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.statusData = this.navParams.data;
  }

}
