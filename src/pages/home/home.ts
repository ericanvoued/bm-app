import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var Swiper;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentFlag:boolean = true

  banner_swiper:any;
  info_swiper:any;

  footBallData:any = {
    btns:[
      {
        a:0,
        spanFlag:0,
        text:"10元"
      },{
        a:0,
        spanFlag:0,
        text:"20元"
      },{
        a:0,
        spanFlag:0,
        text:"50元"
      },{
        a:0,
        spanFlag:1,
        text:'预测奖金'
      }
    ]
  }

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.swiper_init()
  }

  swiper_init(){
    this.banner_swiper = new Swiper('.swiper-container',{
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 12,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },

    });

    this.info_swiper = new Swiper('.info-slider',{
      direction: 'vertical',
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      }
    })
  }


  // pushPage(pageName,title){
  //   this.navCtrl.push(pageName,{
  //     title:title
  //   })
  // }



}
