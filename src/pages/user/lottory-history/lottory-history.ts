import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClientProvider } from '../../../providers/http-client/http-client'

@IonicPage()
@Component({
  selector: 'page-lottory-history',
  templateUrl: './lottory-history.html',
})
export class LottoryHistoryPage {
  lhRecord ={
    timeStarts:'2018-01-01',
    timeEnds:'2018-01-02',
    data:[{
      name:"江西11选5",
      date:'01-09',
      qihao:1580,
      is_waiting:false,
      is_win:true,
      ball_group:'前三组复式',
      balls:[0,1,1,2],
      money:5.00,
      isSlide: false,
      is_following: true,
      detail_btn_text: '详情',
      detail:{
        serial:4664656566,
        bet_time:'2018-2-12 18:12:33',
        bet_id:'11111111111',
        bet_detail:'单式1倍1驻',
        bet_ball:122,
        bet_model:'角',
        bet_times:1,
        bet_reward:'dasd',
        win_money:10000.00
      }
    },{
      name:"江西11选7",
      date:'01-09',
      qihao:1580,
      is_waiting:true,
      is_win:false,
      ball_group:'前三组复式',
      balls:[0,1,1,2],
      money:5,
      isSlide: false,
      is_following: false,
      detail_btn_text: '详情',
      detail:{
        serial:4664656566,
        bet_time:'2018-2-12 18:12:33',
        bet_id:'11111111111',
        bet_detail:'单式1倍1驻',
        bet_ball:122,
        bet_model:'角',
        bet_times:1,
        bet_reward:'dasd',
        win_money:10000.00
      }
    },{
      name:"江西11选6",
      date:'01-09',
      qihao:1580,
      is_waiting:true,
      is_win:false,
      ball_group:'前三组复式',
      balls:[0,1,1,2],
      money:5,
      isSlide:false,
      is_following: true,
      detail_btn_text: '详情',
      detail:{
        serial:4664656566,
        bet_time:'2018-2-12 18:12:33',
        bet_id:'11111111111',
        bet_detail:'单式1倍1驻',
        bet_ball:122,
        bet_model:'角',
        bet_times:1,
        bet_reward:'dasd',
        win_money:10000.00
      }
    }]
}

  userInfo = null;
  lrecord = {
    currentLottory:{friend_name:''},
    bet_model:{'1.00':'元','0.10':'角','0.01':'分'},
    statusName: {'0': '待开奖', '1': '已撤销', '2': '未中奖', '3': '已中奖', '4': '已派奖', '5': '系统撤销'},
    lottorys:[{friend_name:''}],
    timeStarts:'2018-01-01',
    timeEnds:'2018-01-02',
    data:[]
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClientProvider) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.loadLottory()
    this.selectLottory(this.lrecord.currentLottory)
  }

  toggleDetail(_index){
    this.lhRecord.data[_index].isSlide = !this.lhRecord.data[_index].isSlide;
    this.lhRecord.data[_index].isSlide==true?this.lhRecord.data[_index].detail_btn_text ='收起':this.lhRecord.data[_index].detail_btn_text = '详情'
  }

  //所有游戏列表
  async loadLottory(){
    await this.http.fetchData('/api-lotteries-h5/lottery-info?_t='+this.userInfo.auth_token).then(data=>{
      this.lrecord.lottorys = []
      for (let item in data.data) {
        this.lrecord.lottorys.push(...data.data[item])
      }
      this.lrecord.currentLottory = this.lrecord.lottorys[0]
    })
  }


  async selectLottory(_lottory){
    await this.http.postData('/h5api-projects?_t='+this.userInfo.auth_token,{
      'Content-Type':'application/x-www-form-urlencoded',
      '_token':this.userInfo.token,
      'start':'2018-01-10',
      'end':'2018-06-10',
      'lottery_id':_lottory.id
    }).then(data=>{
      this.lrecord.data = data.data;
      for(let i = 0, len = this.lrecord.data.length; i < len; i++){
        this.lrecord.data[i].isSlide = false;
      }
    })
  }

  changeCurrent(lottory){
    this.lrecord.currentLottory = lottory
  }

}
