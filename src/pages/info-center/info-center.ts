import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { InfoCenterProvider } from '../../providers/info-center/info-center'

import { HttpClientProvider } from '../../providers/http-client/http-client'

@IonicPage()
@Component({
  selector: 'page-info-center',
  templateUrl: 'info-center.html',
})
export class InfoCenterPage {
  userInfo;
  infoData = {
    unreadLetter: 0,
    unreadAnnouncements: 0,
    announcements: {data:['']},
    letters: {data:['']}
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
    this.infoCenterProd.announcementsUnreadnum();
    if(this.userInfo){
      this.infoCenterProd.letterUnreadnum();
      this.infoCenterProd.loadLetters();
    }
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
            if (this.infoCenter == 'info' && this.infoCenterProd.infoData.announcements_id.length !== 0) {
              this.infoCenterProd.announcementDelete(this.infoCenterProd.infoData.announcements_id)
            } else if (this.infoCenter == 'msg' && this.infoCenterProd.infoData.letters_id.length !== 0) {
              this.infoCenterProd.letterDelete(this.infoCenterProd.infoData.letters_id)
            } else if (this.infoCenter == 'info' && this.infoCenterProd.infoData.announcements_id.length == 0) {
              this.infoCenterProd.LoadPrvd.showToast(this.infoCenterProd.toastCtrl, '没有公告啦')
            } else if (this.infoCenter == 'msg' && this.infoCenterProd.infoData.letters_id.length == 0) {
              this.infoCenterProd.LoadPrvd.showToast(this.infoCenterProd.toastCtrl, '没有站内信啦')
            }

          }
        }
      ]
    });
    confirm.present();
  }


  delete(group, _index) {
    this.infoData[group].splice(_index, 1);
  }


  //页面跳转
  async pushPage(page, _id) {
    if (this.infoCenter == 'info') {
      if(this.userInfo){
        await this.infoCenterProd.http.fetchData('/h5api-announcements/view/' + _id +'?_t=' + this.userInfo.auth_token).then(data => {
          this.infoCenterProd.http.checkUnjump(data)
          if (data.IsSuccess == 1) {
            this.navCtrl.push(page, {
              title:'公告详情',
              detail:data.data
            });
          }
        })
      }else {
        await this.infoCenterProd.http.fetchData('/h5api-announcements/view/' + _id).then(data => {
          this.infoCenterProd.http.checkUnjump(data)
          if (data.IsSuccess == 1) {
            this.navCtrl.push(page, {
              title:'公告详情',
              detail:data.data
            });
          }
        })
      }
    } else {
      await this.infoCenterProd.http.fetchData('/h5api-station-letters/view/' + _id + '?_t=' + this.userInfo.auth_token).then(data => {
        this.infoCenterProd.http.checkUnjump(data)
        if (data.IsSuccess == 1) {
          this.navCtrl.push(page,{
            title:'站内信详情',
            detail:data.data
          });
        }
      })
    }
  }

}
