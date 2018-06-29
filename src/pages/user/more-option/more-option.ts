import { Component } from '@angular/core';
import { IonicPage,ToastController,AlertController,LoadingController, NavController, NavParams } from 'ionic-angular';
import { HttpClientProvider } from '../../../providers/http-client/http-client'
import { LoadingProvider } from '../../../providers/loading/loading'
import { AboutUsPage } from '../about-us/about-us'
import { HelpCenterPage } from '../help-center/help-center'
import { FeedbackPage } from '../feedback/feedback'
import { AgreementPage } from '../agreement/agreement'
import {TabsPage} from '../../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-more-option',
  templateUrl: './more-option.html',
})
export class MoreOptionPage {

  userInfo = null
  constructor(public navCtrl: NavController,
              public loadingProd:LoadingProvider,
              public toastCtrl:ToastController,
              public alertCtrl: AlertController,
              public loadingCtrl:LoadingController,
              public navParams: NavParams,public http:HttpClientProvider) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  pushPage(page) {
    this.navCtrl.push(page)
  }

  async logout(){
    let loading = this.loadingProd.showLoading(this.loadingCtrl,'正在退出')
    await this.http.fetchData('/h5-api-auth/logout?_t='+ this.userInfo.auth_token).then(data=>{
      loading.dismissAll();
      if(data.isSuccess){
        localStorage.clear();
        this.loadingProd.showToast(this.toastCtrl,'您已退出登陆！')
        this.navCtrl.setRoot(TabsPage, {
          pageIndex: 3
        });
      }else {
        this.loadingProd.showToast(this.toastCtrl,'退出失败，请重试！')
      }
    })
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: '确定退出吗？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            if(this.userInfo){
              this.logout();
            }else {
              this.loadingProd.showToast(this.toastCtrl,'您未登陆，退出无效！')
            }

          }
        },
        {
          text: '取消',
          handler: () => {
            this.loadingProd.showToast(this.toastCtrl,'您已取消退出！')
          }
        }
      ]
    });
    confirm.present();
  }

}
