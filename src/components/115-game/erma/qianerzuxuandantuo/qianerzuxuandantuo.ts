import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the QianerzuxuandantuoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qianerzuxuandantuo',
  templateUrl: 'qianerzuxuandantuo.html'
})
export class QianerzuxuandantuoComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public tool:ToolsProvider,public basket:BasketDataProvider) {
    super(common,util,basket)     
    
    console.log('Hello QianerzuxuandantuoComponent Component');
    this.text = 'Hello World';
  }

  randomChoose(number?){
    let temp,arr;
    this.common.ballData = this.common.ballData.map((item,index) => {
     
      if(index == 0){
          temp = this.tool.produceRandom5(1)
          item.value = item.value.map((ele,index) => {
              if(temp.indexOf(index) != -1){               
                  return 1
              }else{
                  return 0
              }
          })
          return item
      }else{
          arr = this.tool.produceRandom5(1,temp)
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
   // this.calculate()
  }
}
