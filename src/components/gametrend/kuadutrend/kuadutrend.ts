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

    kaijiangData:any[];

    //记录号码走势
    trendData:any[];

    //记录跨度走势
    kuaDuData:any[];

    //冷热号码走势
    lengreData:any[]

    //平均 最大 当前 冷热统计
    sumData:any[];
    weiData:any[] 

    category:any[] = ['hot','average','max','current']
    //位置记录
    position:any;

    chooseIndex:number;

    complexData:any

    constructor(public common:CommonProvider,public util:UtilProvider) {
      console.log('Hello KuadutrendComponent Component');
      console.log(this.common.historyList)

      this.historyRecord = this.common.historyList.filter(ele => ele.code != '').map(ele => {
           return {...ele, number:ele.number.substr(2,ele.number.length),history:ele.code.split('').map(ele => parseInt(ele))}
      }).reverse()

      console.log(this.historyRecord)
      //this.historyRecord = this.util.historyNumbers.slice(0,11)
    }

    ngOnInit(){
      console.log(this.chooseIndex)
      console.log(this.position)

      this.weiData = ['w','q','b','s','g'].slice(this.position[0], this.position[1])
      this.contentSlides.initialSlide = this.chooseIndex
      this.choose = this.menus[this.chooseIndex]
      this.judgeHeadTitle()
      this.getKaijiang()
      this.getNumberTrend()
      this.getKuaduData()
      this.getColdHot()
    }

    ionChange($event){
      console.log($event.value)
      this.contentSlides.slideTo(this.menus.indexOf($event.value))
    }

    slideChanged(){
      let index = this.contentSlides.getActiveIndex()
      this.choose = this.menus[index]
    }

    // getKaijiang1(){
    //   if(this.common.method == '二星'){
    //       if(this.common.smallMethod == '前二跨度')
    //           this.kaijiangData = this.historyRecord.map((ele,index) => {
    //             let wan = this.judgeKind(ele.history[0])
    //             let qian = this.judgeKind(ele.history[1])
    //             return {...ele,wan,qian}   
    //           })
    //       else if(this.common.smallMethod == '后二跨度')  
    //           this.kaijiangData = this.historyRecord.map((ele,index) => {
    //             let shi = this.judgeKind(ele.history[3])
    //             let ge = this.judgeKind(ele.history[4])
    //             return {...ele,shi,ge}   
    //           }) 

    //       return    
    //   }
        
    //   switch(this.common.method){
    //       case "前三":
    //           this.kaijiangData = this.historyRecord.map((ele,index) => {
    //             let wan = this.judgeKind(ele.history[0])
    //             let qian = this.judgeKind(ele.history[1])
    //             let bai = this.judgeKind(ele.history[2])
    //             let zu = this.tellZu(ele.history.slice(0,3))
    //             return {...ele, wan,qian,bai,zu}   
    //             })      
    //             break  
    //       case "中三":   
    //             this.kaijiangData = this.historyRecord.map((ele,index) => {
    //               let qian = this.judgeKind(ele.history[1])
    //               let bai = this.judgeKind(ele.history[2])
    //               let shi = this.judgeKind(ele.history[3])
    //               let zu = this.tellZu(ele.history.slice(1,4))
    //               return {...ele,qian,bai,shi,zu}   
    //             })      
    //             break 
    //       case "后三":   
    //             this.kaijiangData = this.historyRecord.map((ele,index) => {
    //               let bai = this.judgeKind(ele.history[2])
    //               let shi = this.judgeKind(ele.history[3])
    //               let ge = this.judgeKind(ele.history[4])
    //               let zu = this.tellZu(ele.history.slice(2,5))
    //               return {...ele,bai,shi,ge,zu}   
    //             })      
    //             break    
    //     }
    // }

    getKaijiang(){
        this.kaijiangData = this.historyRecord.map((ele,index) => {
            let arr = []

            if(this.common.secondKind == '五星不定位'){
                let sum = ele.history.slice(this.position[0], this.position[1]).reduce((l,r) => (+l) + (+r))
                let max = Math.max(...ele.history)
                let min = Math.min(...ele.history)
                let gap = max - min
                let da = ele.history.filter(el => el >= 5).length
                let daxiao = da + ':' + (5 - da)
                let odd = ele.history.filter(el => el%2 != 0).length
                let oddeven = odd + ':' + (5 -odd)
                arr.push(...[sum,gap,daxiao,oddeven])
            }else{
                for(let i = this.position[0]; i<this.position[1]; i++){
                    arr.push(this.judgeKind(ele.history[i]))
                }
                if(this.position[1] - this.position[0] == 3)
                arr.push(this.tellZu(ele.history.slice(this.position[0],this.position[1])))
            }
               
            
            return {...ele, data:arr}
          })      
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

    judgeHeadTitle(){
        if(this.position[0] == 0 && this.position[1] == 3){
            this.complexData =  {title:['万位','千位','百位','前三形态'], class:'qiansan'}
        }

        if(this.position[0] == 1 && this.position[1] == 4){
            this.complexData =  {title:['千位','百位','十位','中三形态'], class:'zhongsan'}
        }

        if(this.position[0] == 2 && this.position[1] == 5){
            this.complexData =  {title:['百位','十位','个位','后三形态'], class:'housan'}
        }

        if(this.position[0] == 1 && this.position[1] == 5){
            this.complexData =  {title:['千位','百位','十位','个位'], class:'sixing'}
        }

        if(this.position[0] == 0 && this.position[1] == 5){
            console.log('fwgwgwefwef')
            this.complexData =  {title:['和值','跨度','大小比','奇偶比'], class:'wuxing'}
        }

        if(this.position[0] == 0 && this.position[1] == 2){
            this.complexData =  {title:['万位','千位'], class:'qianer'}
        }

        if(this.position[0] == 3 && this.position[1] == 5){
            this.complexData =  {title:['十位','个位'], class:'houer'}
        }
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
                totals[i].unshift({number:this.historyRecord[i].number, choose:false})
            }
            console.log(totals)
            this.trendData = totals
            this.getComplexData(this.trendData)
        }

        getComplexData(hezhiData){
             //遗漏冷热  yilou 当前遗漏 
              let yilou = [],lengre = [],maxYi = [],avgYi = [], sumData = [], length = hezhiData.length;
              for(let i = 1; i < hezhiData[length-1].length;i++){
                  let temp = [], local = []

                  hezhiData.forEach((ele,index) => {
                      temp.push(ele[i])
                      if(index < hezhiData.length - 1){
                          if(!ele[i].choose && hezhiData[index+1][i].choose){
                              local.push(ele[i])
                          }
                      }else if(index = hezhiData.length - 1){
                          if(!ele[i].choose)
                              local.push(ele[i])
                      }        
                  })

                  console.log(local)
                  // 每个位数出现次数
                  let leng = temp.reduce((a,b) => { 
                      if(b.choose) 
                        return a + b.choose
                      else
                        return a
                  },0)

                  let max = temp.filter(ele => !ele.choose).length ? Math.max(...temp.filter(ele => !ele.choose).map(item => item.number)) : 0 
                  let avg = local.length == 0 ? 0 : Math.floor(local.reduce((a,b) => a + b.number,0)/local.length)
                  let tempArr = temp.filter(ele => !ele.choose)
                  // let length = temp.filter(ele => !ele.choose).length
                  yilou.push(tempArr.length ? tempArr[tempArr.length - 1].number : 0 )
                  maxYi.push(max)
                  avgYi.push(avg)
                  lengre.push(leng)     
              }
              sumData.push(lengre)
              sumData.push(avgYi)
              sumData.push(maxYi)
              sumData.push(yilou)
              this.sumData = sumData
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
            totals[i].unshift({number:this.historyRecord[i].number, choose:false})
        }
        console.log(totals)
           this.kuaDuData = totals
        }

  //计算冷热
  getColdHot(){
    let arr = [],asd = []
    for(let i =0; i<= 9; i++){
        arr.push(i)
    }

    this.historyRecord.forEach(ele => {
         let tempArr = ele.history.slice(this.position[0],this.position[1])
         asd.push(Math.max(...tempArr) - Math.min(...tempArr))
    })

    this.lengreData = arr.map(number => {
        let leng30 = asd.slice(-30).filter(item => number == item).length
        let leng60 = asd.slice(-60).filter(item => number == item).length
        let leng100 = asd.slice(-100).filter(item => number == item).length
        let yilou = asd.length - asd.lastIndexOf(number) - 1
        return {number, leng30, leng60, leng100, yilou}
    })
  }  
}
