import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {KsAction} from "./ks-action";
import {KsBasketPage} from '../ks-basket/ks-basket';
import {PopoverController} from "ionic-angular";

import {UtilProvider} from '../../../providers/util/util'
import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-ks',
  templateUrl: 'ks.html',
})
export class KsPage extends KsAction {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public util: UtilProvider) {
    super();
  }


  ionViewDidLoad() {

    this.initView();
    this.util.shakePhone(() => {
      this.shakeClick();
    })

  }

  ionViewWillEnter() {
    if(localStorage.balls==null){
      console.log('----WillEnter');
      $('.confirm-number').addClass('hide');
      $('.bottom-r').css('background','grey');
      return;
    }
    let balll = JSON.parse(localStorage.balls);
    if (balll.length > 0) {
      $('.confirm-number').removeClass('hide');
      $('.confirm-number').text(balll.length);
    } else {
      $('.confirm-number').addClass('hide');
    }
  }

  pushToBasket() {

    var moneyunit = 1;
    var txt = $('.money-btn i').text();
    if (txt == '元') {
      moneyunit = 1;
    } else if (txt == '角') {
      moneyunit = 0.1;
    } else if (txt == '分') {
      moneyunit = 0.01;
    }
    localStorage.moneyunit = moneyunit;

    var ballstr = localStorage.balls;
    var zhu = $('.total-num').text();
    //1 当前选择注数为空 但选球不为空
    if (parseInt(zhu) == 0 && ballstr != null && ballstr != '[]') {
      // clearInterval(timeIddd);
      this.navCtrl.push(KsBasketPage, {});
      return;
    } else if (  //2 当前选择注数为空 并且 选球为空
      (parseInt(zhu) == 0 && ballstr == null) ||
      (parseInt(zhu) == 0 && ballstr == '[]')) {

      // var content = localStorage.bet_note;
      // alert("请选号～～～"); //或者机选
      this.shakeClick();
      return;
    }

// 当前选择注数不为空
    this.addOrderEvent();

    this.navCtrl.push(KsBasketPage, {})

  }


}
