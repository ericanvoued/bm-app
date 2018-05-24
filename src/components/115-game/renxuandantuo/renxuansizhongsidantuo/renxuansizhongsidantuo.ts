import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the RenxuansizhongsidantuoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'renxuansizhongsidantuo',
  templateUrl: 'renxuansizhongsidantuo.html'
})
export class RenxuansizhongsidantuoComponent extends commonMethod{
  arr:any = []
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public tool:ToolsProvider,public basket:BasketDataProvider) {
    super(common,util,basket)   
    console.log('Hello RenxuansizhongsidantuoComponent Component');
    this.text = 'Hello World';
  }

  randomChoose(number?){
    let temp,arr;
    this.common.ballData = this.common.ballData.map((item,index) => {
     
      if(index == 0){
          this.arr = []
          temp = this.tool.produceRandom5(1 + Math.floor(Math.random()*3)) 
          this.arr.push(...temp)
          item.value = item.value.map((ele,index) => {
              if(temp.indexOf(index) != -1){
                  
                  return 1
              }else{
                  return 0
              }
          })
          return item
      }else{
          arr = this.tool.produceRandom5(4 - temp.length,temp)
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

  changeToggle(row,column){
    if(row == 0) {
       if(this.common.ballData[row].value[column]){
           this.arr.splice(this.arr.indexOf(column),1)
       }else{
           if(this.arr.length == 3)
              this.arr.pop()
           this.arr.push(column)
       }
    }else{
       if(this.common.ballData[0].value[column])
           this.arr.splice(this.arr.indexOf(column),1)
    }
   
    this.common.ballData = this.common.ballData.map((item,index1) => {
        if(index1 == row){
            if(row == 0){
              item.value = item.value.map((ele,index2) => {
                
                if(this.arr.indexOf(index2) != -1){
                    return 1
                }else{
                    return 0
                }
              })
            }else{
              item.value = item.value.map((ele,index2) => {
                
                if(index2 == column){
                   return ele == 1 ? 0 : 1
                }else{
                    return ele
                }
               })
             }

           return item
        }else{         
            item.value = item.value.map((ele,index2) => {
              
              if(index2 == column){
                  return ele == 1 ? 0 : ele
              }else{
                  return ele
              }
            })
          
            return item
        }
      })
      this.calculate()
  } 

  getOriginData():any{
    // let erchong = [], danhao = []
     let first = [], second = []
     this.common.ballData.forEach((ele,index) => {
          if(index == 0){
             ele.value.forEach((item,index) => {
                 if(item)
                   first.push(index)
             })
          }else{
             ele.value.forEach((item,index) => {
                 if(item)
                   second.push(index)
              })
          }
     })
     return {first, second}
  }

  calculate(){
    let count = 0;
    let data = this.getOriginData()

    if(data.first.length == 1){
       count = data.second.length < 3 ? 0 : this.tool.zuhe1(data.second.length,3)
    }else if(data.first.length == 2){
       count = data.second.length < 2 ? 0 : this.tool.zuhe1(data.second.length,2)  
    }else if(data.first.length == 3){
       count =  data.second.length
    }
    this.common.count = count
    let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
    this.common.betPrice = this.common.count*2*percent
  }
}
