import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home'

import {HotGmageListPage} from '../hot-gmage-list/hot-gmage-list';
import { InfoCenterPage } from '../info-center/info-center'


import { CommonProvider } from "../../providers/common/common";
import {LhcSlidePage} from "../lhc/lhc-slide/lhc-slide";
import {KsPage } from "../k3/ks/ks";
declare var Swiper;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  banner_swiper: any;
  info_swiper: any;
  homeData: any;

  constructor(
    public navCtrl: NavController,
    public homePrv: HomeProvider,
    public modalCtrl: ModalController,public common:CommonProvider) {

    this.loadData();
    }


  ionViewDidLoad() {
    this.swiper_init()
  }

  loadData(){
    this.homeData = this.homePrv.HomeData;
  }


  swiper_init() {
    this.banner_swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 5,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
    });

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

  //更多彩种
  // allGameModel(data) {
  //   let modal = this.modalCtrl.create(HotGmageListPage,data);
  //   modal.present();
  // }

  //页面跳转
  pushPage(pageName, data) {
    console.log(data)
    if (data) {
      this.navCtrl.push(pageName, data)
    } else {
      this.navCtrl.push(pageName)
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
