import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-withdraw',
  templateUrl: './withdraw.html',
})
export class WithdrawPage {

  withDrawMoney = 0.00;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawPage');
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: '请输入支付密码',
      inputs: [
        {
          name: 'psw',
          type:'password',
          placeholder: '至少6位，字母和数字组合'
        },
      ],
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确定',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }



}
