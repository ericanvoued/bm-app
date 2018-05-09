import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'
/**
 * Generated class for the QisanzhixuanzuheComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qisanzhixuanzuhe',
  templateUrl: 'qisanzhixuanzuhe.html'
})
export class QisanzhixuanzuheComponent {

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider, public tool:ToolsProvider) {
    console.log('Hello QisanzhixuanzuheComponent Component');
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

  calculate(){
    let flag = this.common.ballData.every(item => {
      return item.value.some(ele => ele == 1)
    }), count = 3
    
    if(flag){
      this.common.ballData.forEach(item => {
            count *= item.value.filter(ele => ele == 1).length
      })
    }else{
      count = 0
    }

    this.common.count = count
    let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
    this.common.betPrice = this.common.count*2*percent
  }
}
