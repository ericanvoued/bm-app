import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpClientProvider } from '../http-client/http-client'


@Injectable()
export class UserCenterProvider {
  userInfo:any;

  // receiveChargeData = {}
  withdrewApiData = {data:{accounts:{withdrawable:null,balance:null}}}

  changePswData={}

  constructor(public http:HttpClientProvider) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }



  //提现
  //银行卡接口
  async withdrewBankApi(){
    this.withdrewApiData = (await this.http.fetchData('/h5api-withdrawals/withdraw?_t=' + this.userInfo.auth_token))

    for(let i=0;i<this.withdrewApiData.data.bank_cards.length;i++){
      this.withdrewApiData.data.bank_cards[i].flag=false
    }
    console.log(this.withdrewApiData.data)
  }


  //修改登录密码
  async changePsw(url,params){
    return (await this.http.postData(url+ this.userInfo.auth_token,params))
  }
}
