import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Loading, LoadingController, ToastController, Toast} from 'ionic-angular'



@Injectable()
export class LoadingProvider {

  loader:any;
  toast:any;
  constructor(public http: HttpClient) {

  }

  //通用 loading 组件
  showLoading(loadingCtrl: LoadingController,
                        message: string): Loading {
    this.loader = loadingCtrl.create({
      content: message,
      duration: 2000,
      dismissOnPageChange: true
    });
    this.loader.present();
    return this.loader;
  }
  //通用 toast 组件
  showToast(toastCtrl: ToastController, massage: string): Toast {
    this.toast = toastCtrl.create({
      message: massage,
      duration:2000,
      position: 'buttom'
    })
    this.toast.present();
    return this.toast;
  }
}