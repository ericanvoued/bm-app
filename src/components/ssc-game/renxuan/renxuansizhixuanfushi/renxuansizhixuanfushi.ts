import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'
import * as $ from 'jquery'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the RenxuansizhixuanfushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'renxuansizhixuanfushi',
  templateUrl: 'renxuansizhixuanfushi.html'
})
export class RenxuansizhixuanfushiComponent extends commonMethod{
  @Input('choose') choose: any[] = [];
  
  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider,public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)
    this.text = 'Hello World';
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

  randomChoose(number?){
    if(number){
       let arr = this.createRandom(4)
       this.common.ballData = this.common.ballData.map((item,index) => {
   
           item.value = item.value.map((ele,index1) => arr.filter(detail => detail[0] == index && detail[1] == index1).length > 0 ? 1 : 0)
           return item
       })
       this.calculate()
       this.basket.addBetData()
       if(number == 1) return
       this.randomChoose(--number)
    }else{
       let arr = this.createRandom(4)
       console.log(arr)
       this.common.ballData = this.common.ballData.map((item,index) => {
           item.value = item.value.map((ele,index1) => arr.filter(detail => detail[0] == index && detail[1] == index1).length > 0 ? 1 : 0)
           return item
       })
       this.calculate()
    } 
  }

  calculate(){
    let originData = this.getCommonData(),tempArr,count = 0, self = this
    $.each(originData, function(i){
      $.each(originData, function(j){
        $.each(originData, function(k){
          $.each(originData, function(l){
            if(i < j && j < k && i < l && j < l && k < l){
              //console.log(i, j, k);
              tempArr = [];
              tempArr.push(originData[i]);
              tempArr.push(originData[j]);
              tempArr.push(originData[k]);
              tempArr.push(originData[l]);
              count += self.tool.combination(tempArr).length
          }
        })
      })
    })
  })
  
    this.common.count = count 
    let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
    this.common.betPrice = this.common.count*2*percent
 }
}
