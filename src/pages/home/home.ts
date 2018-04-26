import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {HotGmageListPage} from '../hot-gmage-list/hot-gmage-list';
import { HomeProvider } from '../../providers/home/home'


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
    public modalCtrl: ModalController) {

    this.loadData();
  }

  ionViewDidLoad() {
    this.swiper_init()
  }
  loadData(){
    this.homeData = this.homePrv.HomeData;
    console.log(this.homeData)
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
  allGameModel() {
    let modal = this.modalCtrl.create(HotGmageListPage);
    modal.present();
  }

  // pushPage(pageName,title){
  //   this.navCtrl.push(pageName,{
  //     title:title
  //   })
  // }


}
