import { Component,Output,ViewChild,ElementRef, EventEmitter, OnInit,AfterViewInit } from '@angular/core';
import { Slides } from 'ionic-angular';
import { UtilProvider } from '../../../../providers/util/util'
import { SscServiceProvider } from "../../../../providers/games/ssc-service/ssc-service"

import { CommonProvider } from "../../../../providers/common/common";
/**
 * Generated class for the ZhixuanhezhiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zhixuanhezhi',
  templateUrl: 'zhixuanhezhi.html'
})
export class ZhixuanhezhiComponent implements OnInit, AfterViewInit{
  @ViewChild('contentSlides') contentSlides: Slides;
  
  @Output() output = new EventEmitter();

  @ViewChild('drag') drag:ElementRef

  canvas:any;

  originX:number;
  gap:number = 0;

  domWidth:number;

  qishu:any[] = ['期号']

    
  numbers:number[];

  menus:string[] = ['开奖','号码走势','和值走势','冷热']

  historyRecord: any;

  choose:string = '开奖';

  chooseIndex:number;
  
  load:boolean = false;

  page:number = 1
  
  kaijiangData:any[];

  //位置记录
  position:any;

  //记录号码走势
  trendData:any[];

  hezhiTrendData:any[]

  //冷热号码走势
  lengreData:any[]

  //平均 最大 当前 冷热统计
  sumData:any[]

  sumArr:any[]

  category:any[] = ['hot','average','max','current']
  
  //遗漏数据
  statisticData:any[]

  constructor(public common:CommonProvider,public util:UtilProvider, public ssc:SscServiceProvider) {
    console.log(this.common.ballData)
    console.log(this.common.historyList) 
    //this.historyRecord = this.util.historyNumbers.slice(0,this.page*30)
   
    this.historyRecord = this.common.historyList.filter(ele => ele.code != '').map(ele => {
      return {...ele, number:ele.number.substr(2,ele.number.length),history:ele.code.split('').map(ele => parseInt(ele))}
    }).reverse()

    console.log(this.historyRecord)
    //this.qishu = this.qishu.slice(0,1).concat()
  }

  //根据position计算位数
  getKaijiang(){
    this.kaijiangData = this.historyRecord.map((ele,index) => {
      let hezhi,daxiao,danshuang;
      hezhi = ele.history.slice(this.position[0],this.position[1]).reduce((a,b) => a+b)
      //daxiao = hezhi > 13 ? '大':'小'
      daxiao = hezhi > this.numbers[Math.floor(this.numbers.length/2)] ? '大':'小'
      danshuang = hezhi %2 > 0 ? '单':'双'
      return {...ele, hezhi, daxiao, danshuang}
    })
  }

  ngOnInit(){
    this.contentSlides.initialSlide = this.chooseIndex
    this.choose = this.menus[this.chooseIndex]

    if(this.common.method == '前三' || this.common.method == '中三' || this.common.method == '后三'){
           if(this.common.smallMethod == '直选和值'){
                this.numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]
           }else{
                this.numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
           }
    }else if(this.common.method == '二星'){
          if(this.common.bigKind == '直选'){
            this.numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
          }else{
            this.numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
          }
    }

    this.getKaijiang()
    this.getNumberTrend()
    this.getStatisticData()
    this.getHezhiTrend()
    this.getColdHot()

    console.log(this.lengreData)

    this.hezhiTrendData.forEach(ele => {
         this.qishu.push(ele[0].number)
    })

    console.log(this.qishu)
  }



  ngAfterViewInit(){
    console.log('axivababsbeen')
    this.contentSlides.lockSwipes(true)
   
    //  this.domWidth = this.drag.nativeElement.offsetWidth
    //  console.log(this.domWidth)
    //  console.log(document.querySelector('.hezhi-container'))


    //  this.drag.nativeElement.addEventListener('touchstart', (e)=>{
    //     this.originX = e.changedTouches[0].pageX
    //     console.log('begin')
       
    //     if(!this.canvas){
    //       this.canvas = document.getElementById('canvas')
    //       console.log(this.canvas)
    //     }
       
    //  }, false)

    //   this.drag.nativeElement.addEventListener('touchmove', 
    //     (e)=>{
    //       let x = e.changedTouches[0].pageX
    //       let total = this.gap + x - this.originX
    //       console.log(total)
    //       if( total > 0 || total < -18*this.domWidth/28){
    //         return
    //       }
    //       this.gap = this.gap + x - this.originX
    //       this.canvas.style.transform = "translate(" + this.gap + "px,0)"
         
    //   }, false)
     
  }

    ionChange($event){
      this.contentSlides.lockSwipes(false)
      console.log('wcnmb')
      console.log($event.value)
      this.contentSlides.slideTo(this.menus.indexOf($event.value))
      this.contentSlides.lockSwipes(true)
  }
  
  slideChanged(){
      let index = this.contentSlides.getActiveIndex()
      this.choose = this.menus[index]
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
      let asd = []
      this.historyRecord.forEach(ele => {
           let temp = []
           temp.push(...ele.history.slice(this.position[0],this.position[1]))
           asd.push(temp)
      })

      let totals = []
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

  getHezhiTrend(){
      let asd = [],totals = []
      this.historyRecord.forEach(ele => {
          let temp = []
          temp.push(...ele.history.slice(this.position[0],this.position[1]))
          asd.push(temp)
      })
     let sum = asd.map(item => item.reduce((a,b) => a+b))

     console.log(this.position[0])
     console.log(this.position[1])
     console.log(sum)
     //和值统计的长度根据this.numbers确认
     for(let i = 0;i<sum.length;i++){
          let arr:any[] = []
          console.log(totals)
          for(let j = 0;j<= this.numbers.length - 1;j++){
               if(sum[i] == j){
                    arr.push({number:j,choose:true})
               }else{
                  if(i == 0 ){
                    arr.push({number:1,choose:false})
                  }else{
                    if(totals[i-1][j].choose){
                        arr.push({number:1,choose:false})
                    }else{
                        arr.push({number:totals[i-1][j].number + 1, choose:false})
                    }
                  
                 } 
               }
          } 
          totals.push(arr)
     }
     for(let i =0;i<totals.length;i++){
         totals[i].unshift({number:this.historyRecord[i].number, choose:false})
     }

    //  totals.unshift(['',{number:1},{number:2},{number:3},{number:4},{number:5},{number:6},{number:7},{number:8},{number:9},{number:10},
    //   {number:11},{number:12},{number:13},{number:14},{number:15},{number:16},{number:17},{number:18},{number:19},{number:20},{number:21},
    //   {number:22},{number:23},{number:24},{number:25},{number:26},{number:27}
    // ])
      console.log(totals)
      return this.hezhiTrendData = totals
  }


  //计算冷热
  getColdHot(){
     let asd = []
     this.historyRecord.forEach(ele => {
          let temp = []
          temp.push(...ele.history.slice(this.position[0],this.position[1]))
          asd.push(temp.reduce((a,b) => a + b))
     })

     this.lengreData = this.numbers.map(number => {
         let leng30 = asd.slice(-30).filter(item => number == item).length
         let leng60 = asd.slice(-60).filter(item => number == item).length
         let leng100 = asd.slice(-100).filter(item => number == item).length
         let yilou = asd.length - asd.lastIndexOf(number) - 1
         return {number, leng30, leng60, leng100, yilou}
     })
  } 

  toggle(number){
    console.log(number)
    console.log(Math.floor(number/7))
    console.log(number%7)
    this.common.componentRef.instance.changeToggle(Math.floor(number/7),number%7)
    console.log(this.common.ballData)
  }

  checkCurrent(number){
     if(number)
        return this.common.ballData[Math.floor(number/7)].value[number%7] == 1
     else
        return false
    // return this.common.ballData[Math.floor(number/7)].value[number%7] == 1
  }

  getStatisticData(){
     switch(this.common.method){
          case '前三':
               return this.statisticData = this.common.missData.qszx
          case '中三':
               return this.statisticData = this.common.missData.zszx  
          case '后三':
               return this.statisticData = this.common.missData.hszx  
          case '二星':
               if(this.common.smallMethod == '后二和值')  
                  return this.statisticData = this.common.missData.hezuxfs    
               else   
                  return this.statisticData = this.common.missData.qezuxfs
     }          
  }

  getTitle(item){
    switch(item) {
      case 'hot':
           return '出现次数';
      case 'average':
           return '平均遗漏';
      case 'max':
           return '最大遗漏';
      case 'current':
           return '当前遗漏';                       
    }
  }
}
