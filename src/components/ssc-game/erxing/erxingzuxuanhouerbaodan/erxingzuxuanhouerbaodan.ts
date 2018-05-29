import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { ToolsProvider } from '../../../../providers/tools/tools'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
/**
 * Generated class for the ErxingzuxuanhouerbaodanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'erxingzuxuanhouerbaodan',
  templateUrl: 'erxingzuxuanhouerbaodan.html'
})
export class ErxingzuxuanhouerbaodanComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider, public util:UtilProvider,public basket:BasketDataProvider){
    super(common,util,basket)
    this.text = 'Hello World';
  }

  qqq(number){
    return number + 5
  }

   calculate(){
    let count = 0;
    this.common.ballData[0].value.forEach((item,index) => {
        if(item){
          console.log(this.mathResult(index,0,9))
          count += this.mathResult(index,0,9).length
        }
          
    })
    this.common.count = count
    let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
    this.common.betPrice = this.common.count*2*percent
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

 //检测结果重复
  checkResult(data, array){
    //检查重复
    for (var i = array.length - 1; i >= 0; i--) {
      if(array[i].join('') == data){
        return false;
      }
    };
    return true;
  }
  
  //计算各种结果
  mathResult(sum, nBegin, nEnd){
    var me = this,
      arr = [],
      checkArray = [],
      x,y,z;
      
    for (x=nBegin;x<=nEnd ;x++ ){
      for (y=nBegin;y<=nEnd ;y++ ){
           if(x == sum && me.arrIndexOf(x, [x,y]) != 2
          || y == sum && me.arrIndexOf(x, [x,y]) != 2){
             var postArray = [x,y,z].sort(function(a, b){
              return a-b;
            })
            if(me.checkResult(postArray.join(''), checkArray)){
              checkArray.push(postArray)
              arr.push([x,y]);
            }
          }
      }
    }
    return arr
  }
}
