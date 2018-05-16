import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonProvider } from '../common/common'
import { UtilProvider } from '../util/util'
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import {observe} from "..//tools/observe";
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
     if(this.betData.length>0)
        this.totalAmount = this.betData.reduce((r1,r2) => {
            return {...r1, price:r1.price + r2.price}
        }).price*this.statistic.multiple
     else
        this.totalAmount = 0   
  }

  addBetData(name?){
    console.log('sssss')
    let processData = this.processOrder(name)
    let names = name?name:this.common.method + ' ' + this.common.smallMethod
    let totalData = this.betData.filter(ele => ele.gameName == names)
    console.log(totalData)
    console.log(processData)
    if(totalData.filter(item => item.betData.join('') == processData.betData.join('')).length > 0){
       console.log('cun zai')
       this.betData = this.betData.map(item => {
            if(item.gameName == names && item.betData.join('') == processData.betData.join('')){
                console.log('axiww')
                return {...item,count:item.count + 1, price:item.price*(item.count + 1)/item.count}
            }else{
                return item
            }
       })
    }else{
        this.betData.push(this.processOrder(name))

    }
    //this.common.cartNumber++
    //this.calculateTotal()
  }

  processOrder(name?){
    let dataArr = []
    let names = name?name:this.common.method + ' ' + this.common.smallMethod

    if(names.indexOf('和值') > -1){
      let zhixuan = names.indexOf('直选和值') > -1 || this.common.secondKind == '直选' ? true : false
      
      this.common.ballData.forEach((item,index) => {
        let arr = [],flag = false
        item.value.forEach((ele,index1) => {
             if(ele){
                let number = zhixuan ? ('0' + (index*item.value.length + index1)).slice(-2) : ('0' + (index*item.value.length + index1 + 1)).slice(-2)
                arr.push(number)
                flag = true
             }
        })
        if(flag)
           dataArr.push(arr.join(' '))
      })

    }else{
      let daxiaodanshuang = this.common.method == '大小单双' ? true : false

      this.common.ballData.forEach(item => {
        let arr = []
        item.value.forEach((ele,index) => {
          if(!daxiaodanshuang){
            ele == 1 ? arr.push(('0'+index).slice(-2)):''
          }else{
            ele == 1 ? arr.push(this.judge(index)):''
          }
        })
        dataArr.push(arr.join(' '))
      })
    }
    
   
    console.log(dataArr)
    // dataArr = dataArr.map(item => item.join(''))
    return {
         betData:dataArr,
         gameName:names,
         count:this.common.count,
         price:this.common.betPrice
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
