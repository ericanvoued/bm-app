import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RestProvider} from '../rest/rest'
import { ToastController,LoadingController } from 'ionic-angular';

import { HttpClientProvider } from '../http-client/http-client'
import { LoadingProvider } from '../loading/loading'


@Injectable()
export class InfoCenterProvider {

  userInfo;


  IcCenter = {
    unreadLetter:0,
    unreadAnnouncements:0
  }

  constructor(
    public rest: RestProvider,
    public toastCtrl:ToastController,
    public loadCtrl:LoadingController,
    public http:HttpClientProvider,
    public LoadPrvd:LoadingProvider) {

    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  ngOnInit(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }


  infoData = {
    announcements: {data:[]},
    letters: {data:[]},
    announcements_id:[],
    letters_id:[]
  }



  async letterUnreadnum() {
    this.IcCenter.unreadLetter = (await this.http.fetchData('/h5api-station-letters/unreadnum?_t=' + this.userInfo.auth_token)).data.num;
  }

  async loadLetters() {
    this.infoData.letters_id = [];
    this.infoData.letters = (await this.http.fetchData('/h5api-station-letters/?_t=' + this.userInfo.auth_token)).data;
    if(this.infoData.letters.data.length!=0){
      for(let i=0,len=this.infoData.letters.data.length;i<len;i++){
        this.infoData.letters_id.push(this.infoData.letters.data[i].id)
      }
    }
  }

  infoChanged(event){
    if(event._value == 'msg'){
      if(this.userInfo){
        this.letterUnreadnum();
        this.loadLetters();
      }else {
        this.LoadPrvd.showToast(this.toastCtrl,'获取站内信，请先登录')
      }
    }else {
      return false;
    }
  }


  async announcementsUnreadnum() {
    if(this.userInfo) {
      this.IcCenter.unreadAnnouncements = (await this.http.fetchData('/h5api-announcements/unreadnum?_t='+this.userInfo.auth_token)).data.num;
    }else {
      this.IcCenter.unreadAnnouncements = (await this.http.fetchData('/h5api-announcements/unreadnum')).data.num;
    }
  }
  async loadannouncements() {
    this.infoData.announcements_id = [];
    if(this.userInfo){
      this.infoData.announcements = (await this.http.fetchData('/h5api-announcements?_t='+this.userInfo.auth_token)).data;

    }else {
      this.infoData.announcements = (await this.http.fetchData('/h5api-announcements')).data;
    }

    if(this.infoData.announcements.data.length!=0){
      for(let i=0,len=this.infoData.announcements.data.length;i<len;i++){
        this.infoData.announcements_id.push(this.infoData.announcements.data[i].id)
      }
    }


  }



  //站内信置顶1/取消置顶2
  async letterSetTop(_id, _is_top) {
    await this.http.postData('/h5api-station-letters/settop?_t=' + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      _token: this.userInfo.token,
      id: _id,
      is_top: _is_top
    }).then(data => {
      console.log(2)
      if (data.IsSuccess) {
        console.log(1)
        this.loadLetters()
      }
    })
  }


  //公告置顶1/取消置顶2
  async announcementsSetTop(_id, _is_top) {

      await this.http.postData('/h5api-announcements/settop?_t=' + this.userInfo.auth_token, {
        'Content-Type': 'application/x-www-form-urlencoded',
        _token: this.userInfo.token,
        id: _id,
        is_top: _is_top
      }).then(data => {
        if (data.IsSuccess) {
          this.loadannouncements()
        }
      })


  }





  //站内信删除
  async letterDelete(_id) {
    let loading = this.LoadPrvd.showLoading(this.loadCtrl, '删除中')
    await this.http.postData('/h5api-station-letters/setdelete?_t=' + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      '_token': this.userInfo.token,
      id: _id
    }).then(data => {
      loading.dismiss()
      if (data.IsSuccess) {
        loading = this.LoadPrvd.showToast(this.toastCtrl, '删除成功')
        this.letterUnreadnum();
        this.loadLetters();
      }
    })
  }




  //公告删除
  async announcementDelete(_id) {
    if(this.userInfo){
      let loading = this.LoadPrvd.showLoading(this.loadCtrl,'删除中')
      await this.http.postData('/h5api-announcements/setdelete?_t=' + this.userInfo.auth_token, {
        'Content-Type': 'application/x-www-form-urlencoded',
        '_token': this.userInfo.token,
        id: _id
      }).then(data => {
        loading.dismiss()
        if (data.IsSuccess) {
          loading = this.LoadPrvd.showToast(this.toastCtrl,'删除成功')
          this.loadannouncements();
          this.announcementsUnreadnum();
        }
      })
    }else {
      let loading = this.LoadPrvd.showToast(this.toastCtrl,'请先登录')
    }

  }



}







