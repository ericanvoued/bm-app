import {Component} from '@angular/core';
import {
  IonicPage,
  LoadingController,
  ToastController,
  NavController,
  NavParams, App
} from 'ionic-angular';

import {LoginProvider} from '../../../providers/login/login';
import {HttpClientProvider} from '../../../providers/http-client/http-client'
import {LoadingProvider} from '../../../providers/loading/loading'
import * as md5 from 'md5';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl:'./login.html',
})
export class LoginPage {

  username = 'testjose';
  password = '123qwe';
  loginData: any;
  nameInfoFlag: boolean = false
  pswInfoFlag: boolean = false;
  nameInfo: string = '';
  pswInfo: string = '';
  loading: any;
  tost: any;

  constructor(private logins: LoginProvider,
              public navCtrl: NavController,
              public http: HttpClientProvider,
              public loadPrd: LoadingProvider,
              public loadingCtrl: LoadingController,
              public ToastCtrl: ToastController,
              public navParams: NavParams,
              public appCtrl: App) {

  }

  ionViewDidLoad() {

  }

  login() {
    if (!this.checkForm()) return;
    else {
      this.nameInfoFlag = false;
      this.pswInfoFlag = false;
      this.loading = this.loadPrd.showLoading(this.loadingCtrl, '登陆中...');
      this.http.postData('/h5-api-auth/login?_t=init',{
        'Content-Type':'application/x-www-form-urlencoded',
        username: this.username,
        password: md5(md5(md5(this.username + this.password)))
      }).then((data) => {
        console.log(data)
        if (data.isSuccess) {
          this.loading.dismiss();
          this.tost = this.loadPrd.showMidToast(this.ToastCtrl, data.Msg);
          // this.storage.set('userInfo', data['data']);

          localStorage.userInfo = JSON.stringify(data['data']);

          // if(this.navParams.get('page')){
          //   //this.navCtrl.push(TabsPage)
          //   this.appCtrl.getRootNav().push(TabsPage)
          // }else  
          //   this.navCtrl.setRoot(TabsPage, {
          //     pageIndex: 3
          //   })
          this.navCtrl.push('TabsPage', {
            pageIndex: 3
          });
        } else {
          this.loading.dismiss();
          this.tost = this.loadPrd.showMidToast(this.ToastCtrl, data.Msg);
        }
      })
    }
  }

  checkForm() {
    let patt = /^[a-zA-Z0-9`\-=\[\];,./~!@#$%^*()_+}{:?]{6,16}$/g;
    this.nameInfoFlag = false;
    this.pswInfoFlag = false;
    if (this.username.length == 0) {
      this.nameInfoFlag = true;
      this.nameInfo = '用户名不能为空';
      return false;
    } else if (this.password.length == 0) {
      this.pswInfoFlag = true;
      this.pswInfo = '密码不能为空';
      return false;
    } else if (!patt.test(this.password)) {
      this.pswInfoFlag = true;
      this.pswInfo = '密码格式不对';
      return false;
    } else {
      return true;
    }
  }

}
