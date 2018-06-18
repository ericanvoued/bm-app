import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { KsBasketAction } from './ks-basket-action';
import {BaseToolProvider} from '../../../providers/base-tool/base-tool';

@IonicPage()
@Component({
  selector: 'page-ks-basket',
  templateUrl: 'ks-basket.html',
})
export class KsBasketPage extends KsBasketAction{

  constructor(public navCtrl: NavController,
              public base: BaseToolProvider,
              public navParams: NavParams) {
    super();
  }

  ionViewDidLoad() {
    this.initView();

    console.log('this.navCtrl.length()=='+this.navCtrl.length())

  }

  ionViewWillEnter() {

    console.log('ionViewWillEnter')
    this.base.requestJiangQiData('21', '3','basket').then(() => {


      console.log(123232323)

    });

  }

  ionViewWillLeave() {

    clearInterval(this.base.timeIddd);
  }

  oneMore(){


    // if(this.navCtrl.length()==4){
    //   this.navCtrl.popTo(this.navCtrl.getByIndex(1));
    // }
    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
    // this.navCtrl.pop();
  }

}
