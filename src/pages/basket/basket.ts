import { Component ,ComponentRef} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BasketDataProvider } from '../../providers/basket-data/basket-data'
import { CommonProvider } from "../../providers/common/common";
import { trigger ,state,transition,animate,style} from "@angular/animations";
import { UtilProvider } from '../../providers/util/util'

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

  constructor(public navCtrl: NavController, public navParams: NavParams,  public basket:BasketDataProvider, public common:CommonProvider, private alertCtrl: AlertController,public util:UtilProvider) {
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


}
