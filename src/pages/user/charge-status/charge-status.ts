import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-charge-status',
  templateUrl: './charge-status.html',
})
export class ChargeStatusPage {
  statusData= {
    bank:'',
    money:0.00,
    status:''
  }

  constructor( public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.statusData ={
      bank: this.navParams.get('bank'),
      money:this.navParams.get('money'),
      status: this.navParams.get('status')
    }
  }


  viewDismiss(){
    this.navCtrl.pop()
  }
}
