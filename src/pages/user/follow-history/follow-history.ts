import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-follow-history',
  templateUrl: './follow-history.html',
})
export class FollowHistoryPage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowHistoryPage');
  }

  toggleDetail(_index){

    this.lhRecord.data[_index].isSlide = !this.lhRecord.data[_index].isSlide;
    this.lhRecord.data[_index].isSlide==true?this.lhRecord.data[_index].detail_btn_text ='收起':this.lhRecord.data[_index].detail_btn_text = '详情'
  }
}
