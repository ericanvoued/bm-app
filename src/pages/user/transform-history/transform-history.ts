import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChargePage } from '../charge/charge'

import * as Hammer from  'hammerjs';


@IonicPage()
@Component({
  selector: 'page-transform-history',
  templateUrl: './transform-history.html',
})
export class TransformHistoryPage {

  isSlide:boolean = false;
  detail_btn_text:string = '详情'

  segmentsArray = ['all','charge','withdraw'];
  transformHistory: string = this.segmentsArray[0];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.swipeEvent()
  }

  swipeEvent(){

    var switchBody = document.getElementById('switchBody');
    var hammertime = new Hammer(switchBody);

    hammertime.on('swiperight', () => {
      if (this.segmentsArray.indexOf(this.transformHistory) > 0) {
        this.transformHistory = this.segmentsArray[this.segmentsArray.indexOf(this.transformHistory) - 1];
      }
    })
    hammertime.on('swipeleft', () => {
      if (this.segmentsArray.indexOf(this.transformHistory) < 2) {
        this.transformHistory = this.segmentsArray[this.segmentsArray.indexOf(this.transformHistory) + 1];
      }
    })

  }

  toggleDetail(){
    console.log(1)
    this.isSlide = !this.isSlide;
    this.isSlide==true?this.detail_btn_text ='收起':this.detail_btn_text = '详情'
  }

  //页面跳转
  pushPage(page, param) {
    if (param) {
      this.navCtrl.push(page, param);
    } else {
      this.navCtrl.push(page);
    }
  }
}
