import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { TabsPage } from '../../tabs/tabs';
import {Storage} from '@ionic/storage';
import { LoadingProvider } from '../../../providers/loading/loading'


@IonicPage()
@Component({
  selector: 'page-change-name',
  templateUrl: './change-name.html',
})
export class ChangeNamePage{

  userData ={
    oldName:'',
    nameInfoFlag:false,
    nameInfo : '',
    loading:'',
    data:{
      username:''
    }
  };


  constructor(
    public toastCtrl: ToastController,
    public loadPrd:LoadingProvider,
    public LoadingCtrl: LoadingController,
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams) {

      this.storage.get('userInfo').then((val) => {
        if(val==null){
          this.userData = null;
        }else{
          this.userData.data = val;
          this.userData.oldName = this.userData.data.username;
        }
      })
  }

  ionViewWillEnter() {

  }

  changeNane(){
    if(this.userData.data.username.length==0){
      this.userData.nameInfoFlag = true;
      this.userData.nameInfo = '昵称不能为空';
      return
    }else if(this.userData.oldName == this.userData.data.username){
      this.userData.nameInfoFlag = true;
      this.userData.nameInfo = '新旧昵称相同';
      return
    }else {
      this.userData.loading = this.loadPrd.showLoading(this.LoadingCtrl, '昵称修改中...');
      this.storage.set('userInfo',this.userData.data);
      setTimeout(() => {
        this.userData.loading = this.loadPrd.showToast(this.toastCtrl, '昵称修改成功');
        this.navCtrl.setRoot(TabsPage,{
          pageIndex:3
        });
      },1500)

    }
  }

}
