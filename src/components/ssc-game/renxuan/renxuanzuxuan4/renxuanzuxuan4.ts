import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the Renxuanzuxuan4Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'renxuanzuxuan4',
  templateUrl: 'renxuanzuxuan4.html'
})
export class Renxuanzuxuan4Component extends commonMethod{
  choices:any[] = [{name:'万位',choose:false},{name:'千位',choose:true},{name:'百位',choose:true}, {name:'十位',choose:true},{ name:'个位', choose:true}]
  
  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider,public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)
    this.text = 'Hello World';
  }

  randomChoose(number?){
    if(number){
      let temp,arr;
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
      this.calculate()
      this.basket.addBetData()
      if(number == 1) return
      this.randomChoose(--number)
    }else{
      let temp,arr;
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
      this.calculate()
    }
   
  }

  calculate(){
    let tempData = this.getOriginData(),count = 0;
    if(tempData.first.length < 1 || tempData.second.length < 1)
       count = 0

    for(let i = 0;i<tempData.first.length;i++){
      let sanchong = tempData.first[i]
      // 去掉重复的
      let data = this.tool.removeElement(tempData.second,sanchong)
      if(data.length >= 1)
         count += this.tool.zuhe1(data.length,1)
     }

     let total = this.choices.filter(ele => ele.choose).length
     this.common.count = count*this.tool.zuhe1(total,4)
     let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
     this.common.betPrice = this.common.count*2*percent
  }
}