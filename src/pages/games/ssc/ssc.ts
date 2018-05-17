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

import { GamemenuComponent } from '../../../components/gamemenu/gamemenu'
import { MenumodalComponent } from '../../../components/menumodal/menumodal'
import { UtilProvider } from '../../../providers/util/util'
import { gameConfig } from '../../../components/ssc-config'

import { SscServiceProvider } from '../../../providers/games/ssc-service/ssc-service'
import * as $ from 'jquery'
import * as Hammer from 'hammerjs';
/**
 * Generated class for the SscPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ssc',
  templateUrl: 'ssc.html',
  providers:[GamemenuComponent]
})
export class SscPage extends Effect{
    @ViewChild("gameContainer", { read: ViewContainerRef }) gameContainer: ViewContainerRef;
    componentRef: ComponentRef<any>;
    //showTip:any = ['当前遗漏', '30期冷热', '平均遗漏', '最大遗漏']
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

    //助手菜单
    menus:any =  ['走势图','近期开奖','号码统计','玩法说明']

    

    list: any = []

    maxNumber:number;
    loadNumber:number = 0
    over:boolean;
    trHeight:number;
    high:number = 0

   
    


    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, private resolver: ComponentFactoryResolver,public app:App,
    public common:CommonProvider, public gamemenu:GamemenuComponent, public util:UtilProvider,public basket:BasketDataProvider,public ssc:SscServiceProvider, public events:Events) {
        super(common,gamemenu,modalCtrl)

        this.list = this.record.slice(0, 2)
        this.over = this.record.length > 2 ? false:true

        if(this.record.length > 2){
            this.maxNumber = Math.ceil(this.record.length/5)
        }else{
            this.maxNumber = 0
        }
    
    }

    ionViewWillEnter(){
        this.gameContainer.clear()
        let method
        if(this.common.method == '二星'){
            method = this.common.method + this.common.secondKind + this.common.smallMethod
        }else{
            method = this.common.method + this.common.smallMethod
        }
        const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(gameConfig[method])
        this.componentRef = this.gameContainer.createComponent(factory)
        
                   this.util.shakePhone(() => {
                       this.util.randomChoose(this.componentRef)
                   })
    }

    ionViewDidLoad() {
       
        console.log(document.querySelector('.tr').offsetHeight)
        this.trHeight = document.querySelector('.tr').offsetHeight

        console.log(document.getElementById('qq'))
        this.watchScroll()


        let touch = new Hammer(document.getElementById('touch'));
        touch.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
        touch.on('swipeup',()=>{
            if(this.loadNumber == this.maxNumber && this.maxNumber != 0){
                this.loadNumber = 0
                this.over = false
                this.high = 0

                setTimeout(()=> {
                   this.watchScroll()
                },0)
            }

        })
      }

    ionViewWillLeave(){
        console.log('dwfqwfwqef')
        clearInterval(this.timer)
    }


    watchScroll(){
        let mc = new Hammer(document.getElementById('qq'));
        mc.get('swipe').set({direction: Hammer.DIRECTION_VERTICAL});
        mc.on('swipedown', () => {
            console.log('axiba')
            //this.record.push( {number:23056,balls:'34567',shiwei:'大单',gewei:'小双',housan:'组六'})
            if (++this.loadNumber == this.maxNumber)
                this.over = true

            if (this.loadNumber == 1)
                this.high = (this.record.slice(0,1*5).length - 2)*this.trHeight

            if (this.loadNumber == 2)
                this.high = (this.record.slice(0,2*5).length - 2)*this.trHeight

            this.list = this.record.slice(0, this.loadNumber * 5)

        })
    }

    goToBasket(){
      console.log('gobasket')
      if(this.common.cartNumber > 0 )
         this.navCtrl.push('BasketPage',{'index':this.componentRef})
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

   changeMenu(val){
        // if(this.haveChoosen.indexOf(val) > -1){
        //      let index = this.haveChoosen.indexOf(val)
        //      this.haveChoosen.splice(index,1)
        // }else{
        //      this.haveChoosen.push(val)
        //      // 判断是否冷热  this.util.fetch('lengre')
        // }
        for(let j = 0;j<this.haveChoosen.length;j++){
            if(val.indexOf(this.haveChoosen[j] == -1)){
                this.haveChoosen.splice(this.haveChoosen[j],1)
                j--
            }      
        }

        for(let i =0;i<val.length;i++){
            if(this.haveChoosen.indexOf(val[i]) == -1)
               this.haveChoosen.push(val[i])    
        }
        console.log(val)
        console.log(this.haveChoosen)
        this.componentRef.instance.choose = this.haveChoosen
   }

   
   check(choice){
       return this.haveChoosen.indexOf(choice) > -1
   }

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
