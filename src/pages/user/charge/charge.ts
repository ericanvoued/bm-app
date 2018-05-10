import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  ToastController,
  ModalController,
  LoadingController,
  NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { LoadingProvider } from '../../../providers/loading/loading'
import { App } from 'ionic-angular';

import { BankListPage } from '../bank-list/bank-list'
import { TabsPage } from '../../tabs/tabs';
import { ChargeStatusPage } from '../charge-status/charge-status'

@IonicPage()
@Component({
  selector: 'page-charge',
  templateUrl: './charge.html',
})
export class ChargePage {

  userData: any = {
    loading: null,
    toast: null,
    data: {
      username: '博猫用户',
      available: 0.00
    }
  }
  numList = {
    chargeMoney: null,
    conpareMoney: null,
    status: [0, 0, 0, 0, 0, 0],
    money: [100, 300, 500, 1000, 3000, 5000]
  }
  bankList: any = {
    currentBank:'',
    status: [0, 0, 0, 0, 0],
    data: [{
      name: '微信支付',
      limit: 10000,
      logoSrc: 'weixin.png',
      isRepaire: true,
    }, {
      name: '支付宝支付',
      limit: 10000,
      logoSrc: 'alipay.png',
      isRepaire: false,
    }, {
      name: '银联支付',
      limit: 10000,
      logoSrc: 'unionpay.png',
      isRepaire: false,
    }, {
      name: '京东支付',
      limit: 10000,
      logoSrc: 'jingdong.png',
      isRepaire: false,
    }, {
      name: 'QQ钱包',
      limit: 10000,
      logoSrc: 'qqwallet.png',
      isRepaire: false,
    }
    ]
  }

  constructor(public storage: Storage,
              public toastCtrl: ToastController,
              public loadPrd: LoadingProvider,
              public modalCtrl: ModalController,
              private app: App,
              public LoadingCtrl: LoadingController,
              public navCtrl: NavController,
              public navParams: NavParams) {

    this.loadStorage()

  }

  //选择输入的金额
  selectMoney(money, _index) {
    for (let i = 0; i < this.numList.status.length; i++) {
      this.numList.status[i] = 0;
    }
    this.numList.chargeMoney = money;
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

  //加载缓存的用户信息
  loadStorage() {
    this.storage.get('userInfo').then((val) => {
      if (val == null) {
        return
      } else {
        this.userData.data = val;
      }
    })
  }

  //选择支付方式
  selectBank(_index) {
    if (this.bankList.data[_index].isRepaire != false) {
      this.userData.toast = this.loadPrd.showToast(this.toastCtrl, '维护中');
      return;
    } else {
      for (let i = 0; i < this.bankList.status.length; i++) {
        this.bankList.status[i] = 0;
      }
      this.bankList.status[_index] = 1;
      this.bankList.currentBank = this.bankList.data[_index].name;
    }
  }

  //页面跳转
  pushPage(page, param) {
    if (param) {
      this.navCtrl.push(page, param);
    } else {
      this.navCtrl.push(page);
    }
  }

  showModal() {
    if(Number(this.numList.chargeMoney)<=0 ){
      this.loadPrd.showToast(this.toastCtrl,'请输入要充值的金额');
      return;
    }else if(this.bankList.currentBank.length == 0){
      this.loadPrd.showToast(this.toastCtrl,'请选择要支付方式');
      return;
    }else {
      let modal = this.modalCtrl.create('ChargeStatusPage',
        {
          bank:this.bankList.currentBank,
          money: (this.numList.chargeMoney).toFixed(2) ,
          status:'success'
        });
      modal.present();
    }
  }

  //跳到没有tab的页面
  // pushRootPage(page, param) {
  //   this.app.getRootNav().push(page, param);
  // }
}
