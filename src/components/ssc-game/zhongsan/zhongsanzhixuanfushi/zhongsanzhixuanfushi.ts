import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
/**
 * Generated class for the ZhongsanzhixuanfushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zhongsanzhixuanfushi',
  templateUrl: 'zhongsanzhixuanfushi.html'
})
export class ZhongsanzhixuanfushiComponent {

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider) {
    console.log('Hello ZhongsanzhixuanfushiComponent Component');
    this.text = 'Hello World';
  }

  qqq(number){
    return number + 5
  }
}
