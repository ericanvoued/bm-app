import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading';
import { CommonStatusPage } from '../common-status/common-status';
import { flyUp } from '../../../animation/flyUp'
import { HttpClientProvider } from '../../../providers/http-client/http-client'

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

  userInfo;
  bcData = {
    authToken:'init',
    toast:null,
    loading:null,
    bankModelFlag:false,
    cityModelFlag:false,
    searchFlag:false,
    province:[''],
    bankAddress:'province',
    subData:{
      userName:'',
      cardNum:'',
      bank:{name:''},
      bankAddress:[{
        name:''
      },{
        name:'',
        children:[]
      }],
      branchName:''
    },
    searchData:[],
    userInfo:null,
    bank: [
      {
        name: '',
        id:28,
        identifier:'CCB'
      }
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
    public http:HttpClientProvider,
    public bankCardPrd:BankCardProvider,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public navParams: NavParams) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  getUserInfo(){
    this.storage.get('userInfo').then((val) => {
      this.bcData.userInfo = val
    });
  }

  ionViewDidEnter(){
    this.getAllBankList().then(data=>{
      console.log(data)
      this.bcData.bank = data.data
    })
  }

  async getAllBankList(){
    return await this.http.fetchData('/h5api-bank-cards/getallbanklist?_t='+this.userInfo.auth_token)
  }

  async showModel(){
    this.dismissModel('searchFlag')
    await this.http.fetchData('/h5api-bank-cards/bankProvinces?_t='+this.userInfo.auth_token).then(data=>{
      this.bcData['cityModelFlag'] = true;
      this.bcData.province = data.data
    })
  }

  async showBranch(){
    this.bcData['searchFlag'] = true;
    await this.http.postData('/h5api-bank-cards/bankBranch?_t='+this.userInfo.auth_token,{
      'Content-Type':'application/x-www-form-urlencoded',
      'bank_province':this.bcData.subData.bankAddress[0].name,
      'bank_city':this.bcData.subData.bankAddress[1].name,
      'bank_id':this.bcData.subData.bank.id,
      '_token':this.userInfo.token
    }).then(data=>{
      this.bcData.searchData = data.data
    })
  }

  selectBank(bank) {
    this.bcData.subData.bank.name = bank.name;
    this.bcData.subData.bank.id = bank.id
    this.dismissModel('bankModelFlag')
  }

  //城市二联选择---省份
  async selectProvince(province){
    this.bcData.subData.bankAddress[0].name = province
    await this.http.postData('/h5api-bank-cards/bankCities?_t='+this.userInfo.auth_token,{
      'Content-Type':'application/x-www-form-urlencoded',
      'bank_province':province,
      '_token':this.userInfo.token
    }).then(data=>{
      console.log(data)
      this.bcData.subData.bankAddress[1].children = data.data;
      this.bcData.subData.bankAddress[1].name=''
    })
    //   this.bcData[_model] = true;
    //   this.bcData.province = data.data
    //

    // this.bcData.subData.bankAddress[1].children = this.bcData.address[_index].children
  }

  //城市二联选择---城市
  selectCity(selectCity){
    this.bcData.subData.bankAddress[1].name = selectCity;
    this.bcData.cityModelFlag = false;
  }

  selectBranch(_branch){
    this.bcData.subData.branchName = _branch.text;
    this.dismissModel('searchFlag')
  }

  dismissModel(_model){
    return this.bcData[_model] = false;
    // return this.bcData.bankModelFlag = false;
  }

  showBankModel(){
    this.bcData['bankModelFlag'] = true;
  }

  async submitData() {
    let chineseReg = /^[\u4E00-\u9FA5\uF900-\uFA2D]{2,16}$/;//中文验证
    let numReg = /^[0-9]{16,19}$/;//数字验证

    if (this.bcData.subData.userName.length == 0) {
      this.loadPrd.showToast(this.toastCtrl, "请输入持卡人姓名");
      return null;
    } else if (!chineseReg.test(this.bcData.subData.userName)) {
      this.loadPrd.showToast(this.toastCtrl, "输入的持卡人姓名格式不对")
      return null;
    } else if (!numReg.test(this.bcData.subData.cardNum)) {
      this.loadPrd.showToast(this.toastCtrl, "请输入正确的19位银行卡号")
      return null;
    } else if (this.bcData.subData.bank.name.length == 0) {
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
      await this.http.postData('/h5api-bank-cards/2/bind-card?_t=' + this.userInfo.auth_token, {
        'Content-Type': 'application/x-www-form-urlencoded',
        'bank_id': this.bcData.subData.bank.id,
        'province': this.bcData.subData.bankAddress[0].name,
        'city': this.bcData.subData.bankAddress[1].name,
        'branch': this.bcData.subData.branchName,
        'account_confirmation': this.bcData.subData.cardNum,
        'account_name': this.bcData.subData.userName,
        'account': this.bcData.subData.cardNum,
        '_token': this.userInfo.token
      }).then(data => {
        if(data.isSuccess==0){
          this.loadPrd.showToast(this.toastCtrl,data.Msg)
        }else {
          this.loadPrd.showToast(this.toastCtrl,'恭喜你！绑定银行卡成功')
          this.navCtrl.pop()
        }
      })

    }
  }

}
