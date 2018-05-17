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

    
  numbers:number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]

  menus:string[] = ['开奖','号码走势','和值走势','冷热']

  historyRecord: any;

  choose:string = '开奖';

  chooseIndex:number;
  
  load:boolean = false;

  page:number = 1
  
  kaijiangData:any[];

  hezhiData:any[];

  hezhiTrendData:any[]

  constructor(public common:CommonProvider,public util:UtilProvider, public ssc:SscServiceProvider) {
    console.log('Hello ZhixuanhezhiComponent Component');
    this.historyRecord = this.util.historyNumbers.slice(0,this.page*11)
    this.getKaijiang()
    this.getNumberTrend()

    this.getHezhiTrend()

    this.hezhiTrendData.slice(1,this.hezhiTrendData.length).forEach(ele => {
         this.qishu.push(ele[0])
    })
    console.log(this.qishu)
    //this.qishu = this.qishu.slice(0,1).concat()
  }

  getKaijiang(){
    this.kaijiangData = this.historyRecord.map((ele,index) => {
      let hezhi,daxiao,danshuang;
      hezhi = ele.history.reduce((a,b) => a+b)
      daxiao = hezhi > 13 ? '大':'小'
      danshuang = hezhi %2 > 0 ? '单':'双'
      return {...ele, hezhi, daxiao, danshuang}
    })
  }

  ngOnInit(){
    // console.log('axivababsbeen')
    // this.contentSlides.lockSwipes(true)
   
    //  this.domWidth = this.drag.nativeElement.offsetWidth
    //  console.log(this.domWidth)
    //  console.log(this.drag.nativeElement)

    //  this.canvas = document.querySelector('canvas')
    //  console.log(this.canvas)

    //  this.drag.nativeElement.addEventListener('touchstart', (e)=>{
    //     this.originX = e.changedTouches[0].pageX
    //     console.log('begin')
    //     console.log(this.originX)
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
    //      // this.canvas.style.transform = "translate(" + this.gap + "px,0)"
    //       console.log(x)
    //   }, false)
     
  }

  ngAfterViewInit(){
    console.log('axivababsbeen')
    this.contentSlides.lockSwipes(true)
   
     this.domWidth = this.drag.nativeElement.offsetWidth
     console.log(this.domWidth)
     //console.log(this.drag.nativeElement)
     console.log(document.querySelector('.hezhi-container'))

    

     this.drag.nativeElement.addEventListener('touchstart', (e)=>{
        this.originX = e.changedTouches[0].pageX
        console.log('begin')
       
        if(!this.canvas){
          this.canvas = document.getElementById('canvas')
          console.log(this.canvas)
        }
       
     }, false)

      this.drag.nativeElement.addEventListener('touchmove', 
        (e)=>{
          let x = e.changedTouches[0].pageX
          let total = this.gap + x - this.originX
          console.log(total)
          if( total > 0 || total < -18*this.domWidth/28){
            return
          }
          this.gap = this.gap + x - this.originX
          this.canvas.style.transform = "translate(" + this.gap + "px,0)"
         
      }, false)
     
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

  getNumberTrend(){
      let asd = [[3,4,5],[5,6,7],[2,2,3],[4,5,6],[5,5,8],[7,8,9],[1,3,7],[2,4,6],[4,5,9],[5,7,8],[3,6,9]]
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
        //arr.unshift({number:('00' + i).slice(-2) + '期'})
        totals.push(arr)
      }

      for(let i =0;i<totals.length;i++){
          totals[i].unshift({number:('00' + i).slice(-2) + '期'})
      }
      console.log(totals)
      return this.hezhiData = totals
  }

  getHezhiTrend(){
     let asd = [[1,2,5],[2,3,1],[2,2,3],[4,5,6],[1,1,3],[2,3,2],[1,2,3],[2,4,3],[4,2,2],[5,7,8],[3,6,9]]
     let sum = asd.map(item => item.reduce((a,b) => a+b))
     let totals = []

    //  function check(arr,num){
    //   let total = 0
    //   for(let i =0;i<arr.length;i++){
    //         if(arr[i] == num)
    //           total++
    //   }
    //   return total
    // }

     for(let i = 0;i<sum.length;i++){
          let arr:any[] = []
          for(let j =0 ;j<=27;j++){
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
         totals[i].unshift(('00' + i).slice(-2) + '期')
     }

     totals.unshift(['',{number:1},{number:2},{number:3},{number:4},{number:5},{number:6},{number:7},{number:8},{number:9},{number:10},
      {number:11},{number:12},{number:13},{number:14},{number:15},{number:16},{number:17},{number:18},{number:19},{number:20},{number:21},
      {number:22},{number:23},{number:24},{number:25},{number:26},{number:27}
    ])
      console.log(totals)
      return this.hezhiTrendData = totals
  }
}
