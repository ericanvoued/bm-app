import {Component, ViewChild,Output, EventEmitter,OnInit } from '@angular/core';
import { UtilProvider } from '../../../providers/util/util'

import { CommonProvider } from "../../../providers/common/common";
import { Slides } from 'ionic-angular';

/**
 * Generated class for the KuadutrendComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'kuadutrend',
  templateUrl: 'kuadutrend.html'
})
export class KuadutrendComponent {
    @ViewChild('contentSlides') contentSlides: Slides;
    menus:string[];
    choose:string = '开奖';
    
    text: string;
    historyRecord: any;
    load:boolean = false;

    //记录号码走势
    trendData:any[];

    //记录跨度走势
    kuaDuData:any[];

    //位置记录
    position:any;

    chooseIndex:number;

    kaijiangData:any[];

    constructor(public common:CommonProvider,public util:UtilProvider) {
      console.log('Hello KuadutrendComponent Component');
      this.historyRecord = this.util.historyNumbers.slice(0,11)
    }

    ngOnInit(){
      console.log(this.chooseIndex)
      console.log(this.position)
      this.contentSlides.initialSlide = this.chooseIndex
      this.choose = this.menus[this.chooseIndex]
      this.getKaijiang()
      this.getNumberTrend()
      this.getKuaduData()
    }

      getKaijiang(){
        switch(this.common.method){
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
         }
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


      getNumberTrend(){
        // let asd = [[3,4,5],[5,6,7],[2,2,3],[4,5,6],[5,5,8],[7,8,9],[1,3,7],[2,4,6],[4,5,9],[5,7,8],[3,6,9]]
        let asd = [],totals = []
        this.historyRecord.forEach(ele => {
              let temp = []
              temp.push(...ele.history.slice(this.position[0],this.position[1]))
              asd.push(temp)
        })

        function check(arr,num){
          let total = 0
          for(let i =0;i<arr.length;i++){
                if(arr[i] == num)
                  total++
          }
          return total
        }

        for(let i =0;i<asd.length;i++){
            let arr:any[] = []
            for(let j =0;j<=9;j++){
                if(check(asd[i],j)){
                  arr.push({number:j,choose:check(asd[i],j)})
                }else{
                  if(i == 0 ){
                        arr.push({number:1,choose:0})
                    }else{
                        if(totals[i-1][j].choose > 0){
                            arr.push({number:1,choose:0})
                        }else{
                            arr.push({number:totals[i-1][j].number + 1, choose:0})
                        }
                    }
                }
            }   
          //arr.unshift({number:('00' + i).slice(-2) + '期'})
          totals.push(arr)
        }

        for(let i =0;i<totals.length;i++){
            totals[i].unshift({number:('00' + i).slice(-2) + '期'})
        }
        console.log(totals)
        this.trendData = totals
        this.getComplexData(this.trendData)
        }

        getComplexData(data){
          
        }

        getKuaduData(){
          let asd = [], totals = []
          this.historyRecord.forEach(ele => {
                let tempArr = ele.history.slice(this.position[0],this.position[1])
                asd.push(Math.max(...tempArr) - Math.min(...tempArr))
          })

          for(let i =0;i<asd.length;i++){
            let arr:any[] = []
            for(let j =0;j<=9;j++){
                if(j == asd[i]){
                  arr.push({number:j,choose:true})
                }else{
                  if(i == 0 ){
                        arr.push({number:1,choose:false})
                    }else{
                        if(totals[i-1][j].choose ){
                            arr.push({number:1,choose:false})
                        }else{
                            arr.push({number:totals[i-1][j].number + 1, choose:false})
                        }      
                      }
                }
        }   
          //arr.unshift({number:('00' + i).slice(-2) + '期'})
          totals.push(arr)
        }

        for(let i =0;i<totals.length;i++){
            totals[i].unshift({number:('00' + i).slice(-2) + '期'})
        }
        console.log(totals)
           this.kuaDuData = totals
        }

        ionChange($event){
          console.log($event.value)
          this.contentSlides.slideTo(this.menus.indexOf($event.value))
       }

        slideChanged(){
          let index = this.contentSlides.getActiveIndex()
          this.choose = this.menus[index]
      }
}
