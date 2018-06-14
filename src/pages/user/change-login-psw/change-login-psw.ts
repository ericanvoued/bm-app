import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import {UserCenterProvider } from '../../../providers/user-center/user-center'
import {LoadingProvider} from '../../../providers/loading/loading'

import {TabsPage} from '../../tabs/tabs'


@IonicPage()
@Component({
  selector: 'page-change-login-psw',
  templateUrl: './change-login-psw.html',
})
export class ChangeLoginPswPage {

  pswData = {
    old_password:'',
    password:'',
    password_confirmation:''
  }
  constructor(
    public navCtrl: NavController,
    public ucPrd: UserCenterProvider,
    public loadPrd: LoadingProvider,
    public loadingCtrl: LoadingController,
    public ToastCtrl: ToastController,
    public navParams: NavParams) {
  }

  submitPsw() {
    let toast = null;
    let patt = /^[a-zA-Z0-9`\-=\[\];,./~!@#$%^*()_+}{:?]{6,16}$/g;

    if (!patt.test(this.pswData.old_password)) {
      console.log(1)
      toast = this.loadPrd.showToast(this.ToastCtrl, '原登陆密码不正确');
    } else if (this.pswData.password != this.pswData.password_confirmation) {
      toast = this.loadPrd.showToast(this.ToastCtrl, '两次输入的新登陆密码不一致');
    } else if (this.pswData.old_password == this.pswData.password) {
      toast = this.loadPrd.showToast(this.ToastCtrl, '新登陆密码不能与旧登陆密码相同');
    }else {
      this.ucPrd.changePsw('/h5api-users/password-management/1?_t=', {
        'Content-Type': 'application/x-www-form-urlencoded',
        '_token': this.ucPrd.userInfo.token,
        'old_password': this.pswData.old_password,
        'password': this.pswData.password,
        'password_confirmation': this.pswData.password_confirmation
      }).then(data => {
        if (data.isSuccess == 1) {
          toast = this.loadPrd.showToast(this.ToastCtrl,data.data.tplData.msg+'请重新登录')
          localStorage.userInfo = null;
          this.navCtrl.setRoot(TabsPage, {
            pageIndex: 3
          });
        }else {
          toast = this.loadPrd.showToast(this.ToastCtrl,data.data.tplData.msg)
        }
      })
    }


  }
//
//   else if (this.pswData.old_password == this.pswData.password) {
//   toast = this.loadPrd.showToast(this.ToastCtrl, '新登陆密码不能与旧登陆密码相同');
// }
}
