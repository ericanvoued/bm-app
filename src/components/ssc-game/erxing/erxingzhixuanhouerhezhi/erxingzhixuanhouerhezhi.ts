import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
/**
 * Generated class for the ErxingzhixuanhouerhezhiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'erxingzhixuanhouerhezhi',
  templateUrl: 'erxingzhixuanhouerhezhi.html'
})
export class ErxingzhixuanhouerhezhiComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket) 
    this.common.ballData = [
        {"key":"选号", "value":[0,0,0,0,0,0,0]},
        {"key":"选号", "value":[0,0,0,0,0,0,0]},
        {"key":"选号", "value":[0,0,0,0,0,0,0]}
      ]
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

   getLotteryText(){
    let arr = []
    this.getCommonData().forEach((ele,index) => ele.forEach((item,index1) => arr.push(('0' + (index*7 + item)).slice(-2) + ' ')))
    console.log(arr)
    return arr.join('| ')
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

   changeAll(line){  
    this.common.ballData = this.common.ballData.map((item,index) => {
        item.value = item.value.map(ele => 1)
        return item      
    })      
  }

 changeOdd(line){
     this.common.ballData = this.common.ballData.map((ele,index) => {
          ele.value = ele.value.map((item,index1) => {
              return (index*7 + index1) % 2 && (index*7 + index1) <= 18? 1:0 
          })
          return ele
     })
 }

 changeEven(line){
      this.common.ballData = this.common.ballData.map((ele,index) => {
          ele.value = ele.value.map((item,index1) => {
              return (index*7 + index1) % 2 && (index*7 + index1) <= 18? 0:1 
          })
          return ele
      })      
 }

 changeBig(line){
    
      this.common.ballData = this.common.ballData.map((item,index) => {
          item.value = item.value.map((ele,index2) => {
              let temp = index*7 + index2 > 9 && (index*7 + index2) <= 18 ? 1 : 0
              return temp
          })
          return item
      })
  }

  changeSmall(line){
  
      this.common.ballData = this.common.ballData.map((item,index) => {
          item.value = item.value.map((ele,index2) => {
              let temp = index*7 + index2 <= 9 ? 1 : 0
              return temp
          })
          return item
      })
  }

  changeClear(line){
      this.common.ballData = this.common.ballData.map((item,index) => {
          item.value = item.value.map(ele => 0)
          return item            
      })
  }

  changeChooseStatus(index1,index2){   
      this.common.singleBtn = this.common.singleBtn.map((item,index) => {
              if(index2 == index)
               return {...item, flag:true}
              else
               return {...item, flag:false}   
      })
      console.log(this.common.singleBtn)        
  }
  
}
