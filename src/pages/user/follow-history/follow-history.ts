import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-follow-history',
  templateUrl: './follow-history.html',
})
export class FollowHistoryPage {

  followData ={
    timeStarts:'2018-01-01',
    timeEnds:'2018-01-02',
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowHistoryPage');
  }

  toggleDetail(_index){

    this.followData.data[_index].isSlide = !this.followData.data[_index].isSlide;
    // this.followData.data[_index].isSlide==true?this.followData.data[_index].detail_btn_text ='收起':this.followData.data[_index].detail_btn_text = '详情'
  }
}
