import { Component } from '@angular/core';
import { IonicPage, ToastController,LoadingController,NavController, NavParams } from 'ionic-angular';
import {HttpClientProvider} from '../../../providers/http-client/http-client'
import { LoadingProvider } from '../../../providers/loading/loading'

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
    statusName: {'0': '等待中', '1': '用户终止', '2': '管理员终止', '3': '系统终止'},
    lottorys: [{friend_name: ''}],
    timeStarts:new Date().getFullYear()+'-01-01',
    timeEnds:new Date().getFullYear()+'-',
    currentpage:1,
    datas:[]
  }

  constructor(public http:HttpClientProvider,
              public loadingPrvd: LoadingProvider,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.followData.timeEnds += (new Date().getMonth()+1)>9?(new Date().getMonth()+1):('0'+(new Date().getMonth()+1))+'-'+((new Date().getDate())>9?(new Date().getDate()):('0'+new Date().getDate()))
    this.loadLottory()
    console.log(this.followData.timeEnds)
  }

  toggleDetail(follow){
    follow.isSlide = !follow.isSlide
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
    })

  }

  changeCurrent(lottory) {
    this.followData.currentLottory = lottory
  }

  async stopFollow(follow){
    await this.http.postData('/h5api-traces/0/droptransation?_t='+this.userInfo.auth_token,{
      'Content-Type':'application/x-www-form-urlencoded',
      '_token': this.userInfo.token,
      'tid':follow.id
    }).then(data=>{
      if(data.isSuccess==1){
        this.loadingPrvd.showToast(this.toastCtrl,data.Msg)
        follow.status = 2
      }else {
        this.loadingPrvd.showToast(this.toastCtrl,data.Msg)
      }
    })
  }


}
