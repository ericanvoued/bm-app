import { Component } from '@angular/core';

/**
 * Generated class for the LottoryDistributeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lottory-distribute',
  templateUrl: 'lottory-distribute.html'
})
export class LottoryDistributeComponent {

  text: string;

  constructor() {
    console.log('Hello LottoryDistributeComponent Component');
    this.text = 'Hello World';
  }

}
