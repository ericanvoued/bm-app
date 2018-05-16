import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'

import { ToolsProvider } from '../../../../providers/tools/tools'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
/**
 * Generated class for the Zuxuan12Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zuxuan12',
  templateUrl: 'zuxuan12.html'
})
export class Zuxuan12Component extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public tool:ToolsProvider, public basket:BasketDataProvider) {
    super(common,util,basket) 
    console.log('Hello Zuxuan12Component Component');
    this.text = 'Hello World';
  }

  qqq(number){
    return number + 5
}

randomChoose(number?){
  if(number){
      let temp,arr;
        this.common.ballData = this.common.ballData.map((item,index) => {
        
            if(index == 0){
                temp = this.tool.produceRandom(1)
                item.value = item.value.map((ele,index) => {
                    if(temp.indexOf(index) != -1){
                        return 1
                    }else{
                        return 0
                    }
                })

                return item
            }else{
                arr = this.tool.produceRandom(2,temp)
                item.value = item.value.map((ele,index) => {
                if(arr.indexOf(index) != -1){
                    return 1
                }else{
                    return 0
                }
            })
                return item
            }
        })
        this.calculate()
        this.basket.addBetData()
        if(number == 1) return
        this.randomChoose(--number)
  }else{
     let temp,arr;
        this.common.ballData = this.common.ballData.map((item,index) => {
        
            if(index == 0){
                temp = this.tool.produceRandom(1)
                item.value = item.value.map((ele,index) => {
                    if(temp.indexOf(index) != -1){
                        return 1
                    }else{
                        return 0
                    }
                })

                return item
            }else{
                arr = this.tool.produceRandom(2,temp)
                item.value = item.value.map((ele,index) => {
                if(arr.indexOf(index) != -1){
                    return 1
                }else{
                    return 0
                }
            })
                return item
            }
        })
        this.calculate()
  }  
}

 calculate(){
    console.log(this.getOriginData())
    let tempData = this.getOriginData(),count = 0;
    if(tempData.first.length < 1 || tempData.second.length < 2)
        count = 0

    for(let i = 0;i<tempData.first.length;i++){
        let erchong = tempData.first[i]
        // 去掉重复的
        let data = this.tool.removeElement(tempData.second,erchong)
        if(data.length >= 2)
            count += this.tool.zuhe1(data.length,2)
    }

    this.common.count = count 
    let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
    this.common.betPrice = this.common.count*2*percent
}
 
}
