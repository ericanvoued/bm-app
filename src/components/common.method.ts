import { CommonProvider } from '../providers/common/common'
import { UtilProvider } from '../providers/util/util'
import { BasketDataProvider } from '../providers/basket-data/basket-data'

export class commonMethod{

   constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
   }

   qqq(number){
    return number + 5
  }

  ppp(number){
    return ('0' + (number + 7)).slice(-2)
  }

    judge(number){
        switch(number){
        case 0:
            return '大'
        case 1:
            return '小'
        case 2:
            return '单'  
        case 3:
            return '双'           
    }
    }

      changeToggle(row,column){
        console.log('wwww')
        if(column!=null){
        this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == row){
                item.value = item.value.map((ele,index) => {
                    if(index == column){
                        return ele == 1 ? 0 : 1
                    }else{
                        return ele
                    }
                })
                return item
            }else{
                return item
            }
        })
        }
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

    //机选注单
    randomChoose(number?){
        if(number){
                console.log('suiji 5zhu')
                this.common.ballData = this.common.ballData.map(item => {
            // let arr = [0,1,2,3,4,5,6,7,8,9]
                let random = Math.floor(Math.random()*item.value.length)
                //let arr = this.generateTwo(number)
                let balls = item.value.map((ele,index) => index == random ? 1 : 0)
                item.value = balls
                return item
               })
               this.calculate()
               this.basket.addBetData()
               if(number == 1) return

               this.randomChoose(--number)
               
        }else{
                this.common.ballData = this.common.ballData.map(item => {
            // let arr = [0,1,2,3,4,5,6,7,8,9]
                let random = Math.floor(Math.random()*item.value.length)
                //let arr = this.generateTwo(number)
                let balls = item.value.map((ele,index) => index == random ? 1 : 0)
                item.value = balls
                return item
            })
            this.calculate()
        }
       
        
    }

    //奇偶 全清
    changeActive(index,choice,name){
         this.util.changeActive(index,choice,name)
         this.calculate()
    }

     //计算注单
    calculate(){
        let count = 1;
        this.common.ballData.forEach((item,index) => {
            count *=  item.value.filter(ele => ele == 1).length
        })
        this.common.count = count
        let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
        this.common.betPrice = this.common.count*2*percent
    }


}