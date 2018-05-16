import * as $ from 'jquery';
import { CommonProvider } from './providers/common/common'
import { GamemenuComponent } from './components/gamemenu/gamemenu'
import { ModalController } from 'ionic-angular';
import { CountTipComponent } from './components/count-tip/count-tip'


let tt = 0;

function easeOutCubic(t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
}

export class Effect{
    timer:any;
    
    countTime:any = {
        'total': '',
        'days': '',
        'hours': '',
        'minutes': '',
        'seconds': ''
    }

    constructor(public common:CommonProvider, public gamemenu:GamemenuComponent, public modalCtrl: ModalController,){
        let self = this;

        this.produce()
        
        $(document).on('click','.body-bg',function(){
            if(self.common.visible = 'visable'){
                console.log('fff');self.gamemenu.toggle()
            }
            $('.modal').removeClass('active')
            
        });
        //this.addDynamicComponent()
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

    produce(){
        console.log('produce')  
        this.countDown(Math.floor(Math.random()*10)*1000 + 30*1000)
    }

    countDown(time){
        this.timer = setInterval(()=> {
        if(time <1000){
            clearInterval(this.timer)
            console.log('wcnmbmb')
            //this.events.publish('countDown')
            let modal = this.modalCtrl.create(CountTipComponent, {qishu:123456})
            modal.present()
            //this.global.showToast('进入新一期开奖',2000)
            this.produce()
        } 
        this.countTime = this.getTimeRemaining(time)
        time -= 1000
        },1000)
    }

    getTimeRemaining(t) {
        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        let days = Math.floor(t / (1000 * 60 * 60 * 24));
    
        return {
          'total': t,
          'days': days,
          'hours': ('0' + hours).slice(-2),
          'minutes': ('0' + minutes).slice(-2),
          'seconds': ('0' + seconds).slice(-2)
        };
    }


}