import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

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
export class ZhixuanfushiComponent extends commonMethod{
  @Input('choose') choose: any[] = [];
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)
            //this.util.shakePhone(this.randomChoose)

    console.log('Hello ZhixuanfushiComponent Component');
    //this.util.shakePhone(this.randomChoose)
    //console.log(ssc.haveChoosen)
    
  }

  qqq(number){
    return number + 5
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

  

  // changeToggle(row,column){
  //   super.changeToggle(row,column)
  // }
}
