import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
import {LhcAction} from "./lhc-action";


declare var Swiper;
@IonicPage()
@Component({
  selector: 'page-lhc-slide',
  templateUrl: 'lhc-slide.html',
})
export class LhcSlidePage extends LhcAction{

  menus: Array<string> = ["快捷下注", "自选下注"];
  @ViewChild('contentSlides') contentSlides: Slides;

  swiper: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

    super();
  }

  ionViewDidLoad() {

    this.initSwiper();

    this.initView();

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
