import { Component } from '@angular/core';


@Component({
  selector: 'lottory-kaijiang',
  templateUrl: 'lottory-kaijiang.html'
})
export class LottoryKaijiangComponent {

  text: string;

  constructor() {
    console.log('Hello LottoryKaijiangComponent Component');
    this.text = 'Hello World';
  }

}
