import {Component} from '@angular/core';
import {
  IonicPage,
  LoadingController,
  ToastController,
  NavController,
  NavParams
} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {TabsPage} from '../../tabs/tabs';
import {LoginProvider} from '../../../providers/login/login';
import {LoadingProvider} from '../../../providers/loading/loading'
import * as md5 from 'md5';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl:'./login.html',
})
export class LoginPage {

  username: string = 'testjose';
  password: string = '123qwe';
  loginData: any;
  nameInfoFlag: boolean = false
  pswInfoFlag: boolean = false;
  nameInfo: string = '';
  pswInfo: string = '';
  loading: any;
  tost: any;

  constructor(private logins: LoginProvider,
              public navCtrl: NavController,
              public loadPrd: LoadingProvider,
              public loadingCtrl: LoadingController,
              public storage: Storage,
              public ToastCtrl: ToastController,
              public navParams: NavParams) {

  }

  ionViewDidLoad() {

  }

  login() {
    if (!this.checkForm()) return;
    else {
      this.nameInfoFlag = false;
      this.pswInfoFlag = false;
      this.loading = this.loadPrd.showLoading(this.loadingCtrl, '登陆中...');
      this.logins.loginApp({
        username: this.username,
        password: md5(md5(md5(this.username + this.password)))
      }).subscribe((data) => {
        console.log(data)
        if (data.isSuccess) {
          this.loading.dismiss();
          this.tost = this.loadPrd.showToast(this.ToastCtrl, data.Msg);
          this.storage.set('userInfo', data['data']);

          this.navCtrl.setRoot(TabsPage, {
            pageIndex: 3
          });
        } else {
          this.loading.dismiss();
          this.tost = this.loadPrd.showToast(this.ToastCtrl, data.Msg);
        }
      })
    }
  }

  checkForm() {
    let patt = /^[a-zA-Z0-9`\-=\[\];,./~!@#$%^*()_+}{:?]{6,16}$/g;
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
