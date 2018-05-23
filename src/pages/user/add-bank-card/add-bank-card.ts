import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading';
import { CommonStatusPage } from '../common-status/common-status';
import { flyUp } from '../../../animation/flyUp'

import {Storage} from '@ionic/storage';
import { BankCardProvider } from '../../../providers/bank-card/bank-card'

@IonicPage()
@Component({
  selector: 'page-add-bank-card',
  templateUrl: './add-bank-card.html',
  animations: [
    flyUp
  ]
})
export class AddBankCardPage {

  bcData = {
    authToken:'init',
    toast:null,
    loading:null,
    bankModelFlag:false,
    cityModelFlag:false,
    searchFlag:false,
    bankAddress:'province',
    subData:{
      userName:'',
      cardNum:'',
      bankName:'',
      bankAddress:[{
        name:''
      },{
        name:'',
        children:[]
      }],
      branchName:''
    },
    searchData:[
      '中国交通银行朝阳区支行1',
      '中国交通银行朝阳区支行2',
      '中国交通银行朝阳区支行3',
      '中国交通银行朝阳区支行4',
      '中国交通银行朝阳区支行5',
      '中国交通银行朝阳区支行6',
      '中国交通银行朝阳区支行7',
      '中国交通银行朝阳区支行8'
    ],
    userInfo:null,
    bank: [
      {
        name: '中国银行',
        s:'CHAINABANK'
      },{
        name: '中国工商银行',
        s:'ctbc'
      },{
        name: '中国招商银行',
        s:'cmb'
      },{
        name: '中国民生银行',
        s:'cmbc'
      },{
        name: '中国交通银行',
        s:'bc'
      },{
        name: '中国光大银行',
        s:'ceb'
      },{
        name: '中国农业银行',
        s:'abc'
      },{
        name: '中信银行',
        s:'ccb'
      },{
        name: '兴业银行',
        s:'ib'
      },{
        name: '中国建设银行',
        s:'construtorbank'
      },{
        name: '华夏银行',
        s:'hxb'
      },{
        name: '广发银行',
        s:'cgb'
      },{
        name: '中国邮政储蓄银行',
        s:'psbc'
      },{
        name: '平安银行',
        s:'pb'
      },{
        name: '浦发银行',
        s:'cb'
      },
    ],
    address:[
      {
        name:'北京1',
        children:[
          {
            name:'北京11'
          },{
            name:'北京12'
          }
        ]
      },{
        name:'北京2',
        children:[
          {
            name:'北京21'
          },{
            name:'北京22'
          }
        ]
      }
    ]
  }
  constructor(
    public navCtrl: NavController,
    public loadPrd: LoadingProvider,
    public storage: Storage,
    public bankCardPrd:BankCardProvider,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public navParams: NavParams) {
  }

  getUserInfo(){
    this.storage.get('userInfo').then((val) => {
      this.bcData.userInfo = val
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

  showModel(_model){
    this.dismissModel('searchFlag')
    this.bcData[_model] = true;
  }

  selectBank(name) {
    this.bcData.subData.bankName = name;
    this.dismissModel('bankModelFlag')
  }

  //城市二联选择---省份
  selectProvince(_index){
    this.bcData.subData.bankAddress[0].name = this.bcData.address[_index].name
    this.bcData.subData.bankAddress[1].children = this.bcData.address[_index].children
  }

  //城市二联选择---城市
  selectCity(_index){
    this.bcData.subData.bankAddress[1].name = this.bcData.subData.bankAddress[1].children[_index].name;
    this.bcData.cityModelFlag = false;
  }

  selectBranch(_branch){
    this.bcData.subData.branchName = _branch;
    this.dismissModel('searchFlag')
  }

  dismissModel(_model){
    return this.bcData[_model] = false;
    // return this.bcData.bankModelFlag = false;
  }


  submitData() {
    let chineseReg = /^[\u4E00-\u9FA5\uF900-\uFA2D]{2,16}$/;//中文验证
    let numReg = /^[0-9]{19}$/;//数字验证

    if (this.bcData.subData.userName.length == 0) {
      this.loadPrd.showToast(this.toastCtrl, "请输入持卡人姓名");
      return null;
    } else if (!chineseReg.test(this.bcData.subData.userName)) {
      this.loadPrd.showToast(this.toastCtrl, "输入的持卡人姓名格式不对")
      return null;
    } else if (!numReg.test(this.bcData.subData.cardNum)) {
      this.loadPrd.showToast(this.toastCtrl, "请输入正确的19位银行卡号")
      return null;
    } else if (this.bcData.subData.bankName.length == 0) {
      this.loadPrd.showToast(this.toastCtrl, "请输入开户银行")
      return null;
    } else if (this.bcData.subData.bankAddress[0].name.length == 0 || this.bcData.subData.bankAddress[1].name.length == 0) {
      this.loadPrd.showToast(this.toastCtrl, "请选择银行卡所在地")
      return null;
    } else if (this.bcData.subData.branchName.length == 0) {
      this.loadPrd.showToast(this.toastCtrl, "请选择银行卡支行名称")
      return null;
    } else {
      this.loadPrd.showLoading(this.loadingCtrl, '请稍等')
      setTimeout(() => {
        this.navCtrl.push('CommonStatusPage', {
          title: '添加银行卡',
          status: 'succeed',
          text: '银行卡绑定成功'
        })
      }, 2000)
    }
  }

}
