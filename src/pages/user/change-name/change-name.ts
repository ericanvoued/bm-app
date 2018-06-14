import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { TabsPage } from '../../tabs/tabs';
import { LoadingProvider } from '../../../providers/loading/loading'
import { HttpClientProvider } from '../../../providers/http-client/http-client'

@IonicPage()
@Component({
  selector: 'page-change-name',
  templateUrl: './change-name.html',
})
export class ChangeNamePage{

  userData ={
    oldName:'',
    nameInfoFlag:false,
    nameInfo : {},
    loading:{},
    data:{
      nickname:''
    }
  };


  constructor(
    public toastCtrl: ToastController,
    public loadPrd:LoadingProvider,
    public LoadingCtrl: LoadingController,
    public http:HttpClientProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.userData.data = JSON.parse(localStorage.getItem("userInfo"));
    this.userData.oldName = this.userData.data.nickname;

  }


  async changeNane(){
    if(this.userData.data.nickname.length==0){
      this.userData.nameInfoFlag = true;
      this.userData.nameInfo = '昵称不能为空';
      return
    }else if(this.userData.oldName == this.userData.data.nickname){
      this.userData.nameInfoFlag = true;
      this.userData.nameInfo = '新旧昵称相同';
      return
    }else {
      console.log(this.userData.data)
      this.userData.loading = this.loadPrd.showLoading(this.LoadingCtrl, '昵称修改中...');

      await this.http.postData('/h5api-users/resetpersonalinfo?_t='+this.userData.data.auth_token,{
        'Content-Type':'application/x-www-form-urlencoded',
        '_token':this.userData.data.token,
        'nickname':this.userData.data.nickname

      }).then(data=>{
        console.log(data)
        if(data.isSuccess==1){
          localStorage.userInfo = JSON.stringify(this.userData.data);
          this.userData.loading = this.loadPrd.showToast(this.toastCtrl, '昵称修改成功');
          this.navCtrl.setRoot(TabsPage,{
            pageIndex:3
          });
        }

      })
      // this.storage.set('userInfo',this.userData.data);
      // localStorage.userInfo = JSON.stringify(this.userData.data);
      //
      // setTimeout(() => {
      //   this.userData.loading = this.loadPrd.showToast(this.toastCtrl, '昵称修改成功');
      //   this.navCtrl.setRoot(TabsPage,{
      //     pageIndex:3
      //   });
      // },1500)

    }
  }

}
