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
    bankModelFlag:false,
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
    ]
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
              this.navCtrl.push('CommonStatusPage',{
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

  showBanckModel(){
    this.bcData.bankModelFlag = true;
  }

  handlePsw(data){

  }
  selectBank(_index){

  }

  // disableInput(){
  //   return false
  // }

  dismissBankModel(){
    return this.bcData.bankModelFlag = false;
  }
}
