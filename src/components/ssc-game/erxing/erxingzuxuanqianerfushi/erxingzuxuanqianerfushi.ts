import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

/**
 * Generated class for the ErxingzuxuanqianerfushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'erxingzuxuanqianerfushi',
  templateUrl: 'erxingzuxuanqianerfushi.html'
})
export class ErxingzuxuanqianerfushiComponent {

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider, public tool:ToolsProvider) {
    console.log('Hello ErxingzuxuanqianerfushiComponent Component');
    this.text = 'Hello World';
  }

  qqq(number){
    return number + 5
  }

  changeToggle(row,column){
    console.log('wwww')
    if(column!=null){
       this.common.ballData = this.common.ballData.map((item,index) => {
          if(index == row){
              item.value = item.value.map((ele,index) => {
                  if(index == column){
                      return ele == 1 ? 0 : 1
                  }else{
                      return ele
                  }
              })
              return item
          }else{
              return item
          }
      })
    }
     this.calculate()
   }

   getOriginData(){
      let arr = []
      this.common.ballData.forEach((ele,number) => {
           ele.value.forEach((item,index) => {
               if(item == 1)
                  arr.push(item)
           })
      })
      return arr
   }

   calculate(){
      let length = this.getOriginData().filter(ele => ele == 1).length,count;
      console.log(length)
      if(length >= 2){
         count = this.tool.zuhe1(length,2)
         console.log(count)
      }else{
         count = 0
      }
      this.common.count = count 
      let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
      this.common.betPrice = this.common.count*2*percent
   }


}
