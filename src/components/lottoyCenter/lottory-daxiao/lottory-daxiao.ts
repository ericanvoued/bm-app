import { Component } from '@angular/core';

/**
 * Generated class for the LottoryDaxiaoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lottory-daxiao',
  templateUrl: 'lottory-daxiao.html'
})
export class LottoryDaxiaoComponent {

  text: string;

  constructor() {
    console.log('Hello LottoryDaxiaoComponent Component');
    this.text = 'Hello World';
  }

}
