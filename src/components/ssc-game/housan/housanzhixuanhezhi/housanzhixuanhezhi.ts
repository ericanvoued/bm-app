import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { ToolsProvider } from '../../../../providers/tools/tools'
import { UtilProvider } from '../../../../providers/util/util'
/**
 * Generated class for the HousanzhixuanhezhiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'housanzhixuanhezhi',
  templateUrl: 'housanzhixuanhezhi.html'
})
export class HousanzhixuanhezhiComponent {

  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider, public util:UtilProvider) {
    console.log('Hello HousanzhixuanhezhiComponent Component');
    this.text = 'Hello World';
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

    this.common.count = count 
    let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
    this.common.betPrice = this.common.count*2*percent
 }
}
