import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
/**
 * Generated class for the HousanteshuhaomaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'housanteshuhaoma',
  templateUrl: 'housanteshuhaoma.html'
})
export class HousanteshuhaomaComponent {

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider){
    console.log('Hello HousanteshuhaomaComponent Component');
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
     //this.calculate()
   }

}
