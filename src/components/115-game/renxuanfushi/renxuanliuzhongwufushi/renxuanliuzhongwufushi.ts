import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the RenxuanliuzhongwufushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'renxuanliuzhongwufushi',
  templateUrl: 'renxuanliuzhongwufushi.html'
})
export class RenxuanliuzhongwufushiComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public tool:ToolsProvider,public basket:BasketDataProvider) {
    super(common,util,basket) 
    console.log('Hello RenxuanliuzhongwufushiComponent Component');
    this.text = 'Hello World';
  }

  randomChoose(number?){
    if(number){
       let temp = this.tool.produceRandom5(6)
       this.common.ballData = this.common.ballData.map((item,index) => {
           item.value = item.value.map((ele,index) => temp.indexOf(index) != -1 ? 1 : 0)
           return item
       })
       this.calculate()
       this.basket.addBetData()
       if(number == 1) return
       this.randomChoose(--number)
    }else{
       let temp = this.tool.produceRandom5(6)
       this.common.ballData = this.common.ballData.map((item,index) => {
           item.value = item.value.map((ele,index) => temp.indexOf(index) != -1 ? 1 : 0)
           return item
       })
       this.calculate()
    }  
  }

  calculate(){
    let temp = this.common.ballData[0].value.filter(ele => ele == 1).length
    let count = temp  < 6 ? 0 : this.tool.zuhe1(temp,6)
    this.common.count = count
    let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
    this.common.betPrice = this.common.count*2*percent
 }
}
