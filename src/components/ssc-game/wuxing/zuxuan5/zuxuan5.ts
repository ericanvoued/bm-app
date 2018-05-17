import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { ToolsProvider } from '../../../../providers/tools/tools'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the Zuxuan5Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zuxuan5',
  templateUrl: 'zuxuan5.html'
})
export class Zuxuan5Component extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)  
    console.log('Hello Zuxuan5Component Component');
    this.text = 'Hello World';
  }

  qqq(number){
    return number + 5
  }

  randomChoose(number?){
    let temp,arr;

    if(number == 5){
      let combination = [1,5]
      this.common.ballData = this.common.ballData.map((item,index) => {
        
         if(index == 0){
             let firstNum = Math.random()*1 > 0.5 ? 1 : 5
             //temp = this.tool.produceRandom(1)
             temp = this.tool.produceRandom(firstNum)
             combination.splice(combination.indexOf(firstNum),1)
             item.value = item.value.map((ele,index) => {
                 if(temp.indexOf(index) != -1){
                     return 1
                 }else{
                     return 0
                 }
             })
             return item
         }else{
             arr = this.tool.produceRandom(combination[0],temp)
             item.value = item.value.map((ele,index) => {
               if(arr.indexOf(index) != -1){
                   return 1
               }else{
                   return 0
               }
           })
             return item
         }
       })

    }else{
      this.common.ballData = this.common.ballData.map((item,index) => {
        
         if(index == 0){
             temp = this.tool.produceRandom(1)
             item.value = item.value.map((ele,index) => {
                 if(temp.indexOf(index) != -1){
                     return 1
                 }else{
                     return 0
                 }
             })
             return item
         }else{
             arr = this.tool.produceRandom(1,temp)
             item.value = item.value.map((ele,index) => {
               if(arr.indexOf(index) != -1){
                   return 1
               }else{
                   return 0
               }
           })
             return item
         }
       })
    }
   
    console.log('ewfwgwgwg')
    this.calculate()
  }

  calculate(){
    let tempData = this.getOriginData(),count = 0;
    if(tempData.first.length < 1 || tempData.second.length < 1)
       count = 0

    for(let i = 0;i<tempData.first.length;i++){
      let sichong = tempData.first[i]
      // 去掉重复的
      let data = this.tool.removeElement(tempData.second,sichong)
      if(data.length >= 1)
         count += this.tool.zuhe1(data.length,1)
     }

     this.common.count = count 
     let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
     this.common.betPrice = this.common.count*2*percent
  }

}
