import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the QiansanzuxuanfushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qiansanzuxuanfushi',
  templateUrl: 'qiansanzuxuanfushi.html'
})
export class QiansanzuxuanfushiComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public tool:ToolsProvider,public basket:BasketDataProvider) {
    super(common,util,basket)     
    console.log('Hello QiansanzuxuanfushiComponent Component');
    this.text = 'Hello World';
  }

  randomChoose(number?){
    if(number){
      this.common.ballData = this.common.ballData.map((item,index) => {
      let temp = this.tool.produceRandom5(3)
      if(index == 0){
        item.value = item.value.map((ele,index) => {
            if(temp.indexOf(index) != -1){
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
        this.common.ballData = this.common.ballData.map((item,index) => {
        let temp = this.tool.produceRandom5(3)
        if(index == 0){
          item.value = item.value.map((ele,index) => {
              if(temp.indexOf(index) != -1){
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
    let count = 0;
    this.common.ballData[0].value.forEach(ele => {
         if(ele == 1)
            count++
    })
  
    this.common.count = count < 3 ? 0 : this.tool.zuhe1(count,3)
    let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
    this.common.betPrice = this.common.count*2*percent
  }

}
