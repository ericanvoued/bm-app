import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides, LoadingController, Navbar} from 'ionic-angular';
import {LhcAction} from "./lhc-action";

import {HttpClient} from '@angular/common/http';
import {RestProvider} from '../../../providers/rest/rest';
import {BaseToolProvider} from '../../../providers/base-tool/base-tool';
// import {LhctrendPage} from '../lhctrend/lhctrend';
import * as $ from 'jquery';
import {Tpl} from "../../../providers/base-tool/tpl";

declare var Swiper;
declare var encrypt;

@IonicPage()
@Component({
  selector: 'page-lhc-slide',
  templateUrl: 'lhc-slide.html',
})
export class LhcSlidePage extends LhcAction {
  @ViewChild(Navbar) navBar: Navbar;
  color = {
    red: ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'],
    blue: ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48']
  };
  menus: Array<string> = ["快捷下注", "自选下注"];
  @ViewChild('contentSlides') contentSlides: Slides;

  swiper: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public rest: RestProvider,
              public base: BaseToolProvider,
              public loading: LoadingController) {

    super();
  }

  backButtonClick = (e: UIEvent) => {

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      console.log(key);
    }

    localStorage.removeItem('balls');
    localStorage.removeItem('self_balls');
    localStorage.removeItem('wanfa');
    localStorage.removeItem('wayId');
    localStorage.removeItem('typeStr');
    localStorage.removeItem('nextDate');
    localStorage.removeItem('bet_max_prize_group');
    localStorage.removeItem('bet_min_prize_group');
    localStorage.removeItem('bet_note');
    localStorage.removeItem('bonus_note');
    localStorage.removeItem('lhchisdata');
    localStorage.removeItem('moneyunit');
    localStorage.removeItem('max_multiple');

    // localStorage.removeItem('hisissue');
    this.navCtrl.pop({animate: false});
  }

  pushToTrend() {

    this.navCtrl.push("LhctrendPage");
    $('.right-popover').css('height', '0px')
  }

  ionViewDidLoad() {

    this.initSwiper();
    this.navBar.backButtonClick = this.backButtonClick;
    this.initView();
    this.base.requestPlayData(localStorage.idstr, '6').then((response) => {
        this.initOdds(response);
      this.changePlaySelect();
      }
    );
    this.requestHisData();
    this.initAny();
  }

  initOdds(data){

    var tm_prize,zm_prize,bb_prize,sx_prize,ws_prize,zf_prize,bz_pirze;

  }

  ionViewWillEnter() {
    this.base.requestJiangQiData(localStorage.idstr, '6', 'play').then(() => {
    });
  }

  ionViewDidLeave() {
    clearInterval(this.base.timeIddd);
  }

  dealWithBallMultiple() {

    var moneyunit = parseInt($('.buy-input').val());
    if (moneyunit > 1) {
      var ballarr = JSON.parse(localStorage.balls);
      console.log('balls====' + ballarr)
      for (var i = 0; i < ballarr.length; i++) {
        ballarr[i].multiple = parseInt(ballarr[i].multiple) *moneyunit;
      }
      localStorage.balls = JSON.stringify(ballarr);
    }
  }

  betClick() {

    const that = this;
    if(localStorage.userInfo==null){
      $('body').append(Tpl.fail_tip);
      $('#error-tip').text('您还未登录～');
      setTimeout(function () {
        $('.basket-pop').remove();
        localStorage.clear();
        that.navCtrl.push("LoginPage");
      }, 1000);
      return;
    }

    this.dealWithBallMultiple();
    console.log('localStorage.balls==' + localStorage.balls)
    const loader = this.loading.create({});
    loader.present();

    var gameId = localStorage.idstr;
    var obj = {};
    obj['gameId'] = gameId;
    obj['isTrace'] = "0";
    obj['traceWinStop'] = "1";
    obj['traceStopValue'] = "1";
    var balls = localStorage.balls;
    console.log('balls====' + balls)
    obj['balls'] = encrypt(balls);

    var ballarr = JSON.parse(balls);
    var type = $('.wanfa').text();
    if (type.search('不中') != -1 || type.search('六肖') != -1) {
      // 01|02|03|04|05
      var ballstr = [];
      for (var i = 0; i < ballarr.length; i++) {
        ballstr.push(ballarr[i].ball);
      }
      var ball = ballstr.join('|');
      ballarr[0].ball = ball;
      ballarr[0].moneyunit = 1;
      ballarr[0].num = $('.money-text .zhu').text();
      ballarr[0].multiple = 1;
      ballarr[0].viewBalls = '';
      console.log('ballarr[0]====' + ballarr[0]);
      ballstr = [];
      ballstr.push(ballarr[0]);
      balls = JSON.stringify(ballstr);
      console.log('balls====' + balls);
      obj['balls'] = encrypt(balls);
    }

    var nextDat = localStorage.nextDate;
    obj['orders'] = {}
    obj['orders'][nextDat] = 1;
    obj['is_encoded'] = 1;
    obj['bet_source'] = "h5";
    obj['multiple'] = 1;
    obj['amount'] = parseInt($('.money').text());

    obj['_token'] = JSON.parse(localStorage.getItem('userInfo')).token;

    let url = '/api-lotteries-h5/bet/' + gameId + '?_t=' + JSON.parse(localStorage.getItem('userInfo')).auth_token;

    this.rest.postUrlReturn(url, obj)
      .subscribe((data) => {
        loader.dismiss();
        console.log('data～～～～～' + JSON.stringify(data));
        if (data.isSuccess) {
          // JSON.parse(localStorage.getItem('userInfo'))['available'] = data.data.available;

          var arr = JSON.parse(localStorage.userInfo);
          arr['available'] = data.data.available;
          localStorage.userInfo = JSON.stringify(arr);
          $('.lhc-popup').addClass('hide');
          $('.current').removeClass('current');
          $('.currunt').removeClass('currunt');
          $('.red-active').removeClass('red-active');
          $('.green-active').removeClass('green-active');
          $('.blue-active').removeClass('blue-active');
          $('.r-input').val('');
          $('#yue').text(data.data.available);
          $('body').append(Tpl.success_tip);
          setTimeout(function () {
            $('.basket-pop').remove();
          }, 1500);

        } else {
          $('body').append(Tpl.fail_tip);
          $('#error-tip').text(data.Msg);
          setTimeout(function () {
            $('.basket-pop').remove();
          }, 1500);

        }
      });
  }


  requestHisData() {

    // var userInfo = JSON.parse(localStorage.userInfo);
    // var url,data;
    // if(localStorage.userInfo){
    //   data = JSON.parse(localStorage.userInfo);
    //   url = '/api-lotteries-h5/load-issues/21?_t=' + data.auth_token;
    // }else{
    //   url = '/api-lotteries-h5/load-issues/21?_t=';
    // }

    var url = '/api-lotteries-h5/load-issues/61?_t=';
    this.rest.getUrlReturn(url)
      .subscribe((data) => {
        console.log(data);
        if (data.IsSuccess) {

          localStorage.lhchisdata = JSON.stringify(data.data);
          var htm = '';
          for (var i = 0; i < data.data.length; i++) {
            var it = '<li class="his-line">\n' +
              '              <span>' + data.data[i].number + '</span>\n' +
              '              <span>' + data.data[i].code.split(' ')[0] + '</span>\n' +
              '              <span>' + data.data[i].code.split(' ')[1] + '</span>\n' +
              '              <span>' + data.data[i].code.split(' ')[2] + '</span>\n' +
              '              <span>' + data.data[i].code.split(' ')[3] + '</span>\n' +
              '              <span>' + data.data[i].code.split(' ')[4] + '</span>\n' +
              '              <span>' + data.data[i].code.split(' ')[5] + '</span>\n' +
              '              <span>' + data.data[i].code.split(' ')[6] + '</span>\n' +
              '            </li>';
            htm = htm + it;
          }
          $('.his-ul').html(htm);
        }
      });
  }

  initAny() {

    localStorage.wayId = 290;
    if(localStorage.userInfo){
      $('#yue').text(JSON.parse(localStorage.getItem('userInfo')).available);
    }else{
      $('#yue').text(0);
    }
    this.base.initHisBox('lhc-content-child');
    if ($('.lhc-content-child .section.active').offset().top < 156) {
      $(".his-box").stop().animate({height: "0px"}, 0);
      return;
    }
  }




  initViewData() {
  }

  initSwiper() {
    this.swiper = new Swiper('.pageMenuSlides .swiper-container', {
      slidesPerView: this.menus.length,
      spaceBetween: 0,
      breakpoints: {
        1024: {
          slidesPerView: this.menus.length,
          spaceBetween: 0
        },
        768: {
          slidesPerView: this.menus.length,
          spaceBetween: 0
        },
        640: {
          slidesPerView: this.menus.length,
          spaceBetween: 0
        },
        320: {
          slidesPerView: this.menus.length,
          spaceBetween: 0
        }
      }
    });
  }

  selectPageMenu($event, index) {
    this.setStyle(index);
    this.contentSlides.slideTo(index);
  }

  slideChanged() {
    let index = this.contentSlides.getActiveIndex();
    this.setStyle(index);
    this.swiper.slideTo(index, 300);
  }

  setStyle(index) {
    var slides = document.getElementsByClassName('pageMenuSlides')[0].getElementsByClassName('swiper-slide');
    if (index < slides.length) {
      for (var i = 0; i < slides.length; i++) {
        var s = slides[i];
        s.className = "swiper-slide";
      }
      slides[index].className = "swiper-slide bottomLine";
    }
  }







}
