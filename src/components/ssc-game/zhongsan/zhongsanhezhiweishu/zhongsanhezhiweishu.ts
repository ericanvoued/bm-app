import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { ToolsProvider } from '../../../../providers/tools/tools'
/**
 * Generated class for the ZhongsanhezhiweishuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zhongsanhezhiweishu',
  templateUrl: 'zhongsanhezhiweishu.html'
})
export class ZhongsanhezhiweishuComponent {

  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider){
    console.log('Hello ZhongsanhezhiweishuComponent Component');
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
    let count = 0
    this.common.ballData[0].value.forEach(item => {
         if(item)
            count++
    })

    this.common.count = count 
    let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
    this.common.betPrice = this.common.count*2*percent
 }
 
}
