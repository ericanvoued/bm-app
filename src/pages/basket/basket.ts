import { Component ,ComponentRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasketDataProvider } from '../../providers/basket-data/basket-data'
import { CommonProvider } from "../../providers/common/common";
import { trigger ,state,transition,animate,style} from "@angular/animations";
import { AlertController } from 'ionic-angular';
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
       transition('* => *',animate('.5s'))
    ])
   ]
})

export class BasketPage {
  show:string = "invisable"
  arr:any[] = []

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
    this.basket.statistic.multiple += number
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

}
