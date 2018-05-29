import { Component} from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { ToolsProvider } from '../../../../providers/tools/tools'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the ZhongsanyimabudingweiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zhongsanyimabudingwei',
  templateUrl: 'zhongsanyimabudingwei.html'
})
export class ZhongsanyimabudingweiComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider, public util:UtilProvider,public basket:BasketDataProvider){
    super(common,util,basket)
    console.log('Hello ZhongsanyimabudingweiComponent Component');
    this.text = 'Hello World';
  }

}