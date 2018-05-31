import { HttpClient } from '@angular/common/http';
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
   *    
   * 
   * 
   *  }
   *  
   * 
   * 
   */
  statistic:any = {
     multiple: 1,
     trace:1
  }
  
  observable: Observable<any>;
  observer: Observer<any>;
  changeDetect:(option:any) => void;


  constructor(public http: HttpClient, public util:UtilProvider, public common:CommonProvider) {
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
        }).amount*this.statistic.multiple
        console.log('dddd')
        console.log(this.totalAmount)
     } else
        this.totalAmount = 0   
  }

  addBetData(){
    console.log('sssss')
    let processData = this.processOrder()
    //let names = name?name:this.common.method + this.common.secondKind + this.common.smallMethod
    //检测重复
    if(this.checkRepeat(processData)){
       console.log('cun zai')
       this.betData = this.betData.map(item => {
            if(item.wayId == processData.wayId && item.lotterysText == processData.lotterysText){
                console.log('axiww')
                return {...item, jsId:item.jsId, number:item.number + 1, amount:item.amount*(item.number + 1)/item.number}
            }else{
                return item
            }
       })
       this.calculateTotal()
    }else{
        this.betData.push(processData)
    }
    //this.common.cartNumber++
    //this.calculateTotal()
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
    let names = name?name:this.common.method + ' ' + this.common.secondKind + ' ' + this.common.smallMethod

    if(names.indexOf('和值') > -1){
      // let zhixuan = names.indexOf('直选和值') > -1 || this.common.secondKind == '直选' ? true : false
      
      // this.common.ballData.forEach((item,index) => {
      //   let arr = [],flag = false
      //   item.value.forEach((ele,index1) => {
      //        if(ele){
      //           let number = zhixuan ? ('0' + (index*item.value.length + index1)).slice(-2) : ('0' + (index*item.value.length + index1 + 1)).slice(-2)
      //           arr.push(number)
      //           flag = true
      //        }
      //   })
      //   if(flag)
      //      dataArr.push(arr.join(' '))
      // })
    }else{
      // let daxiaodanshuang = this.common.method == '大小单双' ? true : false

      // this.common.ballData.forEach(item => {
      //   let arr = []
      //   item.value.forEach((ele,index) => {
      //     if(!daxiaodanshuang){
      //       ele == 1 ? arr.push(('0'+index).slice(-2)):''
      //     }else{
      //       ele == 1 ? arr.push(this.judge(index)):''
      //     }
      //   })
      //   dataArr.push(arr.join(' '))
      // })
    }
    /**
     * lotterysText:this.common.componentRef.getLotteryText(), 
     * 
     */
   
    console.log(dataArr)
    console.log(this.common.componentRef.instance.getLotteryText())
    console.log(this.common.componentRef.instance.getPositionArr())


    return {
         jsId:this.betData.length + 1,
         amount:this.common.betPrice,
         lotterys:this.common.componentRef.instance.getLotteryData(),
         lotterysText:this.common.componentRef.instance.getLotteryText(), 
         wayId:this.common.smallId,
         typeText:names,
         number:this.common.count,
         moneyUnit:this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01,
         mutiple:this.statistic.multiple,
         postParameter: "3|4|5",
         position:this.common.componentRef.instance.getPositionArr()    
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
    this.betData = []
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

  // getSubmitData(): Object {
  //   return {
  //     "gameId": this.share.pid,
  //     "isTrace": +(this.share.globalData.trace > 1),
  //     "traceWinStop": +this.traceWinStop,
  //     "traceStopValue": 1,
  //     "balls": this.getBallsString(),
  //     "orders": this.getOrderIssure(),
  //     "amount": this.totalAllCount,
  //     is_encoded: 1,
  //     _token: this.share.user.token,
  //     bet_source: this.share.plat
  //   }
  // }
}
