import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {LhcAction} from "./lhc-action";

import {HttpClient} from '@angular/common/http';
import {RestProvider} from '../../../providers/rest/rest';
import {BaseToolProvider} from '../../../providers/base-tool/base-tool';

import {TabsPage} from "../../tabs/tabs";
import * as $ from 'jquery';

declare var Swiper;

@IonicPage()
@Component({
  selector: 'page-lhc-slide',
  templateUrl: 'lhc-slide.html',
})
export class LhcSlidePage extends LhcAction {
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
              public base: BaseToolProvider) {

    super();
  }

  ionViewDidLoad() {

    this.initSwiper();
    this.initView();
    this.base.requestPlayData('61','6').then(()=>{
        this.changePlaySelect();
      }
    );
    this.requestHisData();
    this.initAny();
  }


  ionViewWillEnter() {

    this.base.requestJiangQiData('61', '6','play').then(() => {
      }
    );

  }

  ionViewDidLeave() {
    clearInterval(this.base.timeIddd);
  }


  requestHisData() {
    var userInfo = JSON.parse(localStorage.userInfo);
    console.log('userInfo==' + userInfo);
    var url = '/api-lotteries-h5/load-issues/61?_t=' + userInfo.auth_token;
    // http://user.firecat.com/api-lotteries-h5/load-issues/1?_t=4b5dbcc45a38784ce1aabaaa03ae806a
    this.rest.getUrlReturn(url)
      .subscribe((data) => {
        console.log(data);
        if (data.IsSuccess) {

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
    this.base.initHisBox('lhc-content-child');
    if ($('.lhc-content-child .section.active').offset().top < 156) {
      $(".his-box").stop().animate({height: "0px"}, 0);
      return;
    }
  }

  initViewData() {

    //生肖
    // var color = JSON.parse(localStorage.color);
    // console.log('initViewData');
    // console.log(color.hongda);
    // var obj = $('.section.lhc-tm .b-box');
    // var len = obj.find('.tm-unit').length;
    // for(var i=0;i<len ;i++){
    //   var clas ;
    //   var txt =  obj.find('.tm-unit').eq(i).find('span').eq(0).text();
    //   var v = parseInt(txt);
    //   if (color.hongda.indexOf(v) != -1 || color.hongdan.indexOf(v) != -1 ||
    //     color.honghedan.indexOf(v) != -1 || color.hongheshuang.indexOf(v) != -1
    //     || color.hongshuang.indexOf(v) != -1 || color.hongxiao.indexOf(v) != -1) {
    //     clas = 'red-ball';
    //   } else if (color.landa.indexOf(v) != -1 || color.landan.indexOf(v) != -1 ||
    //     color.lanhedan.indexOf(v) != -1 || color.lanheshuang.indexOf(v) != -1
    //     || color.lanshuang.indexOf(v) != -1 || color.lanxiao.indexOf(v) != -1) {
    //     clas = 'blue-ball';
    //   } else {
    //     clas = 'green-ball';
    //   }
    //   var item = '<span class="topball '+clas+' hide">'+txt+'</span>\n' +
    //     '                <span class="ball '+ clas +' ">'+txt+'</span>';
    //   obj.find('.tm-unit').eq(i).html(item);
    //
    // }

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


  // timeIddd;
  // cutDownTime(a, b) {
  //   var totalSec = this.getRemainTime(a, b);
  //   var ttt = totalSec;
  //   var liArr = $('.r-time span');
  //   this.timeIddd = setInterval(function () {
  //     if (totalSec <= 0) {
  //       //--奖期
  //       // requestJiangQiData(1);
  //       clearInterval(this.timeIddd);
  //       return;
  //     }
  //     totalSec--;
  //     var hour = Math.floor(totalSec / 3600);
  //     var minute = Math.floor(totalSec % 3600 / 60);
  //     var sec = totalSec % 60;
  //     //显示
  //     liArr[0].innerHTML = hour;
  //     liArr[1].innerHTML = minute;
  //     liArr[2].innerHTML = sec;
  //     var scale = totalSec / ttt * 100;
  //     $('.time-bar').css('width', scale + '%');
  //   }, 1000)
  // }
  //
  // getRemainTime(startime, endtime) {
  //   var a = new Date(startime.replace(/-/g, '/')).getTime();
  //   var b = new Date(endtime.replace(/-/g, '/')).getTime();
  //   var t = (b - a) / 1000;
  //   return t;
  // }

}
