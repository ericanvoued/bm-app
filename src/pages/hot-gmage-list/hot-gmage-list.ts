import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController } from 'ionic-angular';

/**
 * Generated class for the HotGmageListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hot-gmage-list',
  templateUrl: 'hot-gmage-list.html',
})
export class HotGmageListPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ViewCtrl: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotGmageListPage');
  }

  modelDismiss(){
    this.ViewCtrl.dismiss();
  }

}
