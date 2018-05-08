import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { LoadingProvider } from '../../../providers/loading/loading'

import { BankListPage } from '../bank-list/bank-list'
import { TabsPage } from '../../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-charge',
  templateUrl: './charge.html',
})
export class ChargePage {

  userData:any = {
    loading:null,
    toast:null,
    data:{
      username:'博猫用户',
      available:0.00
    }
  }
  numList = {
    chargeMoney:null,
    conpareMoney:null,
    status: [0, 0, 0, 0, 0, 0],
    money: [100, 300, 500, 1000, 3000, 5000]
  }
  bankList:any ={
    status:[0,0,0,0,0],
    data:[{
      name:'微信支付',
      limit:10000,
      logoSrc:'weixin.png',
      isRepaire:true,
      },{
      name:'支付宝支付',
      limit:10000,
      logoSrc:'alipay.png',
      isRepaire:false,
    },{
      name:'银联支付',
      limit:10000,
      logoSrc:'unionpay.png',
      isRepaire:false,
    },{
      name:'京东支付',
      limit:10000,
      logoSrc:'jingdong.png',
      isRepaire:false,
    },{
      name:'QQ钱包',
      limit:10000,
      logoSrc:'qqwallet.png',
      isRepaire:false,
    }
    ]
  }

  constructor(
    public storage: Storage,
    public toastCtrl: ToastController,
    public loadPrd:LoadingProvider,
    public LoadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.loadStorage()

  }


  selectMoney(money,_index){
    for(let i=0;i<this.numList.status.length;i++){
      this.numList.status[i] = 0;
    }
    this.numList.chargeMoney = money;
    this.numList.conpareMoney = money;
    this.numList.status[_index] = 1;
  }

  inputMoney(){
    for(let i=0;i<this.numList.status.length;i++){
      this.numList.status[i] = 0;
    }
    for(let i=0;i<this.numList.money.length;i++){
      if(this.numList.money[i] == this.numList.chargeMoney){
        this.numList.status[i] = 1;
      }
    }
  }

  loadStorage(){
    this.storage.get('userInfo').then((val) => {
      if (val == null) {
        return
      } else {
        this.userData.data = val;
      }
    })
  }

  selectBank(_index){
    if(this.bankList.data[_index].isRepaire!=false) {
      this.userData.toast = this.loadPrd.showToast(this.toastCtrl, '维护中');
      return;
    } else{
      for(let i=0;i<this.bankList.status.length;i++){
        this.bankList.status[i] = 0;
      }
      this.bankList.status[_index] = 1;
    }
  }

  //页面跳转
  pushPage(page) {
    this.navCtrl.push(page);
  }
}
