import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClientProvider} from '../../../providers/http-client/http-client'

@IonicPage()
@Component({
  selector: 'page-follow-history',
  templateUrl: './follow-history.html',
})
export class FollowHistoryPage {
  userInfo;
  _index = -1;
  followData ={
    today:new Date(),
    currentLottory: {friend_name: ''},
    bet_model: {'1.00': '元', '0.10': '角', '0.01': '分'},
    statusName: {'0': '待开奖', '1': '已撤销', '2': '未中奖', '3': '已中奖', '4': '已派奖', '5': '系统撤销'},
    lottorys: [{friend_name: ''}],
    timeStarts:new Date().getFullYear()+'-01-01',
    timeEnds:new Date().getFullYear()+'-',
    currentpage:1,
    datas:[],
    data:[{
      name:"江西11选5",
      date:'01-09',
      qihao:1580,
      is_finish:false,
      is_continue:true,
      ball_group:'前三组复式',
      balls:[0,1,1,2],
      money:5.00,
      isSlide: false,
      detail:{
        serial:4664656566,
        follow_time:'2018-2-12 18:12:33',
        follow_start_qihao:'11111111111',
        follow_qishu:123,
        follow_finish_qishu:122,
        follow_money:122,
        follow_finish_model:123,
        follow_concel_money:1,
        follow_reward_money:123,
        win_group:1950,
        follow_model:'角'
      }
    },{
      name:"江西11选7",
      date:'01-09',
      qihao:1580,
      is_finish:true,
      is_continue:false,
      ball_group:'前三组复式',
      balls:[0,1,1,2],
      money:5,
      isSlide: false,
      detail:{
        serial:4664656566,
        follow_time:'2018-2-12 18:12:33',
        follow_start_qihao:'11111111111',
        follow_qishu:123,
        follow_finish_qishu:122,
        follow_money:122,
        follow_finish_model:123,
        follow_concel_money:1,
        follow_reward_money:123,
        win_group:1950,
        follow_model:'角'
      }
    },{
      name:"江西11选6",
      date:'01-09',
      qihao:1580,
      is_finish:false,
      is_continue:false,
      ball_group:'前三组复式',
      balls:[0,1,1,2],
      money:5,
      isSlide:false,
      detail:{
        serial:4664656566,
        follow_time:'2018-2-12 18:12:33',
        follow_start_qihao:'11111111111',
        follow_qishu:123,
        follow_finish_qishu:122,
        follow_money:122,
        follow_finish_model:123,
        follow_concel_money:1,
        follow_reward_money:123,
        win_group:1950,
        follow_model:'角'
      }
    }]
  }

  constructor(public http:HttpClientProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.followData.timeEnds += (new Date().getMonth()+1)>9?(new Date().getMonth()+1):('0'+(new Date().getMonth()+1))+'-'+(new Date().getDate())
    this.loadLottory()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowHistoryPage');
  }

  toggleDetail(_index){

    this.followData.data[_index].isSlide = !this.followData.data[_index].isSlide;
    // this.followData.data[_index].isSlide==true?this.followData.data[_index].detail_btn_text ='收起':this.followData.data[_index].detail_btn_text = '详情'
  }


  //所有游戏列表
  async loadLottory() {
    this._index++
    await this.http.fetchData('/api-lotteries-h5/lottery-info?_t=' + this.userInfo.auth_token).then(data => {
      this.followData.lottorys = []
      for (let item in data.data) {
        this.followData.lottorys.push(...data.data[item])
      }
      this.followData.currentLottory = this.followData.lottorys[0]
      if (this._index == 0) {
        this.selectLottory(this.followData.currentLottory)
      }
    })
  }


  //选择彩种
  async selectLottory(_lottory) {
    console.log(_lottory)
    await this.http.postData('/h5api-traces/0/getalltransations?_t=' + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      '_token': this.userInfo.token,
      'start': this.followData.timeStarts,
      'end': this.followData.timeEnds,
      'page':this.followData.currentpage,
      'lottery_id': _lottory.id
    }).then(data => {
      console.log(data)
      this.followData.datas = data.data.data;
      for (let i = 0, len = this.followData.datas.length; i < len; i++) {
        this.followData.datas[i].isSlide = false;
      }
      console.log(this.followData.datas)
    })

  }


  changeCurrent(lottory) {
    this.followData.currentLottory = lottory
    console.log(this.followData.currentLottory)
  }
}
