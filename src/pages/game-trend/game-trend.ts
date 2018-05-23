import {
  Component, ViewChild, ViewContainerRef, ComponentFactory,
  ComponentRef, ComponentFactoryResolver, OnDestroy
} from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { TrendHeadComponent } from '../../components/gametrend/trend-head/trend-head'
import { IonicPage, NavController, NavParams,  Slides } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util'
import { CommonProvider } from "../../providers/common/common";
import { WuxingComponent } from '../../components/gametrend/wuxing/wuxing'
import { config } from '../../components/gameTrend.config'
import { BasketDataProvider } from '../../providers/basket-data/basket-data'


@IonicPage()
@Component({
  selector: 'page-game-trend',
  templateUrl: 'game-trend.html',
})
export class GameTrendPage {
  componentRef: ComponentRef<any>;
  @ViewChild('contentSlides') contentSlides: Slides;
  @ViewChild("gameTrendContainer", { read: ViewContainerRef }) container: ViewContainerRef;

  observable: Observable<any>;
  observer: Observer<any>;

 // @ViewChild("headContainer", { read: ViewContainerRef }) head: ViewContainerRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,public events:Events, public util:UtilProvider, public common:CommonProvider, public basket:BasketDataProvider,private resolver: ComponentFactoryResolver) {
    //this.head.clear()
    this.observable = new Observable((observer: Observer<any>) => {
      this.observer = observer;
    })

    this.observable.subscribe((val:Promise<any>) => {
      val.then(() => {
          this.drawCanvas()
      })
    })

    //方法切换 改变走势图
    this.events.subscribe('changeTrend',(val) => {
      setTimeout(() => {
        console.log('wcnnvmfmf')
        this.drawTrend()

      },0)
 })

    this.events.subscribe('changeIndex', (val) => {
       this.segmentChanged(val)
    })
  }

  ionViewWillEnter(){
     //this.contentSlides.slideTo(this.navParams.get('index'))
     this.drawTrend()
  }

  ionViewDidLeave(){
    this.container.clear()
   }

  drawCanvas(){
    if(this.common.smallMethod == '直选和值'){
      let containers = document.getElementsByClassName('hezhi-container')
      // 加载新数据后需要清楚canvas
      for(let i = 0;i<containers.length;i++){
           let canvas = containers[i].querySelector('canvas')
           if(canvas){
              let ctx = canvas.getContext('2d')
              ctx.clearRect(0,0,canvas.width,canvas.height)
              containers[i].removeChild(canvas)
           }
      }

      console.log(containers.length)
      for(let i = 0;i<containers.length;i++){

        let container = containers[i]
        let canvas = document.createElement('canvas')
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
        canvas.setAttribute('id','canvas')
        container.appendChild(canvas)
        let ctx = canvas.getContext('2d')
        ctx.strokeStyle = this.getCtxColor(i)
        console.log(this.getCtxColor(i))
        ctx.lineWidth = 1
        ctx.beginPath();
        let nodes = container.querySelectorAll('.highlight')
        for(let i=0; i< nodes.length; i++){
            console.log(nodes.length)
            if(i == 0)
              ctx.moveTo(nodes[i].offsetLeft + 14,nodes[i].offsetTop + 14)
            else
              ctx.lineTo(nodes[i].offsetLeft + 14,nodes[i].offsetTop + 14)
        }
        ctx.stroke()
        ctx.closePath()
    }
}
else{
      let containers = document.getElementsByClassName('trend-container')
      // 加载新数据后需要清楚canvas
      for(let i = 0;i<containers.length;i++){
           let canvas = containers[i].querySelector('canvas')
           if(canvas){
              let ctx = canvas.getContext('2d')
              ctx.clearRect(0,0,canvas.width,canvas.height)
              containers[i].removeChild(canvas)
           }
      }
      console.log(containers.length)
              for(let i = 0;i<containers.length;i++){

              let container = document.getElementsByClassName('trend-container')[i]
              let canvas = document.createElement('canvas')
              canvas.width = container.offsetWidth
              canvas.height = container.offsetHeight
              container.appendChild(canvas)
              let ctx = canvas.getContext('2d')
              ctx.strokeStyle = this.getCtxColor(i)
              console.log(this.getCtxColor(i))
              ctx.lineWidth = 1
              ctx.beginPath();
              let nodes = container.querySelectorAll('.highlight')
              for(let i=0; i< nodes.length; i++){
                  console.log(nodes.length)
                  if(i == 0)
                    ctx.moveTo(nodes[i].offsetLeft + 14,nodes[i].offsetTop + 14)
                  else
                    ctx.lineTo(nodes[i].offsetLeft + 14,nodes[i].offsetTop + 14)
              }
              ctx.stroke()
              ctx.closePath()
            }
    }

}

  create(gameMethod:string):Promise<any>{


    let trendComponent = config[gameMethod]
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(trendComponent)
    this.componentRef = this.container.createComponent(factory)
    this.componentRef.instance.chooseIndex = this.navParams.get('index')
    //上拉加载数据 canvas重回
    this.componentRef.instance.output.subscribe(() => setTimeout(() => this.drawCanvas(),0))
    return new Promise((resolve,reject) => {
        setTimeout(resolve,0)
    })
}

  drawTrend(){
    this.container.clear()
    if(this.common.method == '前三'){
        this.observer.next(this.create(this.common.method + this.common.smallMethod))
    }else{
        this.observer.next(this.create(this.common.method))
    }

  }

  getCtxColor(i){
    switch(this.util.trendKind[this.common.method][i]) {
       case '万位走势':
            return 'yellow'
       case '千位走势':
            return 'orange'
       case '百位走势':
            return 'green'
       case '十位走势':
            return 'purple'
       case '个位走势':
            return 'pink'

    }
 }

  slideChanged(){
    let index = this.contentSlides.getActiveIndex();
    console.log(index)
   // this.util.choose = this.util.menus[index]
  }

  segmentChanged($event){
    console.log('wcnmb')
    console.log($event.value)
    this.contentSlides.slideTo(this.util.menus.indexOf($event.value))
  }

  goBasket(){
    this.basket.addBetData()
    this.navCtrl.push('BasketPage')
  }
}
