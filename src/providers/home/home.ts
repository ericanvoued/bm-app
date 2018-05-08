import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeProvider {
  HomeData = {
    banner:{
      url:['javascript:;','javascript:;','javascript:;'],
      imgSrc:['assets/home/banner0.png','assets/home/banner0.png','assets/home/banner0.png'],
      title:['博猫游戏banner1','博猫游戏banner2','博猫游戏banner3']
    },
    info:{
      url:['javascript:;','javascript:;','javascript:;','javascript:;'],
      preView:[
        '1微信支付已经升级，请更新后使用微信支付已经升级，请更新后使用微信支付已经升级，请更新后使用',
        '2微信支付已经升级，请更新后使用',
        '3微信支付已经升级，请更新后使用',
        '4恭喜123xi65898t玩家在博猫一分彩赢得40000元'
      ],
      title:[
        '1关于春节彩金卡延顺公告。',
        '2关于春节彩金卡延顺公告。',
        '3关于春节彩金卡延顺公告。',
        '4关于春节彩金卡延顺公告。'
      ],
      text:[
        ['1为了更好的提升用户体验，截至2月14日','博猫用户账户持有过期时间在春节期 间(2018年2月15日0:00—2月21日24:00)的彩金卡，统一延期过期7天。','祝您春节快乐！'],
        ['2为了更好的提升用户体验，截至2月14日，博猫用户账户持有过期','间在春节期 间(2018年2月15日0:00—2月21日24:00)的彩金卡，统一延期过期7天。','祝您春节快乐！'],
        ['3为了更好的提升用户体验，截至2月14日，博猫用户账户持有过期时间在春节期 间(2018年2月15日0:00—2月21日24:00)的彩金卡，统一延期过期7天。','祝您春节快乐！'],
        ['4为了更好的提升用','体验，截至2月14日，博猫用户账户持有过期时间在春节期 间(2018年2月15日0:00—2月21日24:00)的彩金卡，统一延期过期7天。','祝您春节快乐！']
      ],
      team:[
        '博猫彩票运营团队1',
        '博猫彩票运营团队2',
        '博猫彩票运营团队3',
        '博猫彩票运营团队4'
      ],
      date:[
        '2018年2月11日',
        '2018年2月12日',
        '2018年2月13日',
        '2018年2月14日'
      ]
    },
    lottorys:[
      {
        url:'javascript:;',
        imgSrc:'assets/home/cqssc.png',
        title:'重庆时时彩',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/jx11of5.png',
        title:'江西11选5',
        stopSale:true
      },{
        url:'javascript:;',
        imgSrc:'assets/home/jsk3.png',
        title:'江苏快三',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/hnk3.png',
        title:'河南快3',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/xglhc.png',
        title:'香港六合彩',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/txffc.png',
        title:'腾讯分分彩',
        stopSale:true
      },{
        url:'javascript:;',
        imgSrc:'assets/home/hbk3.png',
        title:'湖北快三',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/sh11of5.png',
        title:'上海11选5',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/bjpk10.png',
        title:'北京PK10',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/pl5.png',
        title:'排列五',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/dj60s.png',
        title:'夺金60s',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/sd11of5.png',
        title:'山东11选5',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/tjssc.png',
        title:'天津时时彩',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/ah11of5.png',
        title:'安徽11选5',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/ahk3.png',
        title:'安徽快三',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/pl3.png',
        title:'排列三',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/fc3D.png',
        title:'福彩3D',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/jx1.5.png',
        title:'金星1.5分彩',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/sd11of5.png',
        title:'山东11选5',
        stopSale:false
      },{
        url:'javascript:;',
        imgSrc:'assets/home/tcp3:5.png',
        title:'体彩p3/p5',
        stopSale:false
      }
    ]
  }

  constructor(public http: HttpClient) {

  }
}





