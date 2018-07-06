import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpClientProvider } from '../http-client/http-client'
import { RestProvider } from '../rest/rest';

@Injectable()
export class HomeProvider {
  userInfo ;
  infoData = {
    unreadAnnouncements:0,
    announcements: {data:['']}
  }

  currentLottory=null

  homeData = {
    banner:[{'redirect_url':'','title':'','name':'','pic_url':''},{'redirect_url':'','title':'','name':'','pic_url':''}],
    lottoryList: {
      SSC: [{
        friend_name: "重庆时时彩",
        group: "SSC",
        id: 1,
        identifier: "CQSSC",
        series_id: 1,
        redicret_url:'SscPage',
        url: "SscPage"
      }]
    },
    lottories:[{url:''}],
    lottorys:{hot:[{friend_name:"",identifier:''}]},
  }
  lottoryCentData = {}

  constructor(public http: HttpClientProvider,public rest: RestProvider) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.lottoryInfo();
    this.homeData.lottoryList.SSC.nav = [{name:'开奖',flag:true,c:'SscKaijiangComponent'},{name:'大小',flag:false,c:'SscDaxiaoComponent'},{name:'单双',flag:false,c:'SscDanshuangComponent'}]
  }

  //彩种
  async lottoryInfo() {

    this.homeData.lottoryList = (await this.http.fetchData('/api-lotteries-h5/lottery-info')).data;

    this.homeData.lottories = []
    for (let item in this.homeData.lottoryList) {
      for (let i = 0; i < this.homeData.lottoryList[item].length; i++) {
        this.homeData.lottoryList[item][i].group = item;
        this.homeData.lottoryList[item][i].flag = false;
      }
      this.homeData.lottories.push(...this.homeData.lottoryList[item])
    }

    this.homeData.lottoryList.SSC[0].flag = true;
    // this.homeData.lottoryList.SSC.nav = [{name:'开奖',flag:true,c:'SscKaijiang'},{name:'大小',flag:false,c:'SscDaxiao'},{name:'单双',flag:false,c:'SscDanshuang'},{name:'形态',flag:false}];
    this.homeData.lottoryList['SSC'].nav = [{name:'开奖',flag:true,c:'SscKaijiangComponent'},{name:'大小',flag:false,c:'SscDaxiaoComponent'},{name:'单双',flag:false,c:'SscDanshuangComponent'}];
    this.homeData.lottoryList['11Y'].nav = [{name:'开奖',flag:true,c:'YKaijiangComponent'},{name:'号码分布',flag:false,c:'YDistributeComponent'}];
    this.homeData.lottoryList['K3'].nav = [{name:'开奖',flag:true,c:'K3KaijiangComponent'},{name:'基本走势',flag:false,c:'K3BaseTrendComponent'},{name:'形态走势',flag:false,c:'K3ShapeTrendComponent'},{name:'冷热',flag:false,c:'K3CoodHotComponent'}];
    this.homeData.lottoryList['PK10'].nav = [{name:'开奖',flag:true,c:'Pk10KaijiangComponent'},{name:'大小',flag:false,c:'Pk10daxiaoComponent'},{name:'单双',flag:false,c:'Pk10DanshuangComponent'},{name:'冠亚军和',flag:false,c:'Pk10ChanpiomComponent'},{name:'龙虎',flag:false,c:'Pk10LonghuComponent'}];
    this.homeData.lottoryList['LHC'].nav = [{name:'开奖',flag:true,c:'LhcKaijiangComponent'},{name:'生肖',flag:false,c:'LhcShengxiaoComponent'},{name:'两面/波色',flag:false,c:'LhcBoseComponent'}];


    console.log(this.homeData.lottories)
    this.loadHotLottory(this.homeData.lottories)



    console.log(this.homeData.lottories)

  }


  //通知
  async loadannouncements() {
    this.infoData.announcements = (await this.http.fetchData('/h5api-announcements')).data;
    console.log(this.infoData.announcements)
  }

  async announcementsUnreadnum() {
    if(this.userInfo){
      this.infoData.unreadAnnouncements = (await this.http.fetchData('/h5api-announcements/unreadnum?_t='+this.userInfo.auth_token)).data.num;
    }else {
      this.infoData.unreadAnnouncements = (await this.http.fetchData('/h5api-announcements/unreadnum')).data.num;
    }
  }

  //通知轮播内容
  async loadbanner() {
    this.homeData.banner = (await this.http.fetchData('/h5api-announcements/banner')).data.banner;
    console.log(this.homeData.banner)
  }

  // 获取热门彩种
  loadHotLottory(_lottory) {
    console.log(_lottory)
    this.homeData.lottorys = JSON.parse(localStorage.getItem('lottorys'));
    // this.homeData.lottorys = {"hot":[{"id":1,"series_id":1,"friend_name":"重庆时时彩","identifier":"CQSSC","group":"SSC","flag":true,"url":"SscPage"},{"id":3,"series_id":1,"friend_name":"黑龙江时时彩","identifier":"HLJSSC","group":"SSC","flag":false,"url":""},{"id":7,"series_id":1,"friend_name":"天津时时彩","identifier":"TJSSC","group":"SSC","flag":false,"url":""},{"id":72,"series_id":1,"friend_name":"夺金60秒","identifier":"JLFFC","group":"SSC","flag":false,"url":""},{"id":73,"series_id":1,"friend_name":"金星彩1.5","identifier":"JXC90S","group":"SSC","flag":false,"url":""},{"id":74,"series_id":1,"friend_name":"腾讯分分彩","identifier":"TXFFC","group":"SSC","flag":false,"url":""},{"id":2,"series_id":2,"friend_name":"山东11选5","identifier":"SD11Y","group":"11Y","flag":false,"url":""},{"id":8,"series_id":2,"friend_name":"江西11选5","identifier":"JX11Y","group":"11Y","flag":false,"url":"Xuan5Page"},{"id":9,"series_id":2,"friend_name":"广东11选5","identifier":"GD11Y","group":"11Y","flag":false,"url":""},{"id":78,"series_id":2,"friend_name":"山西11选5","identifier":"SX11Y","group":"11Y","flag":false,"url":""},{"id":79,"series_id":2,"friend_name":"安徽11选5","identifier":"AH11Y","group":"11Y","flag":false,"url":""},{"id":80,"series_id":2,"friend_name":"上海11选5","identifier":"SH11Y","group":"11Y","flag":false,"url":"KsPage"},{"id":21,"series_id":15,"friend_name":"江苏快3","identifier":"JSK3","group":"K3","flag":false,"url":""},{"id":22,"series_id":15,"friend_name":"安徽快3","identifier":"AHK3","group":"K3","flag":false,"url":""},{"id":75,"series_id":15,"friend_name":"河南快3","identifier":"HNK3","group":"K3","flag":false,"url":""},{"id":76,"series_id":15,"friend_name":"湖北快3","identifier":"HBK3","group":"K3","flag":false,"url":""},{"id":53,"series_id":19,"friend_name":"北京PK10","identifier":"BJPK10","group":"PK10","flag":false,"url":"LhcSlidePage"},{"id":61,"series_id":21,"friend_name":"香港六合彩","identifier":"LHC","group":"LHC","flag":false}],"more":[]};
    // localStorage.lottorys = JSON.stringify(this.homeData.lottorys)
    if (this.homeData.lottorys) {
      return this.homeData.lottorys;
    } else {

      this.homeData.lottorys = {hot: [], more: []};
      this.homeData.lottorys.hot = _lottory.slice(0, 15)
      this.homeData.lottorys.more = _lottory.slice(-3)
      localStorage.lottorys = JSON.stringify(this.homeData.lottorys)
    }
  }


  //获取最近90期的数据
  async loadIssues(lottoryId){
    return this.lottoryCentData = (await this.http.fetchData('/api-lotteries-h5/load-issues/'+lottoryId+'?count=90'))
    // console.log(this.lottoryCentData)
  }

}





