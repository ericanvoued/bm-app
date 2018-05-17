import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home'

import {HotGmageListPage} from '../hot-gmage-list/hot-gmage-list';
import { InfoCenterPage } from '../info-center/info-center'


import { CommonProvider } from "../../providers/common/common";
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
  allGameModel(data) {
    let modal = this.modalCtrl.create(HotGmageListPage,data);
    modal.present();
  }

  pushPage(pageName,title){
    this.navCtrl.push(pageName,{
      title:title
    })
  }

  goToSsc(){
     this.common.pid.next('./assets/ssc.json')
     this.navCtrl.push('SscPage')
  }

  goToxuan5(){
     console.log('wcndmd')
     this.common.pid.next('./assets/115.json')
     this.navCtrl.push('Xuan5Page')
  }
}
