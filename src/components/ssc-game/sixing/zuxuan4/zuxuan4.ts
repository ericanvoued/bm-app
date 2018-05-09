import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { ToolsProvider } from '../../../../providers/tools/tools'
/**
 * Generated class for the Zuxuan4Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zuxuan4',
  templateUrl: 'zuxuan4.html'
})
export class Zuxuan4Component {

  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider) {
    console.log('Hello Zuxuan4Component Component');
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
  let sanchong = [], danhao = []
  this.common.ballData.forEach((ele,index) => {
      if(index == 0){
          ele.value.forEach((item,index) => {
              if(item)
                sanchong.push(index)
          })
      }else{
          ele.value.forEach((item,index) => {
              if(item)
                danhao.push(index)
          })
      }
  })
  return {sanchong, danhao}
}

 calculate(){
    console.log(this.getOriginData())
    let tempData = this.getOriginData(),count = 0;
    if(tempData.sanchong.length < 1 || tempData.danhao.length < 1)
      count = 0
  

    for(let i = 0;i<tempData.sanchong.length;i++){
      let sanchong = tempData.sanchong[i]
      // 去掉重复的
      let data = this.tool.removeElement(tempData.danhao,sanchong)
      if(data.length >= 1)
        count += this.tool.zuhe1(data.length,1)
    }

    this.common.count = count 
    let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
    this.common.betPrice = this.common.count*2*percent
 }
}
