import { Component } from '@angular/core';

/**
 * Generated class for the AxibaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'axiba',
  templateUrl: 'axiba.html'
})
export class AxibaComponent {

  text: string;

  constructor() {
    console.log('Hello AxibaComponent Component');
    this.text = 'Hello World';
  }

}
