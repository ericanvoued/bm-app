import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';

import {KsBasketAction} from './ks-basket-action';
import {BaseToolProvider} from '../../../providers/base-tool/base-tool';

declare var encrypt
import * as $ from 'jquery';
import {RestProvider} from '../../../providers/rest/rest';
import {Tpl} from '../../../providers/base-tool/tpl';

@IonicPage()
@Component({
  selector: 'page-ks-basket',
  templateUrl: 'ks-basket.html',
})
export class KsBasketPage extends KsBasketAction {

  constructor(public navCtrl: NavController,
              public base: BaseToolProvider,
              public navParams: NavParams,
              public rest: RestProvider,
              public loading: LoadingController
  ) {
    super();
  }

  ionViewDidLoad() {
    this.initView();
    this.initany();
    // console.log('this.navCtrl.length()=='+this.navCtrl.length())
  }

  initany() {
    if (localStorage.userInfo) {
      $('.balance').text(JSON.parse(localStorage.getItem('userInfo')).available);
    } else {
      $('.balance').text(0);
    }

  }

  dealWithPrizegroup() {

    var prize_group = parseInt($('.money-btn-1 i').text());
    var ballarr = JSON.parse(localStorage.balls);
    var total_multiple = $('#bei_input').val();
    for (var i = 0; i < ballarr.length; i++) {
      ballarr[i].multiple = parseInt(total_multiple) * parseInt(ballarr[i].multiple);
      ballarr[i].prize_group = prize_group;
    }
    localStorage.balls = JSON.stringify(ballarr);

  }


  betClick() {
    const that = this;
    if (localStorage.userInfo == null) {
      $('body').append(Tpl.fail_tip);
      $('#error-tip').text('您还未登录～');
      setTimeout(function () {
        $('.basket-pop').remove();
        localStorage.clear();
        that.navCtrl.push("LoginPage");
      }, 1000);
      return;
    }

    this.dealWithPrizegroup();
    if (localStorage.balls == null || JSON.parse(localStorage.balls).length == 0) {
      return;
    }
    const loader = this.loading.create({});
    loader.present();

    var traceWinStop = "1";
    var gameId = 21;//localStorage.idStr;
    var zhuihao = parseInt($('#zhui_input').val());
    var multiple = parseInt($('#bei_input').val());
    var amount = $('.yuan').text();

    var obj = {};

    obj['gameId'] = gameId;
    obj['traceWinStop'] = traceWinStop;
    obj['traceStopValue'] = 1;

    var balls = localStorage.balls;
    obj['balls'] = encrypt(balls);
    var nextDat = localStorage.nextDate;
    // var item = {};
    // item[nextDat] = 1;
    // obj['orders'] = JSON.stringify(item);
    var isTrace = "0";
    obj['orders'] = {}
    var item = {};
    if (zhuihao > 1) {
      isTrace = "1";
      for (var i = 0; i < zhuihao; i++) {

        var part2 = parseInt(nextDat.substr(nextDat.length - 2)) + i;
        var part1 = nextDat.substr(0, nextDat.length - 2);
        var next = part1 + part2;
        obj['orders'][next] = 1;
        item[next] = 1;
        // obj['orders'] = {...obj['orders'],[next]:1}
      }

    } else {

      obj['orders'][nextDat] = 1;

    }

    obj['orders'] = JSON.stringify(obj['orders']);
    // obj['orders'] = '{"20180703034": 1, "20180703035": 1, "20180703036": 1}';//JSON.stringify(obj['orders']);

    obj['isTrace'] = isTrace;
    // obj['orders'] = {}
    // obj['orders'][nextDat] = 1
    // result['orders'] = {}
    // result['orders'][this.common.currentNumber] = 1


    obj['is_encoded'] = 1;
    obj['bet_source'] = "h5";
    // obj['multiple'] = multiple;
    obj['amount'] = amount;
    // console.log(localStorage.getItem('userInfo'))
    obj['_token'] = JSON.parse(localStorage.getItem('userInfo')).token;

    let url = '/api-lotteries-h5/bet/' + gameId + '?_t=' + JSON.parse(localStorage.getItem('userInfo')).auth_token

    this.rest.postUrlReturn(url, obj)
      .subscribe((data) => {

        loader.dismiss();

        console.log('data～～～～～' + JSON.stringify(data));
        if (data.isSuccess) {
          // JSON.parse(localStorage.getItem('userInfo'))['available'] = data.data.available;

          var arr = JSON.parse(localStorage.userInfo);
          arr['available'] = data.data.available;
          localStorage.userInfo = JSON.stringify(arr);
          $('.balance').text(data.data.available);
          $('body').append(Tpl.success_tip);
          setTimeout(function () {
            $('.basket-pop').remove();
            that.cleanAll();
            clearInterval(that.base.timeIddd);
            that.navCtrl.pop();
          }, 1500);

        } else {

          if (data.type == 'loginTimeout') {
            $('body').append(Tpl.fail_tip);
            $('#error-tip').text(data.Msg);
            setTimeout(function () {
              $('.basket-pop').remove();
              clearInterval(that.base.timeIddd);
              that.navCtrl.push("LoginPage");
            }, 1500);
          } else {
            $('body').append(Tpl.fail_tip);
            $('#error-tip').text(data.Msg);
            setTimeout(function () {
              $('.basket-pop').remove();
            }, 1500);
          }
        }
      });

  }


  cleanAll() {
    localStorage.removeItem("balls");
    $('.buy-list').html("");
    $('#bei input').val(1);
    $('#zhui input').val(1);
    $('.total-con .qi').text(1);
    $('.total-con .zhu').text(1);
    $('.total-con .yuan').text(0);
  }

  ionViewWillEnter() {

    console.log('ionViewWillEnter')
    this.base.requestJiangQiData(localStorage.idstr, '3', 'basket').then(() => {
      console.log(123232323)
    });
  }

  ionViewWillLeave() {
    clearInterval(this.base.timeIddd);
  }

  oneMore() {

    // if(this.navCtrl.length()==4){
    //   this.navCtrl.popTo(this.navCtrl.getByIndex(1));
    // }
    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
    // this.navCtrl.pop();
  }

}
