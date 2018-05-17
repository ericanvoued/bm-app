import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController,AlertController, NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading';
import { CommonStatusPage } from '../common-status/common-status'



@IonicPage()
@Component({
  selector: 'page-bank-card',
  templateUrl: './bank-card.html',
})
export class BankCardPage {

  bcData = {
    toast:null,
  }

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadPrd: LoadingProvider,
    public toastCtrl:ToastController,
    public navParams: NavParams) {
  }

  //*************************************添加银行卡*****************************************
  addBankCard() {
    this.setPayPsw()
  }

  //*************************************设置支付密码****************************************
  setPayPsw(){
    let prompt = this.alertCtrl.create({
      title: '请设置支付密码',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: '至少6位，字母和数字组合'
        },
        {
          name: 'comfirmPsw',
          type: 'password',
          placeholder: '重复输入支付密码'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {

          }
        },
        {
          text: '确认',
          handler: data => {
            if (data.password != data.comfirmPsw) {
              this.bcData.toast = this.loadPrd.showToast(this.toastCtrl, '两次输入的密码不一致');
              return false
            } else if (data.password.length < 6 || data.password.length > 16) {
              this.bcData.toast = this.loadPrd.showToast(this.toastCtrl, '输入的密码长度不对');
              return false
            }else{
              this.navCtrl.push('CommonStatusPage')
            }
          }
        }
      ]
    });
    prompt.present();
  }


  handlePsw(data){

  }

}
