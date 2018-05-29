import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the HousanzuxuanhezhiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'housanzuxuanhezhi',
  templateUrl: 'housanzuxuanhezhi.html'
})
export class HousanzuxuanhezhiComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket) 
    this.common.ballData = [
        {"key":"千", "value":[0,0,0,0,0,0,0]},
        {"key":"百", "value":[0,0,0,0,0,0,0]},
        {"key":"十", "value":[0,0,0,0,0,0,0]
        },{"key":"十", "value":[0,0,0,0,0,0,0]
        }
      ]
    this.text = 'Hello World';
  }

  randomChoose(number?){
    if(number){
         let target = Math.floor(Math.random()*26)
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
         let target = Math.floor(Math.random()*26)
         
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
                arr.push(number*7 + index + 1)
         })
    })
    return arr
 }

 calculate(){
    let count = 0
    this.getOriginData().forEach(item => {
        count += this.mathResult(item,0,9).length
    })

    this.common.count = count 
    let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
    this.common.betPrice = this.common.count*2*percent
 }


 checkResult(data, array){
  //检查重复
  for (var i = array.length - 1; i >= 0; i--) {
      if(array[i].join('') == data){
          return false;
      }
  };
  return true;
}

arrIndexOf(value, arr) {
  var r = 0;
  for (var s = 0; s < arr.length; s++) {
      if (arr[s] == value) {
          r += 1;
      }
  }
  return r || -1;
} 


mathResult(sum, nBegin, nEnd){
  var me = this,
      arr = [],
      checkArray = [],
      x,y,z;
      
  for (x=nBegin;x<=nEnd ;x++ ){
      for (y=nBegin;y<=nEnd ;y++ ){
          for (z=nBegin;z<=nEnd ;z++ ){
              if(x+y+z==sum && me.arrIndexOf(x, [x,y,z]) != 3){
                  var postArray = [x,y,z].sort(function(a, b){
                      return a-b;
                  });
                  if(me.checkResult(postArray.join(''), checkArray)){
                      checkArray.push(postArray)
                      arr.push([x,y,z]);
                  }
              }
          }
      }
  }
  return arr
}
}