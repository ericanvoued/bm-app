import {
  Component, ViewChild, ViewContainerRef, ComponentFactory,
  ComponentRef, ComponentFactoryResolver, OnDestroy
} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { CommonProvider } from "../../../providers/common/common";
import { Effect } from '../../../baseComponent'
import { Events } from 'ionic-angular';
import { CountTipComponent } from '../../../components/count-tip/count-tip'

import { BasketDataProvider } from '../../../providers/basket-data/basket-data'
import { gameConfig } from '../../../components/115-config'

import { GamemenuComponent } from '../../../components/gamemenu/gamemenu'
import { MenumodalComponent } from '../../../components/menumodal/menumodal'
import { UtilProvider } from '../../../providers/util/util'

import * as $ from 'jquery'
import * as Hammer from 'hammerjs';

/**
 * Generated class for the Xuan5Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xuan5',
  templateUrl: 'xuan5.html',
  providers:[GamemenuComponent]
  
})
export class Xuan5Page extends Effect{
   @ViewChild("gameContainer", { read: ViewContainerRef }) gameContainer: ViewContainerRef;
   componentRef: ComponentRef<any>;
   haveChoosen:any[] = ['当前遗漏']
   
   record: any = [
    {number: 23057, balls: '12345', shiwei: '大单', gewei: '小双', housan: '组六'},
    {number: 23056, balls: '34567', shiwei: '大单', gewei: '小双', housan: '组六'},
    {number: 23057, balls: '12345', shiwei: '大单', gewei: '小双', housan: '组六'},
    {number: 23056, balls: '34567', shiwei: '大单', gewei: '小双', housan: '组六'},
    {number: 23057, balls: '12345', shiwei: '大单', gewei: '小双', housan: '组六'},
    {number: 23056, balls: '34567', shiwei: '大单', gewei: '小双', housan: '组六'},
    {number: 23057, balls: '12345', shiwei: '大单', gewei: '小双', housan: '组六'},
    // {number: 23056, balls: '34567', shiwei: '大单', gewei: '小双', housan: '组六'},
    // {number: 23057, balls: '12345', shiwei: '大单', gewei: '小双', housan: '组六'},
    // {number: 23056, balls: '34567', shiwei: '大单', gewei: '小双', housan: '组六'}
   ]

   list: any = []
   //助手菜单
   menus:any =  ['走势图','近期开奖','号码统计','玩法说明']


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, private resolver: ComponentFactoryResolver,public app:App,
    public common:CommonProvider, public gamemenu:GamemenuComponent, public util:UtilProvider,public basket:BasketDataProvider,public events:Events) {
        super(common,gamemenu,modalCtrl,navCtrl)
        this.list = this.record.slice(0, 2)

        this.common.initData().then(
            () => {
                this.gameContainer.clear()
                let method
                if(this.common.method == '二星'){
                    method = this.common.method + this.common.secondKind + this.common.smallMethod
                }else{
                    method = this.common.method + this.common.smallMethod
                }
                console.log(method)
                const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(gameConfig[method])
                this.componentRef = this.gameContainer.createComponent(factory)
                this.componentRef.instance.choose = this.haveChoosen
                this.common.componentRef = this.componentRef
                           this.util.shakePhone(() => {
                               this.util.randomChoose(this.componentRef)
                           })
            }
        )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Xuan5Page');
  }

  ionViewWillEnter(){
    // this.gameContainer.clear()
    // let method
    // if(this.common.method == '二星'){
    //     method = this.common.method + this.common.secondKind + this.common.smallMethod
    // }else{
    //     method = this.common.method + this.common.smallMethod
    // }
    // console.log(method)
    // const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(gameConfig[method])
    // this.componentRef = this.gameContainer.createComponent(factory)
    
    //            this.util.shakePhone(() => {
    //                this.util.randomChoose(this.componentRef)
    //            })
  }

  change(val){
    console.log(val)
    if(val == '走势图')
       this.app.getRootNav().push('GameTrendPage',{'index':1}) 
      // this.navCtrl.push('GameTrendPage',{'index':1})

    if(val == '号码统计'){
        if($('.modal').hasClass('active')){
            $('.body-bg').fadeOut(1000)
        }else{
            $('.body-bg').fadeIn(1000)
        }
        $('.modal').toggleClass('active')

    }
   }

   resetData(){
       if(this.common.smallMethod.indexOf('组选胆拖') != -1){
            console.log('dwf')
            this.componentRef.instance.arr = []
       }
       this.util.resetData()
   }


// check(choice){
//    return this.haveChoosen.indexOf(choice) > -1
// }

   //切换小玩法
   methodChange($event){
    //    this.haveChoosen = ['当前遗漏']
       console.log($event)
       let component = gameConfig[$event]
       this.gameContainer.clear()
       const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component)
       this.componentRef = this.gameContainer.createComponent(factory)
       console.log(this.haveChoosen)
       this.componentRef.instance.choose = this.haveChoosen
   }
}
