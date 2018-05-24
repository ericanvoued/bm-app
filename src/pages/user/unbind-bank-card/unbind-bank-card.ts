import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-unbind-bank-card',
  templateUrl: './unbind-bank-card.html',
})
export class UnbindBankCardPage {
  bankData = {
    bankStr:'**',
    bankName:'**',
    bankType:'**',
    bankNum:'**** **** **** **** ***',
    userName:'***'
  }
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadPrd: LoadingProvider,
    public viewCtrl: ViewController,
    public loadingCtrl:LoadingController,
    public navParams: NavParams) {
    this.bankData = this.navParams.data
  }

  unBindCard(){
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '解绑后该卡银行服务将不可用,确定解绑该银行卡？',
      buttons: [
        {
          text: '取消',
          handler: () => {

          }
        },
        {
          text: '确定',
          handler: () => {
            this.loadPrd.showLoading(this.loadingCtrl,'解绑中...')
            setTimeout(()=>{
              this.showAlert()
              this.viewCtrl.dismiss()
            },2000)
          }
        }
      ]
    });
    confirm.present();
  }


  showAlert() {
    let alert = this.alertCtrl.create({
      title: '提示',
      subTitle: '银行卡解绑成功！'
    });
    alert.present();
    setTimeout(()=>{
      alert.dismiss()
    },1000)
  }

}
