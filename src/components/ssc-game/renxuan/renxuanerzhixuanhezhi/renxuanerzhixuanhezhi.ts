import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the RenxuanerzhixuanhezhiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'renxuanerzhixuanhezhi',
  templateUrl: 'renxuanerzhixuanhezhi.html'
})
export class RenxuanerzhixuanhezhiComponent extends commonMethod{
  choices:any[] = [{name:'万位',choose:false},{name:'千位',choose:false},{name:'百位',choose:false}, {name:'十位',choose:true},{ name:'个位', choose:true}]
  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider,public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)
    console.log('Hello RenxuanerzhixuanhezhiComponent Component');
    this.common.ballData = [
      {"key":"选号", "value":[0,0,0,0,0,0,0]},
      {"key":"选号", "value":[0,0,0,0,0,0,0]},
      {"key":"选号", "value":[0,0,0,0,0,0,0]}
      ]
    }

    randomChoose(number?){
      if(number){
          let target = Math.floor(Math.random()*19)
          this.common.ballData = this.common.ballData.map((ele,index) => {
              ele.value = ele.value.map((item,index1) => {
                  if(index*7 + index1 == target){
                      return 1
                  }else{
                      return 0
                  }
              })
              return ele
          })
          this.calculate()
          this.basket.addBetData()
          if(number == 1) return
          this.randomChoose(--number)
      }else{
          let target = Math.floor(Math.random()*19)
          
          this.common.ballData = this.common.ballData.map((ele,index) => {
              ele.value = ele.value.map((item,index1) => {
                  if(index*7 + index1 == target){
                      return 1
                  }else{
                      return 0
                  }
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
          count += this.mathResult(item,0,9).length
      })

      let total = this.choices.filter(ele => ele.choose).length
      this.common.count = count*this.tool.zuhe1(total,2)
      let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
      this.common.betPrice = this.common.count*2*percent
   }

}