import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  ToastController,
  ModalController,
  LoadingController,
  NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading'
import { App } from 'ionic-angular';

import { BankListPage } from '../bank-list/bank-list'
import { TabsPage } from '../../tabs/tabs';
import { ChargeStatusPage } from '../charge-status/charge-status'
import {UserCenterProvider } from '../../../providers/user-center/user-center'

@IonicPage()
@Component({
  selector: 'page-charge',
  templateUrl: './charge.html',
})
export class ChargePage {



  userData: any = {
    loading: null,
    toast: null,
  }
  numList = {
    chargeMoney: null,
    conpareMoney: null,
    status: [0, 0, 0, 0, 0, 0],
    money: [100, 300, 500, 1000, 3000, 5000]
  }
  bankList: any = {
    currentBank:null,
    status: [0, 0, 0, 0, 0]
  }

  constructor(
              public toastCtrl: ToastController,
              public loadPrd: LoadingProvider,
              public modalCtrl: ModalController,
              private app: App,
              public ucPrd: UserCenterProvider,
              public LoadingCtrl: LoadingController,
              public navCtrl: NavController,
              public navParams: NavParams) {

    this.ucPrd.getcChargeList()

  }

  callBackFromList  =(currentBank) => {
    return new Promise((resolve, reject) => {
      if(currentBank){
        resolve('成功取到B页面返回的参数');
        ucPrd.chargeList.data.banks.ABOC = currentBank
        this.bankList.currentBank = currentBank
      }else{
        reject('取回参失败')
      }
    });
  }



  //选择输入的金额
  selectMoney(money, _index) {
    for (let i = 0; i < this.numList.status.length; i++) {
      this.numList.status[i] = 0;
    }
    this.numList.chargeMoney += money;
    this.numList.conpareMoney = money;
    this.numList.status[_index] = 1;
  }


  inputMoney() {
    for (let i = 0; i < this.numList.status.length; i++) {
      this.numList.status[i] = 0;
    }
    for (let i = 0; i < this.numList.money.length; i++) {
      if (this.numList.money[i] == this.numList.chargeMoney) {
        this.numList.status[i] = 1;
      }
    }
  }


  //选择支付方式
  selectBank(_index,bank) {
    console.log(this.ucPrd.chargeList)
    // if (this.bankList.data[_index].isRepaire != false) {
    //   this.userData.toast = this.loadPrd.showToast(this.toastCtrl, '维护中');
    //   return;
    // } else {
    for (let i = 0; i < this.ucPrd.chargeList.bankflag.length; i++) {
      this.ucPrd.chargeList.bankflag[i] = 0;
    }
    if(bank.name=='银联快捷'){
      this.ucPrd.chargeList.bankflag[_index] = 1;
      this.bankList.currentBank = this.ucPrd.chargeList.data.banks.ABOC;
      // this.bankList.currentBank.banks = this.ucPrd.chargeList.data.banks
    }else {
      this.ucPrd.chargeList.bankflag[_index] = 1;
      this.bankList.currentBank = bank;
      console.log(this.bankList.currentBank)
    }

    // }
  }

  //页面跳转
  pushPage(page, param) {
    this.navCtrl.push(page, {
      callback: this.callBackFromList
    })
  }

  showModal() {
    console.log(this.bankList.currentBank)
    if(Number(this.numList.chargeMoney)<=0 ){
      this.loadPrd.showToast(this.toastCtrl,'请输入要充值的金额');
      return;
    }else if(!this.bankList.currentBank){
      this.loadPrd.showToast(this.toastCtrl,'请选择要支付方式');
      return;
    }else if(this.numList.chargeMoney>this.bankList.currentBank.currency_max){
      this.loadPrd.showToast(this.toastCtrl,'充值金额已超上限');
      return;
    }else {
      this.ucPrd.postChargeReq({
        'Content-Type':'application/x-www-form-urlencoded',
        'deposit_mode':this.bankList.currentBank.mode,
        'bank_code':this.bankList.currentBank.identifier,
        'bank':this.bankList.currentBank.id,
        'amount':this.numList.chargeMoney,
        'payment_data_json':this.ucPrd.chargeList.payment_setting_data,
        '_token':this.ucPrd.userInfo.token
      }).then(data=>{
        // console.log(data)
        this.navCtrl.push('ChargeStatusPage',
          {
            bank:this.bankList.currentBank.name,
            money: (this.numList.chargeMoney).toFixed(2) ,
            status:data.isSuccess,
            statusText:data.Msg
          });
      })



    }
  }

  //跳到没有tab的页面
  // pushRootPage(page, param) {
  //   this.app.getRootNav().push(page, param);
  // }
}
