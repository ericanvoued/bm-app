import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RestProvider} from '../rest/rest'

import { HttpClientProvider } from '../http-client/http-client'



@Injectable()
export class InfoCenterProvider {

  userInfo ={unreadLetter:0,unreadAnnouncements:0};


  constructor( public rest: RestProvider,public http:HttpClientProvider) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

  }



  infoData = {
    announcements: {data:['ddd']},
    letters: {data:['ddd']}
  }



  async letterUnreadnum() {
    this.infoData.unreadLetter = (await this.http.fetchData('/h5api-station-letters/unreadnum?_t=' + this.userInfo.auth_token)).data.tplData.successful.Num;
  }

  async loadLetters() {
    this.infoData.letters = (await this.http.fetchData('/h5api-station-letters/?_t=' + this.userInfo.auth_token)).data;

  }
  async announcementsUnreadnum() {
    this.infoData.unreadAnnouncements = (await this.http.fetchData('/h5api-announcements/unreadnum?_t=' + this.userInfo.auth_token)).data.tplData.successful.Num;

  }
  async loadannouncements() {
    this.infoData.announcements = (await this.http.fetchData('/h5api-announcements?_t=' + this.userInfo.auth_token)).data;
  }




  //置顶1/取消置顶2
  setTop(api, _id, _is_top) {
    this.rest.postUrlReturn(api + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      _token: this.userInfo.token,
      id: _id,
      is_top: _is_top
    }).subscribe(data => {
      if (data.isSuccess == 1 && api.indexOf('letter') != -1) {
        this.loadLetters()
      } else {
        this.loadannouncements();
      }
    })
  }

  //站内信删除
  letterDelete(_id) {
    this.rest.postUrlReturn('/h5api-station-letters/?_t=' + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      '_token': this.userInfo.token,
      id: _id
    }).subscribe(data => {
      console.log(data)
      if (data.IsSuccess==1) {
        this.lettersData();
      }
    })
  }




  //公告删除
  announcementDelete(_id) {
    this.rest.postUrlReturn('/h5api-announcements/setdelete?_t=' + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      '_token': this.userInfo.token,
      id: _id
    }).subscribe(data => {
      console.log(data)
      if (data.IsSuccess==1) {
        this.announcementsData();
      }
    })
  }


}







