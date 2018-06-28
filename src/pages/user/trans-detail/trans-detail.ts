import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClientProvider } from '../../../providers/http-client/http-client'

@IonicPage()
@Component({
  selector: 'page-trans-detail',
  templateUrl: './trans-detail.html',
})
export class TransDetailPage {

  userInfo;
  lottorys=[{'cn_title':''}];
  currentLottory={'cn_title':''};
  transData={
    timeStarts:new Date().getFullYear()+'-01-01',
    timeEnds:new Date().getFullYear()+'-',
    page:1,
    data:[]
  }

  // followData ={
  //   timeStarts:'2018-01-01',
  //   timeEnds:'2018-01-02',
  //   data:[{
  //     series:"645456465465",
  //     date:'01-09 16:21:32',
  //     money:200.00,
  //     group:'腾讯分分彩',
  //     type:'派发奖金',
  //     rest_money:100000.00
  //   },{
  //     series:"645456465465",
  //     date:'01-09 16:21:32',
  //     money:-200.00,
  //     group:'腾讯分分彩',
  //     type:'追号',
  //     rest_money:100000.00
  //   },{
  //     series:"645456465465",
  //     date:'01-09 16:21:32',
  //     money:200.00,
  //     group:'银行卡充值',
  //     type:'',
  //     rest_money:100000.00
  //   }]
  // }

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClientProvider) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.transData.timeEnds += (new Date().getMonth()+1)>9?(new Date().getMonth()+1):('0'+(new Date().getMonth()+1))+'-'+(new Date().getDate())
    this.loadLottory()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransDetailPage');
  }

  //所有帐变类型列表
  async loadLottory(){
    await this.http.fetchData('/h5api-reports/0/gettransfertypes?_t='+this.userInfo.auth_token).then(data=>{
      if(data.isSuccess==1){
        this.lottorys = []
        for(let item in data.data){
          if(item=='tplData'){
            continue ;
          }else {
            this.lottorys[parseInt(item)] = data.data[item]
          }

        }
        console.log(this.lottorys)
        this.currentLottory = this.lottorys[0]
        this.selectChange(this.currentLottory)
      }
    })
  }


  async selectChange(_lottory){
    this.transData.data = []
    await this.http.postData('/h5api-reports/0/getmobileusertransaction/?_t='+this.userInfo.auth_token,{
      'Content-Type':'application/x-www-form-urlencoded',
      '_token':this.userInfo.token,
      'page':this.transData.page,
      'start':this.transData.timeStarts,
      'end':this.transData.timeEnds,
      'bet_status':1,
      'lottery_id':_lottory.id
    }).then(data=>{
      this.transData.data = data.data.data;
      console.log(this.transData.data)
    })
  }

  changeCurrent(lottory) {
    this.currentLottory = lottory
  }
}
