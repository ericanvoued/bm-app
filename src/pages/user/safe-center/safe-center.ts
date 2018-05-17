import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';

import { LoadingProvider } from '../../../providers/loading/loading'

import { BankCardPage } from '../bank-card/bank-card'

@IonicPage()
@Component({
  selector: 'page-safe-center',
  templateUrl: './safe-center.html',
})
export class SafeCenterPage {

  safeCentData = {
    start_grade: 0,
    end_grade: 67,
    infoFlag:false,
    arc_percent: 0,
    timer: null,
    canvas: null,
    ctx: null,
    toast:null,
  }

  constructor(
    public navCtrl: NavController,
    public loadPrd: LoadingProvider,
    public toastCtrl:ToastController,
    public navParams: NavParams) {

  }

  ionViewDidEnter() {
    this.getContext()
    this.arcRuning()
  }

  //*************************************获取上下文******************************************
  getContext() {
    this.safeCentData.canvas = document.getElementById('canvas');
    this.safeCentData.ctx = this.safeCentData.canvas.getContext('2d');
  }

  //*************************************画完整的背景圆弧*************************************
  drewFullBgArc() {
    this.safeCentData.ctx.beginPath();
    this.safeCentData.ctx.restore();
    this.safeCentData.ctx.arc(55, 55, 43, 0, 2 * Math.PI, 1);
    this.safeCentData.ctx.lineWidth = 3;
    this.safeCentData.ctx.strokeStyle = 'rgba(255,255,255,.21)';
    this.safeCentData.ctx.stroke();
    this.safeCentData.ctx.save();
    this.safeCentData.ctx.closePath();
  }

  //*************************************画状态圆弧******************************************
  drewUnfullArc(_end) {
    this.drewFullBgArc();
    this.safeCentData.ctx.beginPath();
    this.safeCentData.ctx.restore();
    this.safeCentData.ctx.arc(55, 55, 43, 0, _end * 2 * Math.PI, 0);
    this.safeCentData.ctx.lineWidth = 3;
    this.safeCentData.ctx.strokeStyle = 'rgba(255,255,255,1)';
    this.safeCentData.ctx.stroke();
    this.safeCentData.ctx.save();
    this.safeCentData.ctx.closePath();
  }

  //*************************************状态圆弧运动****************************************
  arcRuning() {
    this.safeCentData.start_grade = 0;
    this.safeCentData.timer = setInterval(() => {
      this.safeCentData.ctx.clearRect(0, 0, 110, 110)
      this.safeCentData.start_grade++
      this.safeCentData.arc_percent = this.safeCentData.start_grade / 100;
      this.drewUnfullArc(this.safeCentData.arc_percent);
      if (this.safeCentData.start_grade == this.safeCentData.end_grade) {
        clearInterval(this.safeCentData.timer)
      }
    }, 16)
  }

  //*************************************提示信息*******************************************
  toggleInfo(){
    this.safeCentData.infoFlag = !this.safeCentData.infoFlag;
  }


  //*************************************页面跳转*******************************************
  pushPage(page) {
    if(!page){
      this.safeCentData.toast = this.loadPrd.showToast(this.toastCtrl, '敬请期待，功能逐步开放中');
    }else {
      this.navCtrl.push(page);
    }
  }

}
