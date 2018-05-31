import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-hot-gmage-list',
  templateUrl: 'hot-gmage-list.html',
})
export class HotGmageListPage {

  private lottorys;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ViewCtrl: ViewController) {
    console.log(this.navParams)
    this.lottorys = this.navParams.data

  }

  ionViewDidLoad() {
    console.log(this.navParams)
    console.log('ionViewDidLoad HotGmageListPage');
  }

  modelDismiss(){
    this.ViewCtrl.dismiss();
  }

}
