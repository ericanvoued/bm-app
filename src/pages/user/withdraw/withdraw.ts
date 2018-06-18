import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController,NavParams, AlertController } from 'ionic-angular';

import {UserCenterProvider } from '../../../providers/user-center/user-center';
import { LoadingProvider } from '../../../providers/loading/loading'

import {AddBankCardPage} from '../add-bank-card/add-bank-card'
import { CommonStatusPage } from '../common-status/common-status'

@IonicPage()
@Component({
  selector: 'page-withdraw',
  templateUrl: './withdraw.html',
})
export class WithdrawPage {

  toast;
  userInfo
  withDrawMoney = 0.00;
  currentBank=null;
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public ucPrd: UserCenterProvider,
    public loadPrd:LoadingProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {

    this.ucPrd.withdrewBankApi()
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }


  checkWithdraw(){
    if(this.withDrawMoney>this.ucPrd.withdrewApiData.data.accounts.withdrawable){
      this.loadPrd.showToast(this.toastCtrl,'可提现额度不够')
    }else if(this.withDrawMoney<this.ucPrd.withdrewApiData.data.min_withdraw_amount){
      this.loadPrd.showToast(this.toastCtrl,'提现金额不得低于'+this.ucPrd.withdrewApiData.data.min_withdraw_amount+'元')
    }else if(this.withDrawMoney>this.ucPrd.withdrewApiData.data.max_withdraw_amount){
      this.loadPrd.showToast(this.toastCtrl,'提现金额不得高于'+this.ucPrd.withdrewApiData.data.min_withdraw_amount+'元')
    }else {
      this.showPrompt()
    }
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
            // this.ucPrd.http.postData('')
            this.sendFoundPsw({psw1:data.psw}).then(val=>{
              if(val.IsSuccess){
                this.toast = this.loadPrd.showLoading(this.loadingCtrl,'提现中')
                this.postWithReq().then(val1=>{
                  this.toast.dismiss()
                  if(val1.isSuccess==1){
                    this.navCtrl.push('CommonStatusPage',{
                      'status':'succeed',
                      'text':'提现审核中'
                    })
                  }else {
                    this.navCtrl.push('CommonStatusPage',{
                      'status':'fail',
                      'text':val1.Msg
                    })
                  }
                  console.log(val1)
                })
              }else {
                this.toast = this.loadPrd.showToast(this.toastCtrl,'资金密码有误')
              }
            })

          }
        }
      ]
    });
    prompt.present();
  }

  async postWithReq(){
    return await this.ucPrd.http.postData('/h5api-withdrawals/withdraw/1?_t=' + this.userInfo.auth_token,{
      'id':this.currentBank.id,
      'account':this.currentBank.account,
      'account_name':this.currentBank.account_name,
      'Content-Type':'application/x-www-form-urlencoded',
      'amount':this.withDrawMoney,
      '_token': this.userInfo.token
    })
  }




  selectBank(bank){
    for(let i=0,len=this.ucPrd.withdrewApiData.data.bank_cards.length;i<len;i++){
      this.ucPrd.withdrewApiData.data.bank_cards[i].flag=false
    }
    bank.flag=true;
    this.currentBank = bank;
    console.log(bank)
  }

  addBankCard(){
    this.navCtrl.push('AddBankCardPage')
  }

  //发送资金密码
  async sendFoundPsw(params) {
    return await this.ucPrd.http.postData('/h5api-users/checkfundpassword?_t=' + this.userInfo.auth_token, {
      'fund_password': params.psw1,
      '_token': this.userInfo.token
    })
  }

  formatBankNumber(bankNumber){
    return bankNumber.substr(0,4)+"********"+bankNumber.substr(-4);
  }

}
