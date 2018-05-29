import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { KsBasketAction } from './ks-basket-action';

@IonicPage()
@Component({
  selector: 'page-ks-basket',
  templateUrl: 'ks-basket.html',
})
export class KsBasketPage extends KsBasketAction{

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
  }

  ionViewDidLoad() {
    this.initView();

  }

  oneMore(){
    this.navCtrl.pop();
  }

}
