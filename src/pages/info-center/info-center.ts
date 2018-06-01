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


  ngOnInit(): void{
    this.infoData.announcements.data = ['ddd']
    this.infoData.letters.data = ['ddd']
  }

  ionViewWillEnter(){
    this.loadannouncements();
    this.letterUnreadnum();
    this.loadLetters();
    this.announcementsUnreadnum();
  }

  async letterUnreadnum() {
    this.infoData.unreadLetter = (await this.http.fetchData('/h5api-station-letters/unreadnum?_t=' + this.userInfo.auth_token)).data.tplData.successful.Num;
  }

  async loadLetters() {
    this.infoData.letters = (await this.http.fetchData('/h5api-station-letters/?_t=' + this.userInfo.auth_token)).data;

  }
  async announcementsUnreadnum() {
    this.infoData.unreadAnnouncements = (await this.http.fetchData('/h5api-announcements/unreadnum?_t=' + this.userInfo.auth_token)).data.tplData.successful.Num;

  }
  async loadannouncements() {
    this.infoData.announcements = (await this.http.fetchData('/h5api-announcements?_t=' + this.userInfo.auth_token)).data;
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
