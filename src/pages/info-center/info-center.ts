import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { InfoCenterProvider } from '../../providers/info-center/info-center'
import { InfoDetailPage } from '../info-detail/info-detail'

import { HttpClientProvider } from '../../providers/http-client/http-client'

@IonicPage()
@Component({
  selector: 'page-info-center',
  templateUrl: 'info-center.html',
})
export class InfoCenterPage {

  infoData = {
    unreadLetter: 0,
    unreadAnnouncements: 0,
    announcements: {data:['ddd']},
    letters: {data:['ddd']}
  };
  infoCenter:string = 'info';

  constructor(
    public infoCenterProd:InfoCenterProvider,
    public navCtrl: NavController,
    public http:HttpClientProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams) {

    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  ionViewWillEnter(){
    this.infoCenterProd.loadannouncements();
    this.infoCenterProd.letterUnreadnum();
    this.infoCenterProd.loadLetters();
    this.infoCenterProd.announcementsUnreadnum();
  }



  showConfirm(group) {
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '确认删除所有消息？',
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确认',
          handler: () => {
            this.infoData[group] = [];
          }
        }
      ]
    });
    confirm.present();
  }


  delete(group,_index){
    this.infoData[group].splice(_index,1);
  }



  //页面跳转
  pushPage(page) {
    this.navCtrl.push(page);
  }

}
