import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SscServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SscServiceProvider {
  historyNumbers = [
    {number:'01期', history:[5,7,7,5,7]},
    {number:'02期', history:[3,3,3,8,5]},
    {number:'03期', history:[9,6,6,9,5]},
    {number:'04期', history:[6,3,3,2,2]},
    {number:'05期', history:[8,5,5,1,3]},
    {number:'06期', history:[2,2,2,4,4]},
    {number:'07期', history:[9,8,3,5,7]},
    {number:'08期', history:[4,5,7,1,5]},
    {number:'09期', history:[3,5,6,8,2]},
    {number:'10期', history:[7,5,3,9,3]},
    {number:'11期', history:[6,5,5,1,4]}
  ]

  fakeData:any = {}

  //fakeTrend:Array<any> = [[5,3,9,8,6,2,9,1,8,6,4],[7,3,6,5,3,2,8,3,5,6,9],[7,3,6,5,3,2,8,3,5,6,9],[5,8,9,1,2,4,5,7,8,3,2],[7,5,5,3,2,4,5,6,8,1,6]]
  fakeTrend:Array<any> 
  

  constructor(public http: HttpClient) {
    console.log('Hello SscServiceProvider Provider');
    this.fakeTrend = [0,1,2,3,4].reduce((a,b) =>{
         let arr = []
         for(let i = 0;i<this.historyNumbers.length;i++){
             arr.push(this.historyNumbers[i].history[b])
         }
         a.push(arr)
         return a
    },[])
    this.generateFake()
  }

  generateFake(){
    for(let k = 0; k<this.fakeTrend.length;k++){
      let tempData = this.fakeTrend[k]
      let arr = []
      for(let i = 1; i<=tempData.length; i++){
        let inner = []
       // inner.push({number:this.historyNumbers[i-1].number, choose:false})
        for(let j = 0; j<=9;j++){
            if(j == tempData[i-1]){
               inner.push({number:tempData[i-1], choose:true})
            }else{
               if(i == 1){
                 inner.push({number:1,choose:false})
               }else{
                 if(arr[i-2][j].choose){
                    inner.push({number:1, choose:false})
                 }else{
                    inner.push({number:arr[i-2][j].number+1, choose:false})
                 }
               }
            }  
        }  
        
        arr.push(inner)
       }
       for(let i=0;i<arr.length;i++){
           arr[i].unshift({number:this.historyNumbers[i].number, choose:false})
       }

       console.log(arr)
      // this.fakeData.push({[this.deal(k)]:arr})
       this.fakeData[this.deal(k)] = arr
    }
    
   // this.fakeData = arr
    console.log(this.fakeData)
  }

    deal(number){
      if(number == 0)
        return '万位走势'
      if(number == 1)
        return '千位走势'
      if(number == 2)
        return '百位走势'
      if(number == 3)
        return '十位走势'
      if(number == 4)
        return '个位走势'
  }

  
}
