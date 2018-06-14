import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {KsAction} from "./ks-action";
import {KsBasketPage} from '../ks-basket/ks-basket';
import {PopoverController} from "ionic-angular";

import {UtilProvider} from '../../../providers/util/util'
import * as $ from 'jquery';
import {RestProvider} from '../../../providers/rest/rest';
import {BaseToolProvider} from '../../../providers/base-tool/base-tool';

@IonicPage()
@Component({
  selector: 'page-ks',
  templateUrl: 'ks.html',
})
export class KsPage extends KsAction {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public util: UtilProvider,
              public base: BaseToolProvider,
              public rest: RestProvider) {
    super();
  }


  ionViewDidLoad() {


    this.initView();
    this.requestHisData();
    this.base.requestPlayData('21', '3').then(()=>{
      this.changePlaySelect();
      }
    );
    this.util.shakePhone(() => {
      this.shakeClick();
    })
    this.initAny();
  }


  requestHisData() {

  }


  ionViewWillEnter() {
    if (localStorage.balls == null) {
      console.log('----WillEnter');
      $('.confirm-number').addClass('hide');
      $('.bottom-r').css('background', 'grey');
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


  ionViewDidLeave() {
    clearInterval(this.base.timeIddd);
  }
  // requestPlayData() {
  //   var userInfo = JSON.parse(localStorage.userInfo);
  //   console.log(userInfo);
  //   var url = '/api-lotteries-h5/load-data/2/21?_t=' + userInfo.auth_token;
  //   this.rest.postUrlReturn(url, {_token: userInfo.token})
  //     .subscribe((data) => {
  //       console.log(data);
  //       if (data.IsSuccess) {
  //         // this.loading.dismiss();
  //         $('.play-list').html('');
  //         $('.after-select').html('');
  //         var totalArr = data.data.game_ways;
  //         for (var i = 0; i < totalArr.length; i++) {
  //           var name_en = totalArr[i].name_en;
  //           var htm = '<li><i class="play-black">' + totalArr[i].name_cn + '</i><input type="hidden" value=""></input></li>';
  //           $('.play-list').append(htm);
  //           $('.play-list .play-black').eq(i).next().val(name_en);
  //           var aftercon = '<div class="after-con"></div>';
  //           $('.after-select').append(aftercon);
  //           for (var j = 0; j < totalArr[i].children.length; j++) {
  //             var len = totalArr[i].children[j].name_cn.length + 1;
  //             var cellhtml = '<div class="after-list clear after-list-' + len + '"><div class="after-l"><i class="after-text">' + totalArr[i].children[j].name_cn + ':</i><input type="hidden" value="" id=""></input></div><ul class="lastchina"></ul></div>';
  //             $('.after-con').eq(i).append(cellhtml);
  //             $('.after-con').eq(i).find('.after-list').eq(j).find(".after-text").next().val(totalArr[i].children[j].name_en);
  //             for (var x = 0; x < totalArr[i].children[j].children.length; x++) {
  //               var ballhtml = '<li><i class="play-black play-opacity">' + totalArr[i].children[j].children[x].name_cn + '</i><input type="hidden" value="" id=""></input></li>';
  //               $('.after-con').eq(i).find('.after-list .lastchina').eq(j).append(ballhtml);
  //               var name_en = totalArr[i].children[j].children[x].name_en;
  //               var price = totalArr[i].children[j].children[x].price;
  //               var bet_note = totalArr[i].children[j].children[x].bet_note;
  //               var bonus_note = totalArr[i].children[j].children[x].bonus_note;
  //               var max_multiple = totalArr[i].children[j].children[x].max_multiple;
  //               var is_enable_extra = totalArr[i].children[j].children[x].is_enable_extra;
  //               $('.after-con').eq(i).find('.after-list .lastchina').eq(j).find('.play-black').eq(x).next().val(name_en + '|' + price + '|' + bet_note + '|' + bonus_note + '|' + max_multiple + '|' + is_enable_extra);
  //               $('.after-con').eq(i).find('.after-list .lastchina').eq(j).find('input').eq(x).attr('id', totalArr[i].children[j].children[x].id);
  //             }
  //           }
  //         }
  //         this.base.setDefultPlayedUi('3');
  //         this.changePlaySelect();
  //       } else {
  //         // this.loading.dismiss();
  //       }
  //       this.base.requestJiangQiData(21, '3');
  //     });
  // }

  initAny() {
    this.base.initHisBox('ks-content');
    if ($('#ks-content .section.current').offset().top < 97) {
      $(".his-box").stop().animate({height: "0px"}, 0);
      return;
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
