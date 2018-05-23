import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController,ToastController,AlertController, NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading';
import { CommonStatusPage } from '../common-status/common-status';
import { flyUp } from '../../../animation/flyUp'

import {Storage} from '@ionic/storage';
import { BankCardProvider } from '../../../providers/bank-card/bank-card'
import { AddBankCardPage } from '../add-bank-card/add-bank-card'
import { UnbindBankCardPage } from '../unbind-bank-card/unbind-bank-card'

@IonicPage()
@Component({
  selector: 'page-bank-card',
  templateUrl: './bank-card.html',
  animations: [
    flyUp
  ]
})
export class BankCardPage {

  bcData = {
    authToken:'init',
    toast:null,
    isLocked:false,
    userInfo:null,
    bankList:[
      // {
      //   bankStr:'cmb',
      //   bankName:'招商银行',
      //   bankType:'储蓄卡',
      //   bankNum:'**** **** **** **** 123'
      // }
    ]
  }

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadPrd: LoadingProvider,
    public storage: Storage,
    public bankCardPrd:BankCardProvider,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public navParams: NavParams) {

    this.getUserInfo();
  }

  getUserInfo(){
    this.storage.get('userInfo').then((val) => {
      this.bcData.userInfo = val
      console.log(this.bcData.userInfo)
    });

  }

  // ionViewWillEnter(){
  //   this.getUserInfo();
  // }
  //
  // ionViewDidEnter(){
  //   this.loadBindCardData()
  // }
  //
  // loadBindCardData() {
  //   console.log(this.bcData.userInfo)
  //   this.bankCardPrd.getBindCard({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     '_t': this.bcData.userInfo.auth_token,
  //     '_token': this.bcData.userInfo._token
  //   }).subscribe((data) => {
  //     console.log(data)
  //   })
  // }




  //*************************************添加银行卡*****************************************
  addBankCard() {
    // this.setPayPsw()

    this.navCtrl.push('AddBankCardPage')
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
              this.navCtrl.push('CommonStatusPage',{
                title:'银行卡',
                status:'succeed',
                text:'恭喜你！支付密码设置成功'
              })
            }
          }
        }
      ]
    });
    prompt.present();
  }

  //*************************************用户锁卡操作****************************************
  toggleLockCard(){
    if(this.bcData.isLocked){
      return false;
    }else {
      let confirm = this.alertCtrl.create({
        title: '提示',
        message: '锁卡后所有银行卡将被锁定，不能再进行所有卡片操作！',
        buttons: [
          {
            text: '取消',
            handler: () => {

            }
          },
          {
            text: '确定',
            handler: () => {
              this.bcData.isLocked = true;
            }
          }
        ]
      });
      confirm.present();
    }

  }

  //*************************************用户进入解绑银行卡页面********************************
  enterUnbindCard(){
    if(this.bcData.isLocked) return false;
    else {
      this.navCtrl.push('UnbindBankCardPage',{
        bankStr:'cmb',
        bankName:'招商银行',
        bankType:'储蓄卡',
        bankNum:'**** **** **** **** 123',
        userName:this.bcData.userInfo.username
      })
    }
  }


}
