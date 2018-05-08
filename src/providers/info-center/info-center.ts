import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class InfoCenterProvider {

  constructor(public http: HttpClient) {

  }

  infoData= {
    info:[
      {
        title:'充值返现活动1',
        text:'博猫2018年02月24日前18年03月注册用户在2018年03月12',
        date:'2018-04-12 13:23',
        stick:true,
        red:true
      },
      {
        title:'充值返现活动2',
        text:'博猫2018年02月24日前18年03月注册用户在2018年03月12',
        date:'2018-04-12 13:23',
        stick:false,
        red:false
      }
    ],
    msg:[
      {
        title:'充值返现活动1',
        text:'博猫2018年02月24日前18年03月注册用户在2018年03月12',
        date:'2018-04-12 13:23',
        stick:true,
        red:true
      },
      {
        title:'充值返现活动2',
        text:'博猫2018年02月24日前18年03月注册用户在2018年03月12',
        date:'2018-04-12 13:23',
        stick:false,
        red:false
      },
      {
        title:'充值返现活动3',
        text:'博猫2018年02月24日前18年03月注册用户在2018年03月12',
        date:'2018-04-12 13:23',
        stick:false,
        red:false
      }
    ]
  }
}
