import { Component } from '@angular/core';
import { UtilProvider } from '../../../providers/util/util'

/**
 * Generated class for the WuxingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wuxing',
  templateUrl: 'wuxing.html'
})
export class WuxingComponent {

  text: string;

  constructor(public util:UtilProvider) {
    console.log('Hello WuxingComponent Component');
    this.text = 'Hello World';
  }

}
