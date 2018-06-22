import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home'
import { CommonProvider } from "../../providers/common/common";

import {HotGmageListPage} from '../hot-gmage-list/hot-gmage-list';
import { InfoCenterPage } from '../info-center/info-center'

import {LhcSlidePage} from "../lhc/lhc-slide/lhc-slide";
import {KsPage } from "../k3/ks/ks";
declare var Swiper;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userInfo:any;
  banner_swiper: any;
  info_swiper: any;
  homeData: any;
  infoData = {
    announcements: {data:['ddd']},
    letters: {data:['ddd']}
  }

  constructor(public navCtrl: NavController,
              public homePrv: HomeProvider,
              public modalCtrl: ModalController, public common:CommonProvider) {

    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

    this.homePrv.loadbanner();
    this.homePrv.loadannouncements();
    this.homePrv.announcementsUnreadnum();
   
  }

  ionViewDidEnter(){
    if(this.common.timer){
      clearInterval(this.common.timer)
      this.common.resetLotteryData()
      
    }
    this.homePrv.loadHotLottory();
    this.swiper_init()
    console.log(this.homePrv.homeData.lottorys)
  }


  swiper_init() {
    setTimeout(()=>{
      this.banner_swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 5,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
      });
    },800)


    this.info_swiper = new Swiper('.info-slider', {
      direction: 'vertical',
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      }
    })
  }

  //页面跳转
  pushPage(pageName, data) {
    if (data) {
      this.navCtrl.push(pageName, data)
    } else {
      this.navCtrl.push(pageName)
    }
  }

  toLottory(lottory){
    console.log(lottory.url)
    console.log(lottory.id)
    if(lottory.url){
      this.common.gameId = lottory.id
      this.common.series_id = lottory.series_id
      this.navCtrl.push(lottory.url)
    }else{
      alert('no pages')
    }
  }

  goToSsc(){
    // this.common.pid.next('./assets/ssc.json')
     this.navCtrl.push('SscPage')
  }
  // goToSsc() {
  //   this.common.pid.next('./assets/ssc.json')
  //   this.navCtrl.push('SscPage')
  // }

  gotoLhc() {
    this.navCtrl.push(LhcSlidePage, {})
  }

  gotoKs() {

    this.navCtrl.push(KsPage, {})

  }

  goToxuan5(){
     //this.common.pid.next('./assets/115.json')
     this.navCtrl.push('Xuan5Page')
  }
  // goToxuan5() {
  //   console.log('wcndmd')
  //   this.common.pid.next('./assets/115.json')
  //   this.navCtrl.push('Xuan5Page')
  // }
}
