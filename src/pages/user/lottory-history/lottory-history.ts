import {Component} from '@angular/core';
import {IonicPage,LoadingController, ToastController, NavController, NavParams} from 'ionic-angular';

import {HttpClientProvider} from '../../../providers/http-client/http-client'
import { LoadingProvider } from '../../../providers/loading/loading'


@IonicPage()
@Component({
  selector: 'page-lottory-history',
  templateUrl: './lottory-history.html',
})
export class LottoryHistoryPage {

  _index = -1;
  userInfo = null;
  lrecord = {
    currentpage:1,
    currentLottory: {friend_name: ''},
    bet_model: {'1.00': '元', '0.10': '角', '0.01': '分'},
    statusName: {'0': '待开奖', '1': '已撤销', '2': '未中奖', '3': '已中奖', '4': '已派奖', '5': '系统撤销'},
    lottorys: [{friend_name: ''}],
    timeStarts:new Date().getFullYear()+'-01-01',
    timeEnds:new Date().getFullYear()+'-',
    data: []
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingPrvd: LoadingProvider,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public http: HttpClientProvider) {
    this.lrecord.timeEnds += (new Date().getMonth()+1)>9?(new Date().getMonth()+1):('0'+(new Date().getMonth()+1))+'-'+((new Date().getDate())>9?(new Date().getDate()):('0'+new Date().getDate()))
    console.log(this.lrecord.timeEnds)
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.loadLottory()

  }

  toggleDetail(record) {
    record.isSlide = !record.isSlide
  }

  //所有游戏列表
  async loadLottory() {
    this._index++
    await this.http.fetchData('/api-lotteries-h5/lottery-info?_t=' + this.userInfo.auth_token).then(data => {
      this.lrecord.lottorys = []
      for (let item in data.data) {
        this.lrecord.lottorys.push(...data.data[item])
      }
      this.lrecord.currentLottory = this.lrecord.lottorys[0]
      if (this._index == 0) {
        this.selectLottory(this.lrecord.currentLottory)
      }
    })
  }


  async selectLottory(_lottory) {
    console.log(_lottory)

    await this.http.postData('/h5api-projects?_t=' + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      '_token': this.userInfo.token,
      'start': this.lrecord.timeStarts,
      'end': this.lrecord.timeEnds,
      'page':this.lrecord.currentpage,
      'lottery_id': _lottory.id
    }).then(data => {
      console.log(data)
      this.lrecord.data = data.data.data;
      for (let i = 0, len = this.lrecord.data.length; i < len; i++) {
        this.lrecord.data[i].isSlide = false;
      }
      console.log(this.lrecord.data)
    })
  }

  changeCurrent(lottory) {
    this.lrecord.currentLottory = lottory
  }


  async concelBill(record) {
    let loading = this.loadingPrvd.showLoading(this.loadingCtrl, '撤单中')
    await this.http.postData('/h5api-projects/0/drop?_t=' + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      '_token': this.userInfo.token,
      project_id: record.id
    }).then(data => {
      loading.dismiss()
      if (data.isSuccess == 1) {
        record.status = 1;
        this.loadingPrvd.showToast(this.toastCtrl, data.Msg)
      } else {
        this.loadingPrvd.showToast(this.toastCtrl, data.Msg)
      }
    })
  }

}
