import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
/**
 * Generated class for the ErxingzhixuanqianerhezhiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'erxingzhixuanqianerhezhi',
  templateUrl: 'erxingzhixuanqianerhezhi.html'
})
export class ErxingzhixuanqianerhezhiComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket) 
    this.text = 'Hello World';
  }

  randomChoose(number?){
    if(number){
        let target = Math.floor(Math.random()*19)
        
        this.common.ballData = this.common.ballData.map((ele,index) => {
            ele.value = ele.value.map((item,index1) => {
                if(index*7 + index1 == target){
                    return 1
                }else{
                    return 0
                }
            })
            return ele
        })
        this.calculate()
        this.basket.addBetData()
        if(number == 1) return
        this.randomChoose(--number)
    }else{
        let target = Math.floor(Math.random()*19)
        
        this.common.ballData = this.common.ballData.map((ele,index) => {
            ele.value = ele.value.map((item,index1) => {
                if(index*7 + index1 == target){
                    return 1
                }else{
                    return 0
                }
            })
            return ele
        })
        this.calculate()
    }
   
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
         count += this.mathHezhiResult(item,0,9).length
    })

    this.common.count = count 
    let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
    this.common.betPrice = this.common.count*2*percent
 }

    mathHezhiResult(sum, nBegin, nEnd){
    var me = this,
        arr = [],
        checkArray = [],
        x,y;
        
    for (x=nBegin;x<=nEnd ;x++ ){
        for (y=nBegin;y<=nEnd ;y++ ){
            if(x+y==sum){
                arr.push([x,y])
            }
        }
    }
    return arr
  }
}
