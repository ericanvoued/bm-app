import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ComponentRef} from '@angular/core';

import { ToolsProvider } from '../tools/tools'
import { Events } from 'ionic-angular';
import {ToastController, ModalController} from "ionic-angular";
import { CountTipComponent } from '../../components/count-tip/count-tip'
import { RestProvider } from '../../providers/rest/rest'
import { HttpClientProvider } from '../http-client/http-client'
import {Storage} from '@ionic/storage';

import * as $ from 'jquery'
import {observe} from "../tools/observe";
let _ = new observe();
/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {
  pid = new Subject();

  gameId:any;

  bonus:number;
  open:boolean = false
  //倒计时
  timer:any;
  //用于存储现在游戏所有的玩法
  gameMethodConfig:Array<any> = [];
  data:any;
  ballData:any = [];
  small:any;
  method:any;

  //xiao wan fa
  smallKind:any;

  //是否直选
  zhixuan:boolean = true

  //小玩法名称
  smallMethod:string;
  secondKind:string;
  bigIndex:any;

  //小玩法id
  smallId:any

  visible:string = 'invisable';
  tabYuan:string = "元";
  // 元 角 分
  tabVisible:string = 'invisable'

  //形成的注单数
  count:number = 0;
  betPrice:number = 0;

  // 添加到购物篮数
  cartNumber:number = 0;
  // 随机注单的实例
  componentRef:ComponentRef<any>
  // odd even big small
  btn:any[];
  singleBtn:Array<any>;

  prizeGroup:any[];

  chooseGroup:any;

  countTime:any = {
    'total': '',
    'days': '',
    'hours': '',
    'minutes': '',
    'seconds': ''
  }


  constructor(public tools:ToolsProvider, public http:HttpClientProvider,public modalCtrl: ModalController, public events:Events,private toastCtrl:ToastController,public storage:Storage) {
    console.log('Hello CommonProvider Provider');
    
    this.pid.subscribe((val) => {
      
        this.gameId = val
        this.initData()
        
    })
    // this.singleBtn = this.tools.copy([
    // {name:"全",flag:false},{name:"大",flag:false},{name:"小",flag:false},{name:"奇",flag:false},{name:"偶",flag:false},{name:"清",flag:false}
    // ],true)

      this.events.subscribe('changeYuan',(val) => {
          console.log('wefwewf')
          let origin = this.tabYuan == '元' ? 1 : this.tabYuan == '角' ? 0.1 : 0.01
          let percent = val == '元' ? 1 : val == '角' ? 0.1 : 0.01
          this.betPrice = this.count*2*percent
          console.log(origin)
          console.log(percent)
          this.bonus = this.smallKind.prize*percent
          console.log(this.bonus)
          this.tabYuan = val

      })
  }


    async initData():Promise<any>{
        let url = 'api-lotteries-h5/load-data/2/1?_t=4a2d4618e7774c19f84aa3d0b6426816'
        let params = {_token:'9LTxelc7wY2XHR4L5n1XhlQ8Rwwq4mGQB42HkfWk'}
        this.gameMethodConfig = (await this.http.postData(url,params)).data.game_ways
        
        
        // let qwe = await this.http.postData(url,params)
         console.log(this.gameMethodConfig )
        // this.data = (await this.http.fetchData(name)).list;

        // this.gameMethodConfig = this.data;
        
        this.small = this.gameMethodConfig[0].children;
        this.smallKind = this.gameMethodConfig[0].children[0].children[0]
        this.smallId = this.smallKind.id
        console.log(this.smallKind)
        console.log(this.smallId)
        let percent = this.tabYuan == '元' ? 1 : this.tabYuan == '角' ? 0.1 : 0.01
        this.bonus = this.smallKind.prize*percent

        if(this.small.length){
            if(this.small.length){
                this.ballData = this.tools.copy(
                    this.processBall(this.gameMethodConfig[0].children[0].children[0].bet_number), true)
                    console.log(this.ballData)
                this.secondKind = this.gameMethodConfig[0].children[0].name_cn
            }
        }
           
        //this.ballData = arr
        this.method = this.gameMethodConfig[0].name_cn;
        this.bigIndex = 0

        if(this.small.length)
            this.smallMethod = this.small[0].children[0].name_cn;
        this.btn = this.ballData.map(ele => [{name:"全",flag:false},{name:"大",flag:false},{name:"小",flag:false},{name:"奇",flag:false},{name:"偶",flag:false},{name:"清",flag:false}])
        console.log(this.ballData)
        console.log(this.btn)

        return new Promise((resolve,reject) =>{
            resolve()
        })
    }

    setGameConfig(index,index2,name){
      
        if(this.bigIndex!=index || name!=this.smallMethod || this.gameMethodConfig[index].children[index2].name_cn != this.secondKind){
            this.secondKind = this.gameMethodConfig[index].children[index2].name_cn
            // console.log(this.gameMethodConfig[index].children[index2].children.filter(ele => ele.name == name)[0].bet_numberArrObj)
            this.ballData = this.tools.copy(this.processBall(this.gameMethodConfig[index].children[index2].children.filter(ele => ele.name_cn == name)[0].bet_number), true)
                        console.log(this.ballData)

            this.btn = this.ballData.map(ele => [{name:"全",flag:false},{name:"大",flag:false},{name:"小",flag:false},{name:"奇",flag:false},{name:"偶",flag:false},{name:"清",flag:false}])
            console.log(this.btn)
        }

        this.singleBtn = this.tools.copy([
            {name:"全",flag:false},{name:"大",flag:false},{name:"小",flag:false},{name:"奇",flag:false},{name:"偶",flag:false},{name:"清",flag:false}
            ],true)

        if(this.gameMethodConfig[index].children[index2].name_cn == '直选')
            this.zhixuan = true
         else
            this.zhixuan = false   

        this.bigIndex = index
        if(this.method != this.gameMethodConfig[index].name_cn){
            this.events.publish('changeTrend')
           
        }

        this.method = this.gameMethodConfig[index].name_cn

        //console.log(this.gameMethodConfig[index].children[index2])
        this.small = this.gameMethodConfig[index].children
        console.log(this.small)
        let temp;
        this.small.forEach((ele,index) => {
            ele.children.forEach(item => {
                if(item.name_cn == name)
                   temp = item
            })
        })
        console.log(temp)
        this.smallKind = temp
        this.smallId = this.smallKind.id
        console.log(this.smallKind)
        console.log(this.smallId)
        let percent = this.tabYuan == '元' ? 1 : this.tabYuan == '角' ? 0.1 : 0.01
        this.bonus = this.smallKind.prize*percent
     
        this.smallMethod = name
    }

    create(aa){
        let [a,b] = aa.split('-'),qq = []
        for(let i = a;i<=b;i++){
            qq.push(0)
        }
        return qq
     }

     processBall(data){
           let arr = []
           for(let key in data){
               arr.push({key,value:this.create(data[key])})
           }
           return arr
     }


    //计算注单
    calculate(){
        let count = 1;
        this.ballData.forEach((item,index) => {
            count *=  item.value.filter(ele => ele == 1).length
        })
        this.count = count
        let percent = this.tabYuan == '元' ? 1 : this.tabYuan == '角' ? 0.1 : 0.01
        this.betPrice = this.count*2*percent
    }

    toggle(){
        console.log('dddd')
        this.visible = this.visible == 'invisable' ? 'visable':'invisable'
        this.visible == 'visable' ? $('.body-bg').fadeIn(1000) : $('.body-bg').fadeOut(1000)
    }

    openTab(){
        console.log('asss')
        if(this.tabVisible == 'invisible')
           this.tabVisible = 'visable'
        else
           this.tabVisible = 'invisible'
    }

  showToast(msg,time?,position?) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: time?time:2000,
      position: position?position:'middle'
    });
    toast.present();
  }

  
 async getCountDownTime():Promise<any>{
      let data = (await this.http.postData('/api-lotteries-h5/load-data/1/1?_t=4a2d4618e7774c19f84aa3d0b6426816', {_token:'9LTxelc7wY2XHR4L5n1XhlQ8Rwwq4mGQB42HkfWk'})).data
      console.log(data)
      this.prizeGroup = []
      this.prizeGroup.push(data.bet_max_prize_group + '-' + Number((data.user_prize_group - data.bet_max_prize_group)/data.series_amount.toFixed(2)) + '%')
      this.prizeGroup.push(data.bet_min_prize_group + '-' + Number((data.user_prize_group - data.bet_min_prize_group)/data.series_amount.toFixed(2)) + '%')
      this.chooseGroup = this.prizeGroup[0]
      return new Promise((resolve,reject) =>{
        resolve(data)
    })
  }
}
