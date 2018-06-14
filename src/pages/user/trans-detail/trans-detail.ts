import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClientProvider } from '../../../providers/http-client/http-client'

@IonicPage()
@Component({
  selector: 'page-trans-detail',
  templateUrl: './trans-detail.html',
})
export class TransDetailPage {

  lottorys=[{'friend_name':''}];
  currentLottory={friend_name:''};
  transData={
    timeStarts:'2018-01-01',
    timeEnds:'2018-06-08',
    data:[
      {
        series:"645456465465",
        date:'01-09 16:21:32',
        money:200.00,
        group:'腾讯分分彩',
        type:'派发奖金',
        rest_money:100000.00
      }
    ]
  }

  followData ={
    timeStarts:'2018-01-01',
    timeEnds:'2018-01-02',
    data:[{
      series:"645456465465",
      date:'01-09 16:21:32',
      money:200.00,
      group:'腾讯分分彩',
      type:'派发奖金',
      rest_money:100000.00
    },{
      series:"645456465465",
      date:'01-09 16:21:32',
      money:-200.00,
      group:'腾讯分分彩',
      type:'追号',
      rest_money:100000.00
    },{
      series:"645456465465",
      date:'01-09 16:21:32',
      money:200.00,
      group:'银行卡充值',
      type:'',
      rest_money:100000.00
    }]
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClientProvider) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.loadLottory()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransDetailPage');
  }

  //所有游戏列表
  async loadLottory(){
    await this.http.fetchData('/api-lotteries-h5/lottery-info?_t='+this.userInfo.auth_token).then(data=>{
      this.lottorys = []
      for (let item in data.data) {
        this.lottorys.push(...data.data[item])
      }
      this.currentLottory = this.lottorys[0]
    })
  }

  //select lottery
  selectLot(obj){
    console.log(obj)
  }

  async selectChange(_lottory){
    // await this.http.postData('/h5api-projects?_t='+this.userInfo.auth_token,{
    await this.http.postData('/h5api-projects?_t='+'d61672740255c3a09fcb593e5c9d758b',{
      'Content-Type':'application/x-www-form-urlencoded',
      '_token':'SA9AyfqfllO1OJuCbH4uqjmusn1Ecash1PNW3Uqn',
      // '_token':this.userInfo.token,
      'start':this.transData.timeStarts,
      'end':this.transData.timeEnds,
      'bet_status':1,
      'lottery_id':_lottory.id
    }).then(data=>{
      // this.lrecord.data = data.data;
      console.log(data)
    })
  }
}
