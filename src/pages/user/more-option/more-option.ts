import { Component } from '@angular/core';
import { IonicPage,ToastController,LoadingController, NavController, NavParams } from 'ionic-angular';
import { HttpClientProvider } from '../../../providers/http-client/http-client'
import { LoadingProvider } from '../../../providers/loading/loading'
import { AboutUsPage } from '../about-us/about-us'
import { HelpCenterPage } from '../help-center/help-center'
import { FeedbackPage } from '../feedback/feedback'
import { AgreementPage } from '../agreement/agreement'

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
      console.log(data)
    })
  }

}
