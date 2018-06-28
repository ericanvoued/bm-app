import * as $ from 'jquery';
import {
    Component, ViewChild, ViewContainerRef, ComponentFactory,
    ComponentRef, ComponentFactoryResolver, OnDestroy
  } from '@angular/core';
import { CommonProvider } from './providers/common/common'
import { GamemenuComponent } from './components/gamemenu/gamemenu'
import { ModalController,NavController } from 'ionic-angular';
import { CountTipComponent } from './components/count-tip/count-tip'
import { Events } from 'ionic-angular';


let tt = 0;

function easeOutCubic(t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
}

export class Effect{
    @ViewChild("gameContainer", { read: ViewContainerRef }) gameContainer: ViewContainerRef;
    
    timer:any;
    componentRef: ComponentRef<any>;
    haveChoosen:any[] = ['当前遗漏']

    gameConfig:any;
    list: any ;

    maxNumber:number;
    
    countTime:any = {
        'total': '',
        'days': '',
        'hours': '',
        'minutes': '',
        'seconds': ''
    }

    constructor(public common:CommonProvider, public gamemenu:GamemenuComponent, public modalCtrl: ModalController,public navCtrl:NavController,public resolver: ComponentFactoryResolver,public events:Events){
        let self = this;

        //this.produce()

        //拉去倒计时
        this.common.produce()
        
        $(document).on('click','.body-bg',function(){
            if(self.common.visible = 'visable'){
                console.log('fff');self.gamemenu.toggle()
            }
            $('.modal').removeClass('active')
            
        });
        //this.addDynamicComponent()

        this.common.fetchRecord().then(() => {
            this.list = this.common.historyList.map(this.handleBall).slice(0,10)
            if(this.list.length > 2){
                this.maxNumber = Math.ceil(this.list.length/5)
            }else{
                this.maxNumber = 0
            }
        })  

        this.events.subscribe('changeRecord', () => {
            console.log('nmslbrwgbebrreberbe')
            let length = this.common.historyList.length, historyList = this.common.historyList
            //this.list = historyList.map(this.handleBall).slice(0,10)
           // this.list = historyList.concat(1 - historyList.length).concat({number:historyList[length - 1]+1,code:'',time:''}).map(this.handleBall).slice(0,10)
           this.list = this.list.slice(0,this.list.length - 2)
           this.list.unshift({number:(+(historyList[0].number) + 1 +'').slice(-7),balls:'',time:''})

            
            if(this.list.length > 2){
                this.maxNumber = Math.ceil(this.list.length/5)
            }else{
                this.maxNumber = 0
            }
           console.log(this.list)
           this.timer =  setInterval(() => {
                this.common.fetchRecord().then(() => {
                     console.log('fetch arrive')
                     if(this.common.historyList[0].number.slice(-7) == this.list[0].number){
                        this.list = this.common.historyList.map(this.handleBall).slice(0,10)
                        if(this.list.length > 2){
                            this.maxNumber = Math.ceil(this.list.length/5)
                        }else{
                            this.maxNumber = 0
                        }
                        clearInterval(this.timer)
                     }
                })
            },10000)
        })
    }



    move(){
        tt += 1000/60;
        let width = document.getElementById('bet-statistic').offsetWidth
        let ball = document.getElementById('ball');
        if(tt < 600){
            let left = Math.ceil(easeOutCubic(tt,50,width,600))
            ball.style.left = left + 'px'

            // let high = -(width*(left - 150 ) -((left - 150)*(left - 150)))/500;
            let high = width*width/1200
            let top = -(width - left + 50)*(left -50)/200
            // y = -(x- width)x/300 = (width - left + 150)(left -150)/300   high = width*width/1200
            ball.style.top =  top  + 'px'
            if(Math.abs(top)>=high){
                let time = 600 - tt
                $('#ball').animate({width:0,height:0},time,function(){
                    console.log('finish')
                })
            }
            top = Math.abs(high)

            requestAnimationFrame(this.move.bind(this))
        }else{
            console.log('你妈死额')
            this.common.cartNumber++
            $('#ball').remove()
            tt = 0
        }
    }

    goToBasket(){
        console.log('gobasket')
        this.navCtrl.push('BasketPage',{'index':this.componentRef})
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
       let component = this.gameConfig[$event]
       this.gameContainer.clear()
       const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component)
       this.componentRef = this.gameContainer.createComponent(factory)
       this.common.componentRef = this.componentRef
       console.log(this.haveChoosen)
       this.componentRef.instance.choose = this.haveChoosen
   }

   handleBall(ele){}
}