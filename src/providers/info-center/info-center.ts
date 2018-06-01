import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RestProvider} from '../rest/rest'

import { HttpClientProvider } from '../http-client/http-client'



@Injectable()
export class InfoCenterProvider {

  userInfo = null;


  constructor( public rest: RestProvider,public http:HttpClientProvider) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

  }



  infoData = {
    info: [
      {
        title: '充值返现活动1',
        text: '博猫2018年02月24日前18年03月注册用户在2018年03月12',
        date: '2018-04-12 13:23',
        stick: true,
        red: true
      },
      {
        title: '充值返现活动2',
        text: '博猫2018年02月24日前18年03月注册用户在2018年03月12',
        date: '2018-04-12 13:23',
        stick: false,
        red: false
      }
    ],
    msg: [
      {
        title: '充值返现活动1',
        text: '博猫2018年02月24日前18年03月注册用户在2018年03月12',
        date: '2018-04-12 13:23',
        stick: true,
        red: true
      },
      {
        title: '充值返现活动2',
        text: '博猫2018年02月24日前18年03月注册用户在2018年03月12',
        date: '2018-04-12 13:23',
        stick: false,
        red: false
      },
      {
        title: '充值返现活动3',
        text: '博猫2018年02月24日前18年03月注册用户在2018年03月12',
        date: '2018-04-12 13:23',
        stick: false,
        red: false
      }
    ]
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







