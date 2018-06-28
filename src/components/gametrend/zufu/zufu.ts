import { Component,Output,ViewChild,ElementRef, EventEmitter} from '@angular/core';
import { Slides } from 'ionic-angular';
import { UtilProvider } from '../../../providers/util/util'
import { CommonProvider } from "../../../providers/common/common"
/**
 * Generated class for the ZufuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zufu',
  templateUrl: 'zufu.html'
})
export class ZufuComponent {
  @ViewChild('contentSlides') contentSlides: Slides;
  
     menus:string[];
    
     choose:string = '开奖';

     //记录号码走势
     trendData:any[];
  
     chooseIndex:number;
   
     historyRecord: any;
  
     position:any;
   
     load:boolean = false;
   
     kaijiangData:any[];
    
     finish:boolean = false
  
     text: string;
  
     zhixuan:boolean;
  
     fakeTrend:any
  
     sumData:any[]
  

  constructor(public common:CommonProvider,public util:UtilProvider) {
      console.log('Hello ZufuComponent Component');
      this.text = 'Hello World'

      this.historyRecord = this.common.historyList.map(ele => {
        return {...ele, number:ele.number.substr(2,ele.number.length),
          history: this.common.series_id == 2 ? ele.code.split(' ').map(ele => parseInt(ele)) : ele.code.split('').map(ele => parseInt(ele))}
      })
  
      console.log(this.historyRecord)
      console.log(this.common.ballData)
  }

  ngOnInit(){
    console.log(this.chooseIndex)
    console.log(this.position)
    // this.fakeTrend = this.initialArr(this.position[1], this.position[0]).reduce((a,b) =>{
    //   let arr = []
    //   for(let i = 0;i<this.historyRecord.length;i++){
    //       arr.push(+this.historyRecord[i].history[b])
    //   }
    //   a.push(arr)
    //   return a
    // },[])
    // console.log(this.fakeTrend)

    this.contentSlides.initialSlide = this.chooseIndex
    this.choose = this.menus[this.chooseIndex]
    this.getKaijiang()
    this.getNumberTrend()
    //this.generateFake()
   
  }

  getKaijiang(){
    console.log(this.common.method)
    this.kaijiangData = this.historyRecord.map((ele,index) => {
      let sum = ele.history.slice(this.position[0], this.position[1]).reduce((l,r) => (+l) + (+r))
      let max = Math.max(...ele.history)
      let min = Math.min(...ele.history)
      let gap = max - min
      let da = ele.history.filter(el => el >= 5).length
      let daxiao = da + ':' + (5 - da)
      let odd = ele.history.filter(el => el%2 != 0).length
      let oddeven = odd + ':' + (5 -odd)
      return {...ele, sum,gap, daxiao, oddeven}
    })
   // return  
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
            for(let j = 1; j<=11; j++){
                if(check(asd[i],j)){
                  arr.push({number:j,choose:check(asd[i],j)})
                }else{
                  if(i == 0 ){
                        arr.push({number:1,choose:0})
                    }else{
                        if(totals[i-1][j-1].choose > 0){
                            arr.push({number:1,choose:0})
                        }else{
                            arr.push({number:totals[i-1][j-1].number + 1, choose:0})
                        }
                    }
                }
            }   
          //arr.unshift({number:('00' + i).slice(-2) + '期'})
          totals.push(arr)
        }

        for(let i =0;i<totals.length;i++){
            totals[i].unshift({number:this.historyRecord[i].number})
        }
        console.log(totals)
        this.trendData = totals
        //this.getComplexData(this.trendData)
    }


    slideChanged(){
      let index = this.contentSlides.getActiveIndex()
      this.choose = this.menus[index]
    }

    ionChange($event){
      console.log($event.value)
      this.contentSlides.slideTo(this.menus.indexOf($event.value))
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

   processName(name){
    let temp;
    switch(name) {
      case 'danma':
           return '胆码';
      case 'tuoma':
           return '拖码';  
      case 'qiansan':
           return '前三组选'      
      case 'qianer':
           return '前二组选'                 
    }
 }
}