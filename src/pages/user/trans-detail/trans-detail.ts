import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TransDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trans-detail',
  templateUrl: './trans-detail.html',
})
export class TransDetailPage {

  followData ={
    timeStarts:'2018-01-01',
    timeEnds:'2018-01-02',
    data:[{
      series:"645456465465",
      date:'01-09 16:21:32',
      money:200.00,
      group:'腾讯分分彩',
      type:'派发奖金',
      rest_money:100000.00
    },{
      series:"645456465465",
      date:'01-09 16:21:32',
      money:-200.00,
      group:'腾讯分分彩',
      type:'追号',
      rest_money:100000.00
    },{
      series:"645456465465",
      date:'01-09 16:21:32',
      money:200.00,
      group:'银行卡充值',
      type:'',
      rest_money:100000.00
    }]
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransDetailPage');
  }

}
