import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the HousandaxiaodanshuangComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'housandaxiaodanshuang',
  templateUrl: 'housandaxiaodanshuang.html'
})
export class HousandaxiaodanshuangComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket) 
    this.common.ballData = [
      {"key":"百位", "value":[0,0,0,0]},
      {"key":"十位", "value":[0,0,0,0]},
      {"key":"个位", "value":[0,0,0,0]}
    ]
  }

  getLotteryText(){
    return this.getCommonData().map(ele => ele.map(item => this.judge(item) + ' ').join('')).join('| ')
  }
}
