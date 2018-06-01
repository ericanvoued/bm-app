import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
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
export class ZhongsanteshuhaomaComponent {

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider){
    console.log('Hello ZhongsanteshuhaomaComponent Component');
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
