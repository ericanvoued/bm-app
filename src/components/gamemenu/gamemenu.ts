import { Component,Input,Output,EventEmitter } from '@angular/core';
import { trigger ,state,transition,animate,style} from "@angular/animations";
import { CommonProvider } from "../../providers/common/common";
import * as $ from 'jquery';
import { UtilProvider } from '../../providers/util/util'

/**
 * Generated class for the GamemenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'gamemenu',
  templateUrl: 'gamemenu.html',
  animations:[
      trigger('fading',[
          state('visable',style({
              opacity: 1,
              transform:'scale(1,1)'
              //transform:'translate3d(0, 0, 0)'
          })),
          state('invisable', style({
              opacity: 0,
              transform:'scale(1,0)'
              //transform:'translate3d(0, -100%, 0)'
          })),
          transition('* => *',animate('1s'))
      ])
  ]
})
export class GamemenuComponent {
    @Output('switch') switch:EventEmitter<any> = new EventEmitter<any>()
    choosen:any;

    //大玩法
    method:string;
    small:any;
    //小玩法
    smallMethod:string;

    bigIndex:number;


    constructor(public common:CommonProvider,public util:UtilProvider) {
       console.log('Hello GamemenuComponent Component');
        this.method = this.common.method
        this.small = this.common.small
        this.smallMethod = this.common.smallMethod
        this.bigIndex = this.common.bigIndex
    }

    // dawan fa
    setMethodIndex(index){
        this.bigIndex = index
        this.method = this.common.gameMethodConfig[index].name

        if(this.common.gameMethodConfig[index].children.length){
            this.small = this.common.gameMethodConfig[index].children
            this.smallMethod = this.common.gameMethodConfig[index].children[0].children[0].name
        }else{
            this.small = this.common.small = []
            this.smallMethod = this.common.smallMethod = ''
            this.common.method = this.common.gameMethodConfig[index].name
  
            this.util.setData()
            this.common.visible = 'invisable';

            $('.body-bg').fadeOut(1000)
        }
        console.log('dddddd')

        //this.switch.emit(this.method + this.smallMethod)
    }

    setSmallIndex(j,name){
        this.common.setGameConfig(this.bigIndex,j,name)
        this.util.setData()
        this.common.visible = 'invisable';
        $('.body-bg').fadeOut(1000)
        console.log(name)
        // 切换小玩法 判断是lhc
        // if(this.nav.getActive().name == "LhcPage"){
        //     this.lhc.resetData()
        //     this.lhc.setGameKind(name)
        // }

        console.log(this.common.secondKind)

        if(this.common.method == '二星'){
            this.switch.emit(this.common.method + this.common.secondKind + this.common.smallMethod)
        }else{
            this.switch.emit(this.common.method + this.common.smallMethod)
        }
    }


    //点击黑色背景
    toggle(){
        console.log('dddd')
        this.common.visible = 'invisable';
        $('.body-bg').fadeOut(1000)
    }

}
