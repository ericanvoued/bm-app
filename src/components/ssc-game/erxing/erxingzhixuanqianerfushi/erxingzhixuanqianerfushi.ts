import { Component ,Input} from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
/**
 * Generated class for the ErxingzhixuanqianerfushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'erxingzhixuanqianerfushi',
  templateUrl: 'erxingzhixuanqianerfushi.html'
})
export class ErxingzhixuanqianerfushiComponent {
  @Input('choose') choose: any[] = [];
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider) {
    console.log('Hello ErxingzhixuanqianerfushiComponent Component');
    this.text = 'Hello World';
  }

  qqq(number){
    return number + 5
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
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
      let count = 1;
      this.common.ballData.forEach((item,index) => {
          count *=  item.value.filter(ele => ele == 1).length
      })
      this.common.count = count
      let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
      this.common.betPrice = this.common.count*2*percent
   }
}
