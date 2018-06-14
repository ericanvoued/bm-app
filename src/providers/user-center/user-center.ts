import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpClientProvider } from '../http-client/http-client'


@Injectable()
export class UserCenterProvider {
  userInfo:any;
  chargeList = {bankflag:[0,0,0,0,0],data:{
    banks:{ABOC:{name:'',currency_max: 0,identifier:''}},
    mobile_weixin:{name:'',gateway:'',currency_max:0},
    mobile_alipay:{name:'',gateway:'',currency_max:0},
    unionpay:{name:'',gateway:'',currency_max:0},
    mobile_jd:{name:'',gateway:'',currency_max:0},
    mobile_qq:{name:'',gateway:'',currency_max:0}}}
  // receiveChargeData = {}
  withdrewApiData = {data:{accounts:{withdrawable:null,balance:null}}}

  changePswData={}

  constructor(public http:HttpClientProvider) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  //银行卡充值
  //充值列表
  async getcChargeList(){
    this.chargeList = (await this.http.fetchData('/h5api-recharges/rechargeinfo?_t=' + this.userInfo.auth_token))
    console.log(this.chargeList)
    this.chargeList.bankflag = [0,0,0,0,0]
    console.log(this.chargeList)
  }

  //charge req
  async postChargeReq(params){
    return (await this.http.postData('/h5api-recharges/confirmMobileJd?_t='+ this.userInfo.auth_token,params))
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


  //修改登陆密码
  async changePsw(url,params){
    return (await this.http.postData(url+ this.userInfo.auth_token,params))
  }
}
