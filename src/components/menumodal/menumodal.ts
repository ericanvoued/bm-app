import { Component,Input,Output,EventEmitter } from '@angular/core';
import { ToolsProvider } from '../../providers/tools/tools'
import * as $ from 'jquery';

/**
 * Generated class for the MenumodalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menumodal',
  templateUrl: 'menumodal.html'
})
export class MenumodalComponent {
  @Input('hasChoosen')hasChoosen:any[];
  @Output('toggle') change: EventEmitter<any> = new EventEmitter<any>();

  chooseCopy:any[] = []

  text: string

  choice:string[] = ['当前遗漏', '30期冷热', '平均遗漏', '最大遗漏']

  constructor(public tool:ToolsProvider) {
    console.log('Hello MenumodalComponent Component');
    this.text = 'Hello World';

    setTimeout(() => {
      this.chooseCopy = this.tool.copy(this.hasChoosen,true)
      console.log(this.chooseCopy)
    },0)
   
  }

  ionViewDidEnter(){
     
  }

  toggleChoose(choice,dom){
    $(dom).toggleClass('active')
    if(this.chooseCopy.indexOf(choice) > -1){
         this.chooseCopy.splice(this.chooseCopy.indexOf(choice),1)
    }else{
         this.chooseCopy.push(choice)
    }
    //this.change.emit(choice)
  }

  isActive(item){
    return this.hasChoosen.indexOf(item) > -1
  }

  cancel(){
    $('.modal').removeClass('active')
    $('.body-bg').fadeOut(1000)
  }

  confirm(){
    this.change.emit(this.chooseCopy)
    $('.modal').removeClass('active')
    $('.body-bg').fadeOut(1000)
  }
}
