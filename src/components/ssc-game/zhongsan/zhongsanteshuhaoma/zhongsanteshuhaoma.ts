import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
/**
 * Generated class for the ZhongsanteshuhaomaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zhongsanteshuhaoma',
  templateUrl: 'zhongsanteshuhaoma.html'
})
export class ZhongsanteshuhaomaComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider, public tool:ToolsProvider,public basket:BasketDataProvider) {
    super(common,util,basket) 
    this.common.ballData = [
        {"key":"特殊号码", "value":[0,0,0]}             
      ]
  }

  qqq(i){
    switch(i){
       case 0:
           return '豹子'
       case 1:
           return '顺子'
       case 2:
           return '对子'        
    }
  }

  getLotteryText(){ 
    return this.getCommonData()[0].join('')
   }

  getCount(){
    let count = 0
    this.common.ballData[0].value.forEach(item => {
         if(item)
            count++
    })
    return count
  }

  getOriginLotteryText(){
    return this.getCommonData().map(ele => ele.map(item => this.qqq(item) + ' ').join('')).join('| ')
  }

}
