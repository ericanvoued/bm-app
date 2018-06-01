import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading'

@IonicPage()
@Component({
  selector: 'page-hot-gmage-list',
  templateUrl: 'hot-gmage-list.html',
})
export class HotGmageListPage {

  lottorys = {
    editable:false,
    hotGmaes: [],
    moreGmages:[]

  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadPrd:LoadingProvider,
    public ViewCtrl: ViewController) {

    this.lottorys.hotGmaes = JSON.parse(localStorage.getItem('hotGmaes'))
    this.lottorys.moreGmages = JSON.parse(localStorage.getItem('moreGmages'))

    if(this.lottorys.hotGmaes==null){
      this.lottorys.hotGmaes = [
        {series_id: 1, id: 1, name: "重庆时时彩", nav: "CQSSC", time: "2018-06-01 13:39:30"},
        {series_id: 2, id: 2, name: "山东11选5", nav: "SD11Y", time: null},
        {series_id: 1, id: 3, name: "黑龙江时时彩", nav: "HLJSSC", time: null},
        {series_id: 1, id: 6, name: "新疆时时彩", nav: "XJSSC", time: null},
        {series_id: 1, id: 7, name: "天津时时彩", nav: "TJSSC", time: null},
        {series_id: 2, id: 8, name: "江西11选5", nav: "JX11Y", time: null},
        {series_id: 2, id: 9, name: "广东11选5", nav: "GD11Y", time: null},
        {series_id: 1, id: 11, name: "博猫2分彩", nav: "BM2MSSC", time: null},
        {series_id: 2, id: 12, name: "博猫11选5", nav: "BM11Y", time: null},
        {series_id: 15, id: 21, name: "江苏快3", nav: "JSK3", time: "2018-06-01 13:47:00"},
        {series_id: 1, id: 23, name: "博猫1分彩", nav: "BM1MSSC", time: null},
        {series_id: 1, id: 24, name: "博猫5分彩", nav: "BM5MSSC", time: null},
        {series_id: 19, id: 53, name: "北京PK10", nav: "BJPK10", time: null},
        {series_id: 21, id: 61, name: "香港六合彩", nav: "LHC", time: null},
        {series_id: 16, id: 71, name: "江苏骰宝", nav: "JSDICE", time: null},
        {series_id: 1, id: 72, name: "夺金60秒", nav: "JLFFC", time: null},
        {series_id: 1, id: 73, name: "金星彩1.5", nav: "JXC90S", time: null}
      ]
      this.lottorys.moreGmages = [
        {series_id: 1, id: 7, name: "天津时时彩", nav: "TJSSC", time: null},
        {series_id: 2, id: 8, name: "江西11选5", nav: "JX11Y", time: null},
        {series_id: 2, id: 9, name: "广东11选5", nav: "GD11Y", time: null},
        {series_id: 1, id: 11, name: "博猫2分彩", nav: "BM2MSSC", time: null},
      ]
    }

  }

  ionViewDidLoad() {
    console.log(this.navParams)
  }


  decreament(_lottory,_index){
    if(this.lottorys.hotGmaes.length>3){
      this.lottorys.moreGmages.push(_lottory)
      this.lottorys.hotGmaes.splice(_index,1)
    }else{
      this.loadPrd.showToast(this.toastCtrl,'最少保留3个彩种')
    }

  }

  increament(_lottory,_index){
    this.lottorys.hotGmaes.push(_lottory)
    this.lottorys.moreGmages.splice(_index,1)
  }

  toggleEdit(){

    if(this.lottorys.editable){
      localStorage.hotGmaes = JSON.stringify(this.lottorys.hotGmaes)
      localStorage.moreGmages = JSON.stringify(this.lottorys.moreGmages)

    }else {

    }
    this.lottorys.editable =!this.lottorys.editable;
  }
}
