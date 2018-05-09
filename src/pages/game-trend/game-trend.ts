import {
  Component, ViewChild, ViewContainerRef, ComponentFactory,
  ComponentRef, ComponentFactoryResolver, OnDestroy
} from '@angular/core';
import { Events } from 'ionic-angular';
import { TrendHeadComponent } from '../../components/gametrend/trend-head/trend-head'
import { IonicPage, NavController, NavParams,  Slides } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util'
import { CommonProvider } from "../../providers/common/common";
import { WuxingComponent } from '../../components/gametrend/wuxing/wuxing'

/**
 * Generated class for the GameTrendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game-trend',
  templateUrl: 'game-trend.html',
})
export class GameTrendPage {
  componentRef: ComponentRef<any>;
  @ViewChild('contentSlides') contentSlides: Slides;  
  @ViewChild("alertContainer", { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild("headContainer", { read: ViewContainerRef }) head: ViewContainerRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,public events:Events, public util:UtilProvider, public common:CommonProvider, private resolver: ComponentFactoryResolver) {
    //this.head.clear()
    this.events.subscribe('changeIndex', (val) => {
       this.segmentChanged(val)
    })
  }

  ionViewWillEnter(){
     //this.contentSlides.slideTo(this.navParams.get('index'))
     this.drawTrend() 
  }

  drawTrend(){
    this.head.clear()
    const factory: ComponentFactory<TrendHeadComponent> = this.resolver.resolveComponentFactory(TrendHeadComponent)
    this.componentRef = this.head.createComponent(factory)

    if(this.common.method == '五星'){
      const factory: ComponentFactory<WuxingComponent> = this.resolver.resolveComponentFactory(WuxingComponent)
      this.componentRef = this.container.createComponent(factory)
    }


    let containers = document.getElementsByClassName('trend-container')
    console.log(containers.length)
    for(let i = 0;i<containers.length;i++){
    let container = document.getElementsByClassName('trend-container')[i]
    let canvas = document.createElement('canvas')
    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight
    container.appendChild(canvas)
    let ctx = canvas.getContext('2d')
    ctx.strokeStyle = "#f5d300"
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
}
