import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
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
export class SiXingZhixuanfushiComponent {

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider) {
    console.log('Hello ZhixuanfushiComponent Component');
    this.text = 'Hello World';
  }

  qqq(number){
    return number + 5
  }
}
