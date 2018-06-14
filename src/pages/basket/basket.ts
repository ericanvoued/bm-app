import { Component ,ComponentRef} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BasketDataProvider } from '../../providers/basket-data/basket-data'
import { CommonProvider } from "../../providers/common/common";
import { trigger ,state,transition,animate,style} from "@angular/animations";
import { UtilProvider } from '../../providers/util/util'
import { HttpClientProvider } from '../../providers/http-client/http-client'

declare var encrypt
//import { encrypt } from '../../assets/js/Encrypt.js'
/**
 * Generated class for the BasketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
  animations:[
    trigger('show',[
       state('visable',style({
         opacity: 1,
         transform:'translate3d(0, 0, 0)'
       })),
       state('invisable', style({
         opacity: 0,
        transform:'translate3d(0, 100%, 0)'
       })),
       transition('* => *',animate('.3s'))
    ])
   ]
})

export class BasketPage {
  show:string = "invisable"
  arr:any[] = []

  balance:number = 100

  componentRef:ComponentRef<any>

  constructor(public navCtrl: NavController, public navParams: NavParams,  public basket:BasketDataProvider, public common:CommonProvider, private alertCtrl: AlertController,public util:UtilProvider, public http:HttpClientProvider) {
    for(let i = 0;i<30;i++){
       this.arr.push(i)
    }
    //此处获取需要机选注单的实例  
    //this.componentRef = this.navParams.get('index')
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketPage');
  }

  toggle(){
    this.show = this.show == 'invisable' ? 'visable' : 'invisable'
  }

  change(number){
    if(number < 0 && this.basket.statistic.multiple == 1)
       return

    let mutiple = this.basket.statistic.multiple + number
    if(this.basket.totalAmount*(mutiple/this.basket.statistic.multiple) > this.balance){
        this.presentRecharge()
        return 
    }
    this.basket.statistic.multiple += number
    console.log(this.basket.totalAmount)   
  }

  changeTrace(number){
    if(number < 0 && this.basket.statistic.trace == 1)
      return

   let trace = this.basket.statistic.trace + number
   if(this.basket.totalAmount*(trace/this.basket.statistic.trace) > this.balance){
       this.presentRecharge()
       return 
   }
   this.basket.statistic.trace += number
   console.log(this.basket.totalAmount)   
  }

  // 机选一单
  randomChoose(number?){
     if(number){
         console.log('number == 5')
         this.common.componentRef.instance.randomChoose(number)

     }else{
         this.common.componentRef.instance.randomChoose(number)
         this.basket.addBetData()
     }  
  }

  ionViewWillLeave(){
     this.util.resetData()
  }

  presentConfirm() {
    console.log('ssss')
    let alert = this.alertCtrl.create({
      message: '确认清空所有注单',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
               this.basket.clearBasket()
          }
        }
      ]
    });
    alert.present();
 }

 presentRecharge() {
  console.log('ssss')
  let alert = this.alertCtrl.create({
    message: '<div class="not-enough">您的余额不足，请先去充值</div>',
    buttons: [
      {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: '确认',
        handler: () => {
        }
      }
    ]
  })
  alert.present();
}

  confirmBet(){
     let result = {}, ballsData = this.basket.betData, len = ballsData.length, i = 0;
     result['gameId'] = this.common.gameId
     result['isTrace'] = 0
     result['traceStopValue'] = 1
     result['traceWinStop'] = 1
     result['orders'] = {}
     result['orders'][this.common.currentNumber] = 1
     result['amount'] = this.basket.totalAmount
     result['is_encoded'] = 1
     result['bet_source'] = 'h5'
     result['_token'] = JSON.parse(localStorage.getItem('userInfo')).token

     result['balls'] = []
     for (; i < len; i++){
       console.log('ddd')
        result['balls'].push({
          'jsId': ballsData[i]['jsId'],
          'wayId': ballsData[i]['mid'],
          'ball': ballsData[i]['lotterysText'],
          'position':ballsData[i]['position'],
          'viewBalls':ballsData[i]['viewBalls'],
          'num': ballsData[i]['num'],
          'type': ballsData[i]['type'],
          'onePrice': ballsData[i]['onePrice'],
          'prize_group':ballsData[i]['prize_group'],
          'moneyunit': ballsData[i]['moneyUnit'],
          'multiple': ballsData[i]['multiple']
        })
      }

      console.log(result)
      console.log(encrypt(JSON.stringify(result['balls'])))
      result['balls'] = encrypt(JSON.stringify(result['balls']))

      let url = '/api-lotteries-h5/bet/' + this.common.gameId + '?_t=' + JSON.parse(localStorage.getItem('userInfo')).auth_token
      this.http.postData(url,result).then(data => {
        console.log(data)
         if(data.isSuccess == 1){
          let alert = this.alertCtrl.create({
            title: '恭喜您',
            message: '投注已成功，祝你好运!',
          });
          alert.present();
         }
      
       }
      )
    }
}
