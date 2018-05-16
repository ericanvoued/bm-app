import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { ToolsProvider } from '../../../../providers/tools/tools'
/**
 * Generated class for the HousanhezhiweishuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'housanhezhiweishu',
  templateUrl: 'housanhezhiweishu.html'
})
export class HousanhezhiweishuComponent {

  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider) {
    console.log('Hello HousanhezhiweishuComponent Component');
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
   // this.calculate()
 } 


}
