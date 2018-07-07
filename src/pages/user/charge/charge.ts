import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  ToastController,
  ModalController,
  LoadingController,
  NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading'

// import {UserCenterProvider } from '../../../providers/user-center/user-center'

import { HttpClientProvider } from '../../../providers/http-client/http-client'


@IonicPage()
@Component({
  selector: 'page-charge',
  templateUrl: './charge.html',
})
export class ChargePage {

  userInfo;
  chargeList = {
    bankflag: null,
    currentBank:null,
    data: []
  }

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


  constructor(
              public toastCtrl: ToastController,
              public loadPrd: LoadingProvider,
              public modalCtrl: ModalController,
              // public ucPrd: UserCenterProvider,
              public LoadingCtrl: LoadingController,
              public http: HttpClientProvider,
              public navCtrl: NavController,
              public navParams: NavParams) {

    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.getcChargeList()


  }

  callBackFromList  =(currentBank) => {
    return new Promise((resolve, reject) => {
      if(currentBank){
        resolve('成功取到B页面返回的参数');
        this.ucPrd.chargeList.data.banks.ABOC = currentBank
        this.chargeList.currentBank = currentBank
      }else{
        reject('取回参失败')
      }
    });
  }


  //银行卡充值
  //充值列表
  async getcChargeList(){
    await this.http.fetchData('/h5api-recharges/rechargeinfo?_t=' + this.userInfo.auth_token).then(data=>{
      this.chargeList.data = data.data;
      this.chargeList.payment_setting_data = data.payment_setting_data
      console.log(this.chargeList.data)
    })
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

    this.chargeList.bankflag = _index;
    this.chargeList.currentBank = bank;


    // if (this.chargeList.data[_index].isRepaire != false) {
    //   this.userData.toast = this.loadPrd.showToast(this.toastCtrl, '维护中');
    //   return;
    // } else {

    // if(bank.name=='银联快捷'){
    //   this.ucPrd.chargeList.bankflag[_index] = 1;
    //   this.chargeList.currentBank = this.ucPrd.chargeList.data.banks.ABOC;
    //   // this.chargeList.currentBank.banks = this.ucPrd.chargeList.data.banks
    // }else {
    //   this.ucPrd.chargeList.bankflag[_index] = 1;
    //   this.chargeList.currentBank = bank;
    //   console.log(this.chargeList.currentBank)
    // }

    // }
  }

  //页面跳转
  pushPage(page, param) {
    this.navCtrl.push(page, {
      callback: this.callBackFromList
    })
  }

  showModal() {
    console.log(this.chargeList.currentBank)
    if(Number(this.numList.chargeMoney)<=0 ){
      this.loadPrd.showToast(this.toastCtrl,'请输入要充值的金额');
      return;
    }else if(!this.chargeList.currentBank){
      this.loadPrd.showToast(this.toastCtrl,'请选择要支付方式');
      return;
    }else if(this.numList.chargeMoney>this.chargeList.currentBank.currency_max){
      this.loadPrd.showToast(this.toastCtrl,'充值金额已超上限');
      return;
    }else {
      this.http.postData('/h5api-recharges/confirmMobileJd?_t='+ this.userInfo.auth_token,{
        'Content-Type':'application/x-www-form-urlencoded',
        'deposit_mode':this.chargeList.currentBank.mode,
        'bank_code':this.chargeList.currentBank.identifier,
        'bank':this.chargeList.currentBank.id,
        'amount':this.numList.chargeMoney,
        'payment_data_json':this.chargeList.payment_setting_data,
        '_token':this.userInfo.token
      }).then(data=>{
        console.log(data)
        // this.navCtrl.push('ChargeStatusPage',
        //   {
        //     bank:this.chargeList.currentBank.name,
        //     money: (this.numList.chargeMoney).toFixed(2) ,
        //     status:data.isSuccess,
        //     statusText:data.Msg
        //   });
      })



    }
  }

  //跳到没有tab的页面
  // pushRootPage(page, param) {
  //   this.app.getRootNav().push(page, param);
  // }
}
