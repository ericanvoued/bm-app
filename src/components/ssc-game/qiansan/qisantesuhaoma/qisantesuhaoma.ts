import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
/**
 * Generated class for the QisantesuhaomaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qisantesuhaoma',
  templateUrl: 'qisantesuhaoma.html'
})
export class QisantesuhaomaComponent {

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider) {
    console.log('Hello QisantesuhaomaComponent Component');
    this.text = 'Hello World';
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
                      if(ele)
                         return 0
                      else
                         return 1 
                  }else{
                      return 0
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
