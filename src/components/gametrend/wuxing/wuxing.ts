import {Component, ViewChild,Output, EventEmitter,OnInit } from '@angular/core';
import { UtilProvider } from '../../../providers/util/util'

import { CommonProvider } from "../../../providers/common/common";
import { Slides } from 'ionic-angular';

/**
 * Generated class for the WuxingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wuxing',
  templateUrl: 'wuxing.html'
})
export class WuxingComponent implements OnInit {
  @ViewChild('contentSlides') contentSlides: Slides;

   menus:string[];
  
   choose:string = '开奖';

   chooseIndex:number;
 
   historyRecord: any;

   position:any;
 
   load:boolean = false;
 
   kaijiangData:any[];
  
   finish:boolean = false

   text: string;

   zhixuan:boolean;

  constructor(public common:CommonProvider,public util:UtilProvider) {
    console.log('Hello WuxingComponent Component');
    console.log(this.common.historyList)
    
    this.historyRecord = this.util.historyNumbers.slice(0,11)
   
  }

  ngOnInit(){
    console.log(this.chooseIndex)
    console.log(this.position)
    this.contentSlides.initialSlide = this.chooseIndex
    this.choose = this.menus[this.chooseIndex]
    this.getKaijiang()
  }

   //huoqu kaijiang
   getKaijiang(){
      console.log(this.common.method)
      if(this.common.method == '五星' || this.common.method == '一星' || this.common.method == '任选'){
            this.kaijiangData = this.historyRecord.map((ele,index) => {
              let sum = ele.history.reduce((l,r) => l+r)
              let max = Math.max(...ele.history)
              let min = Math.min(...ele.history)
              let gap = max - min
              let da = ele.history.filter(el => el >= 5).length
              let daxiao = da + ':' + (5 - da)
              let odd = ele.history.filter(el => el%2 != 0).length
              let oddeven = odd + ':' + (5 -odd)
              return {...ele, sum,gap, daxiao, oddeven}
            })
            return 
      }

      switch(this.common.method){
          case "四星":
                this.kaijiangData = this.historyRecord.map((ele,index) => {
                  let qian = this.judgeKind(ele.history[1])
                  let bai = this.judgeKind(ele.history[2])
                  let shi = this.judgeKind(ele.history[3])
                  let ge = this.judgeKind(ele.history[4])
                  return {...ele, qian,bai,shi,ge}   

                })
                break
           case "前三":
                this.kaijiangData = this.historyRecord.map((ele,index) => {
                  let wan = this.judgeKind(ele.history[0])
                  let qian = this.judgeKind(ele.history[1])
                  let bai = this.judgeKind(ele.history[2])
                  let zu = this.tellZu(ele.history.slice(0,3))
                  return {...ele, wan,qian,bai,zu}   
                 })      
                 break  
            case "中三":   
                  this.kaijiangData = this.historyRecord.map((ele,index) => {
                    let qian = this.judgeKind(ele.history[1])
                    let bai = this.judgeKind(ele.history[2])
                    let shi = this.judgeKind(ele.history[3])
                    let zu = this.tellZu(ele.history.slice(1,4))
                    return {...ele,qian,bai,shi,zu}   
                  })      
                  break 
            case "后三":   
                  this.kaijiangData = this.historyRecord.map((ele,index) => {
                    let bai = this.judgeKind(ele.history[2])
                    let shi = this.judgeKind(ele.history[3])
                    let ge = this.judgeKind(ele.history[4])
                    let zu = this.tellZu(ele.history.slice(2,5))
                    return {...ele,bai,shi,ge,zu}   
                  })      
                  break    
                  
            case "二星":
                  if(this.common.smallMethod == '前二复式'){
                      this.kaijiangData = this.historyRecord.map((ele,index) => {
                        let wan = this.judgeKind(ele.history[0])
                        let qian = this.judgeKind(ele.history[1])
                        return {...ele,wan,qian}   
                      })      
                      break    
                  }else if(this.common.smallMethod == '后二复式'){
                      this.kaijiangData = this.historyRecord.map((ele,index) => {
                        let shi = this.judgeKind(ele.history[3])
                        let ge = this.judgeKind(ele.history[4])
                        return {...ele,shi,ge}   
                      })      
                      break    
                  }      
         }

         //console.log(this.kaijiangData)
     }


     tellZu(balls){
        let temp = []
        for(let i = 0;i<balls.length;i++){
            if(temp.indexOf(balls[i]) != -1)
                return '组三'
            temp.push(balls[i])
        }    
        return '组六'
    }

     judgeKind(number){
      if(number%2 == 0 && number >=5)
          return '大双'
      if(number%2 == 0 && number < 5)
          return '小双'
      if(number%2 != 0 && number >= 5)
          return '大单'
      if(number%2 != 0 && number < 5)
          return '小单'
      }

  ionChange($event){
     console.log('wcnmb')
     console.log($event.value)
     this.contentSlides.slideTo(this.menus.indexOf($event.value))
  }
   
  slideChanged(){
      let index = this.contentSlides.getActiveIndex()
      this.choose = this.menus[index]
  }

  doInfinite(infiniteScroll){

  }

  existNumber(arr){
     return arr.filter(ele => ele == 1).length ? true : false
  }

  existZuxuan(){
     let data = this.common.componentRef.instance.getCommonData(),flag = false;
     data.forEach(ele => {
          if(ele.length){
               flag = true
               return flag
          }
             
     })
     return flag
  }

  toggle(row,column){
     console.log(this.common.componentRef)
     //this.ssc.changeToggle(row,column)
     this.common.componentRef.instance.changeToggle(row,column)
     //this.ssc.wuxingfushi()
  }

  processName(name){
     let temp;
     switch(name) {
       case 'erchonghao':
            return '二重号';
       case 'danhao':
            return '单号';
       case 'sanchonghao':
            return '三重号';
       case 'sichonghao':
            return '四重号';                       
     }
  }
}
