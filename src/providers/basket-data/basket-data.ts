import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { CommonProvider } from '../common/common'
import { UtilProvider } from '../util/util'
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { observe } from "../tools/observe";
import { commonMethod } from '../../components/common.method'
let _ = new observe();

/*
  Generated class for the BasketDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BasketDataProvider {
  betData:Array<any> = []
  totalAmount:number;

  balance:number = 100
  /**
   *  {
   *    amount: ,
   *    lotterys: ,
   *    lotterysText:,
   *    mid:,
   *    moneyUnit:1,
   *    mutiple, 倍数
   *    number, 注数,
   *    origin:
   *    postParameter,  "3|4|5"
   *    prize_group,
   *    type:"qiansan.zhixuan.fushi"
   *    typeText:"前三,直选,直选复式"
   *  }
   */
  statistic:any = {
     multiple: 1,
     trace:1
  }
  
  observable: Observable<any>;
  observer: Observer<any>;
  changeDetect:(option:any) => void;


  constructor(public http: HttpClient, public util:UtilProvider, public common:CommonProvider, private alertCtrl: AlertController) {
    console.log('Hello BasketDataProvider Provider');
    this.observable = new Observable((observer: Observer<any>) => {
         this.observer = observer;
         this.changeDetect = (option) => {
                
                this.observer.next('')
         }
    });
    _.observe([this.betData,this.statistic],()=> this.calculateTotal())
    //_.observe(this.statistic,()=> console.log('axiba'))

  }

  calculateTotal(){
    console.log('change')
      if(this.betData.length>0){
          console.log(this.betData)
          this.totalAmount = this.betData.reduce((r1,r2) => {
            return {...r1, amount:r1.amount + r2.amount}
        }).amount*this.statistic.multiple*this.statistic.trace
        console.log('dddd')
        console.log(this.totalAmount)
        // if(this.totalAmount > this.balance){
        //   this.presentRecharge()
        // }

     } else
        this.totalAmount = 0   
  }

  addBetData(betData?){
    console.log('sssss')
    let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01

    if(betData){
      if(this.totalAmount + this.statistic.multiple*this.statistic.trace*percent*2*betData.length > this.balance){
        this.presentRecharge()
        return false
      }
      betData.forEach(ele => {
          if(this.checkRepeat(ele))
             this.addToExist(ele)
          else
             this.betData.push(ele)
      })
     
    }else{
      let processData = this.processOrder()
      console.log('wrnm')
      if(this.totalAmount + this.statistic.multiple**this.statistic.trace*percent*processData.amount > this.balance){
          this.presentRecharge()
          return false
      }
      if(this.checkRepeat(processData)){
         this.addToExist(processData)
      }else{
         console.log('wccruruurur')
         this.betData.push(processData)
      }
    }  
    return true
  }

  //添加至已存在的注单
  addToExist(processData){
    this.betData = this.betData.map(item => {
      if(item.wayId == processData.wayId && item.lotterysText == processData.lotterysText){
          return {...item, jsId:item.jsId, num:item.num + 1, amount:item.amount*(item.num + 1)/item.num}
      }else{
          return item
      }
    }) 
    this.calculateTotal()
  }

  checkRepeat(processData){
    //let names = name?name:this.common.method + this.common.secondKind + this.common.smallMethod
    let totalData = this.betData.filter(ele => ele.wayId == processData.wayId)
  
    //检测重复
    if(totalData.filter(item => item.lotterysText == processData.lotterysText).length > 0)
       return true
  }

  processOrder(){
    let dataArr = []
    let names = name?name: this.common.gameMethodConfig[0].name_en + this.common.bigKindEn + ' ' + this.common.smallKind.name_en

    /**
     * lotterysText:this.common.componentRef.getLotteryText(), 
     * 
     */
    console.log(dataArr)
    console.log(this.common.componentRef.instance.getLotteryText())
    console.log(this.common.componentRef.instance.getPositionArr())

    return {
         jsId:this.betData.length + 1,
         mid:this.common.smallId,
         amount:this.common.betPrice,
        
         //amountText:'',
         //lotterys:this.common.componentRef.instance.getLotteryData(),
         lotterysText:this.common.componentRef.instance.getOriginLotteryText(), 
         wayId:this.common.smallId,
         type:names,
         gameName:this.common.method + this.common.smallMethod,
         position:this.common.componentRef.instance.getPositionArr(),    
         num:this.common.count,
         onePrice:2,
         moneyUnit:this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01,
         prize_group:1800,
         multiple:this.statistic.multiple,
        // postParameter: this.common.componentRef.instance.getLotteryText(),
         viewBalls:this.common.componentRef.instance.getOriginLotteryText()     
    }
  }

  judge(number){
    switch(number){
      case 0:
          return '大'
      case 1:
          return '小'
      case 2:
          return '单'  
      case 3:
          return '双'           
   }
  }

  clearBasket(){
    console.log('dwefewfeqf')
   // this.betData = []
    for(let i = 0;i<this.betData.length;i++){
        this.betData.splice(i,1)
        i--
    }
    this.common.cartNumber = 0
  }

  removeByIndex(index:number){
    this.betData.splice(index,1)
    this.common.cartNumber--
  }

  randomChoose(number){
    //  let randomData = this.common.ballData.map(item => {
    //     let random = Math.floor(Math.random()*10)
    //     let balls = item.ball.map((ele,index) => index == random ? 1 : 0)
    //     item.ball = balls
    //     return item
    // })
    for(let i=0;i<number;i++){
      this.util.randomChoose(number)
      this.betData.push(this.util.processOrder())
    }
    this.common.cartNumber += number
    //this.calculateTotal()
   
    this.util.resetData()
  }

  presentRecharge() {
    console.log('ssss')
    let alert = this.alertCtrl.create({
      message: '您的余额不足，请先去充值',
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
