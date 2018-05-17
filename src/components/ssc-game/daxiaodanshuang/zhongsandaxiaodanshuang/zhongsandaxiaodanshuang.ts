import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the ZhongsandaxiaodanshuangComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zhongsandaxiaodanshuang',
  templateUrl: 'zhongsandaxiaodanshuang.html'
})
export class ZhongsandaxiaodanshuangComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket) 
    this.text = 'Hello World';
  }

}
