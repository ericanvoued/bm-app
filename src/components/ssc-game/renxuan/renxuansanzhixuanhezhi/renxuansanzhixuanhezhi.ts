import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'
import * as $ from 'jquery'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the RenxuansanzhixuanhezhiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'renxuansanzhixuanhezhi',
  templateUrl: 'renxuansanzhixuanhezhi.html'
})
export class RenxuansanzhixuanhezhiComponent extends commonMethod{
  choices:any[] = [{name:'万位',choose:false},{name:'千位',choose:false},{name:'百位',choose:true}, {name:'十位',choose:true},{ name:'个位', choose:true}]
  
  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider,public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)
    this.common.ballData = [
      {"key":"千", "value":[0,0,0,0,0,0,0]},
      {"key":"百", "value":[0,0,0,0,0,0,0]},
      {"key":"十", "value":[0,0,0,0,0,0,0]
      },{"key":"十", "value":[0,0,0,0,0,0,0]
      }
    ]
  }

  randomChoose(number?){
    if(number){
        let arr = [Math.floor(Math.random()*4),Math.floor(Math.random()*7)]
        console.log(arr)
        this.common.ballData = this.common.ballData.map((ele,index) => {
            ele.value = ele.value.map((item,index1) => {
                if(index == arr[0] && index1 == arr[1])
                    return 1
                else
                    return 0   
            })
            return ele
        })
        this.calculate()
        this.basket.addBetData()
        if(number == 1) return
        this.randomChoose(--number)
    }else{
       let arr = [Math.floor(Math.random()*4),Math.floor(Math.random()*7)]
       console.log(arr)
       this.common.ballData = this.common.ballData.map((ele,index) => {
           ele.value = ele.value.map((item,index1) => {
               if(index == arr[0] && index1 == arr[1])
                  return 1
               else
                  return 0   
           })
           return ele
       })
       this.calculate()
    }  
  }

  getOriginData(){
    let arr = []
    this.common.ballData.forEach((ele,number) => {
         ele.value.forEach((item,index) => {
             if(item == 1)
                arr.push(number*7 + index)
         })
    })
    return arr
 }

 calculate(){
    let count = 0
    this.getOriginData().forEach(item => {
         count += this.util.mathHezhiResult(item,0,9).length
    })
    
    let total = this.choices.filter(ele => ele.choose).length
    this.common.count = count*this.tool.zuhe1(total,3)
    let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
    this.common.betPrice = this.common.count*2*percent
 }

}
