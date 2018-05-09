import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { ToolsProvider } from '../../../../providers/tools/tools'
import { UtilProvider } from '../../../../providers/util/util'
/**
 * Generated class for the ZhongsanzuxuanhezhiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zhongsanzuxuanhezhi',
  templateUrl: 'zhongsanzuxuanhezhi.html'
})
export class ZhongsanzuxuanhezhiComponent {

  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider, public util:UtilProvider) {
    console.log('Hello ZhongsanzuxuanhezhiComponent Component');
    this.text = 'Hello World';
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
