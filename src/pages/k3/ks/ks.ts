import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KsAction } from "./ks-action";
// import { KsBasketPage } from '../ks-basket/ks-basket';
import {PopoverController} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-ks',
  templateUrl: 'ks.html',
})
export class KsPage extends KsAction{

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController) {
    super();
  }

  ionViewDidLoad() {

    this.initView();
    console.log('ionViewDidLoad KsPage');

  }



  pushToBasket(){
    // this.navCtrl.push(KsBasketPage,{
    // })

  }




}
