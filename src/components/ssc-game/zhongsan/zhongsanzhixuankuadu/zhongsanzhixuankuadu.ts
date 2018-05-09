import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { ToolsProvider } from '../../../../providers/tools/tools'
/**
 * Generated class for the ZhongsanzhixuankuaduComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zhongsanzhixuankuadu',
  templateUrl: 'zhongsanzhixuankuadu.html'
})
export class ZhongsanzhixuankuaduComponent {

  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider) {
    console.log('Hello ZhongsanzhixuankuaduComponent Component');
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

   getOriginData(){
    let arr = []
    this.common.ballData.forEach((ele,number) => {
         ele.value.forEach((item,index) => {
             if(item == 1)
                arr.push(index)
         })
    })
    return arr
 }

 calculate(){
  let count = 0
  this.getOriginData().forEach(element => {
       count += this.mathResult(element).length
  })
  this.common.count = count 
  let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
  this.common.betPrice = this.common.count*2*percent
}

//计算各种结果
mathResult(num){
  var me = this,
    i = 0,
    len,
    j = 0,
    k = 0,
    len2,
    result = [];
  
  for(;i < 10;i++){
    for(j= 0;j < 10;j++){
      for(k= 0;k < 10;k++){
        var numList = [i,j,k];
        let minNums = Math.min.apply(Math, numList);
        let maxNums = Math.max.apply(Math, numList);
        if(maxNums - minNums == num){
          result.push(numList);
        }
      }
    }
  }
  return result
}

}
