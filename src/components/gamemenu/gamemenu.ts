import { Component,Input,Output,EventEmitter,OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { trigger ,state,transition,animate,style} from "@angular/animations";
import { CommonProvider } from "../../providers/common/common";
import { Events } from 'ionic-angular';

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
          transition('* => *',animate('.3s'))
      ])
  ]
})
export class GamemenuComponent implements OnDestroy{
    @Output('switch') switch:EventEmitter<any> = new EventEmitter<any>()
    choosen:any;

    //大玩法
    method:string;
    small:any;
    //小玩法
    smallMethod:string;

    bigIndex:number;


    constructor(public common:CommonProvider,public util:UtilProvider, public events:Events) {
       console.log('Hello GamemenuComponent Component');
   
       this.events.subscribe('getMethod', () => {
        this.method = this.common.method
        this.small = this.common.small
        this.smallMethod = this.common.smallMethod
        this.bigIndex = this.common.bigIndex
        console.log(this.method)           
       })
    }

    ngOnDestroy(){
        console.log('destroy')
        this.events.unsubscribe('getMethod')
    }

    // dawan fa
    setMethodIndex(index){
        this.bigIndex = index
        this.method = this.common.gameMethodConfig[index].name_cn

        if(this.common.gameMethodConfig[index].children.length){
            this.small = this.common.gameMethodConfig[index].children
            this.smallMethod = this.common.gameMethodConfig[index].children[0].children[0].name_cn
        }else{
            this.small = this.common.small = []
            this.smallMethod = this.common.smallMethod = ''
            this.common.method = this.common.gameMethodConfig[index].name_cn
  
            this.util.setData()
            this.common.visible = 'invisable';
            $('.body-bg').fadeOut(300)
        }
        console.log('dddddd')

        //this.switch.emit(this.method + this.smallMethod)
    }

    //小玩法切换
    setSmallIndex(j,name){
        this.common.toggle()
        if(this.common.gameMethodConfig[this.bigIndex].name_cn == this.common.method 
            && this.common.secondKind == this.common.gameMethodConfig[this.bigIndex].children[j].name_cn
            && this.common.smallMethod == name
        ){
            console.log('same')
            //this.toggle()
            return 
        }

        this.smallMethod = name
        this.common.setGameConfig(this.bigIndex,j,name)
        this.util.resetData()
        this.util.setData()

        // this.common.visible = 'invisable';
        // $('.body-bg').fadeOut(300)
        // console.log(name)
        console.log(this.common.secondKind)

        if(this.common.method == '二星' || this.common.method == '任选'){
            this.switch.emit(this.common.method + this.common.secondKind + this.common.smallMethod)
        }else{
            this.switch.emit(this.common.method + this.common.smallMethod)
        }
    }


    //点击黑色背景
    toggle(){
        console.log('dddd')
        this.common.visible = 'invisable';
        $('.body-bg').fadeOut(300)
    }

}
