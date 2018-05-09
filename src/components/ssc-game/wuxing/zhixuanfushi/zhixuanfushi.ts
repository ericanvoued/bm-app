import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'

// import { SscPage } from '../../../../pages/games/ssc/ssc'
/**
 * Generated class for the ZhixuanfushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zhixuanfushi',
  templateUrl: 'zhixuanfushi.html'
})
export class ZhixuanfushiComponent {
  @Input('choose') choose: any[] = [];
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider) {
    console.log('Hello ZhixuanfushiComponent Component');
    this.util.shakePhone(this.randomChoose)
    //console.log(ssc.haveChoosen)
    setTimeout(() => {
      console.log(this.choose)
    },1000)
    
  }

  qqq(number){
    return number + 5
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

  //机选注单
  randomChoose(){
    this.common.ballData = this.common.ballData.map(item => {
      // let arr = [0,1,2,3,4,5,6,7,8,9]
      let random = Math.floor(Math.random()*10)
      //let arr = this.generateTwo(number)
      let balls = item.value.map((ele,index) => index == random ? 1 : 0)
      item.value = balls
      return item
    })
    //this.calculate()
  }
}
