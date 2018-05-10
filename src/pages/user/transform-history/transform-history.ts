import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as Hammer from  'hammerjs';
// declare var Swiper;


@IonicPage()
@Component({
  selector: 'page-transform-history',
  templateUrl: './transform-history.html',
})
export class TransformHistoryPage {

  _index = 0;
  segmentsArray = ['all','charge','withdraw'];
  transformHistory: string = this.segmentsArray[this._index];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.swipeEvent()
    // this.swiper_init()
  }

  // swiper_init() {
  //   this.banner_swiper = new Swiper('.swiper-container', {
  //     loop: true
  //   });
  // }

  swipeEvent(event:Event){

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



}
