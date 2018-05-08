import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { InfoCenterProvider } from '../../providers/info-center/info-center'
import { InfoDetailPage } from '../info-detail/info-detail'

@IonicPage()
@Component({
  selector: 'page-info-center',
  templateUrl: 'info-center.html',
})
export class InfoCenterPage {

  infoData;
  // groupName:string = 'info';
  infoCenter:string = 'info';

  constructor(
    public infoCenterProd:InfoCenterProvider,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams) {

    this.loadData();
  }

  loadData(){
    this.infoData = this.infoCenterProd.infoData;
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

  stick(group,_index){
    this.infoData[group][_index].stick = true;
  }

  //页面跳转
  pushPage(page) {
    this.navCtrl.push(page);
  }

}
