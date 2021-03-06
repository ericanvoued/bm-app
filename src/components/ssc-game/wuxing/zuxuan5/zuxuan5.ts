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

  randomOneOrder(){
    let tempArr,arr;
    this.common.ballData = this.common.ballData.map((item,index) => {
      
       if(index == 0){
           tempArr = this.tool.produceRandom(1)
           item.value = item.value.map((ele,index) => {
               if(tempArr.indexOf(index) != -1){
                   return 1
               }else{
                   return 0
               }
           })
           return item
       }else{
           arr = this.tool.produceRandom(1,tempArr)
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
     this.calculate()
  }

  getCount(){
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
     return count
  }
}
