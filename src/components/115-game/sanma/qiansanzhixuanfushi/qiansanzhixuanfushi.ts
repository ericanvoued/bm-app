import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the QiansanzhixuanfushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qiansanzhixuanfushi',
  templateUrl: 'qiansanzhixuanfushi.html'
})
export class QiansanzhixuanfushiComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public tool:ToolsProvider,public basket:BasketDataProvider) {
    super(common,util,basket) 
    this.text = 'Hello World';
  }
 
  getOriginData():any{
    // let erchong = [], danhao = []
     let data = []
     this.common.ballData.forEach((ele,index) => {
            let temp = []
            ele.value.forEach((item,index1) => {
                if(item)
                   temp.push(index1 +1)
            })
            data.push(temp)
     })    
     return data
  }

  calculate(){
      let count = 1;
      console.log(this.getOriginData())
      console.log(this.tool.combination(this.getOriginData()))
      count = this.tool.checkCount(this.tool.combination(this.getOriginData()))
      this.common.count = count
      let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
      this.common.betPrice = this.common.count*2*percent 
  }  
}
