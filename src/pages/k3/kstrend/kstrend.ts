import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {KstrendAction} from './kstrend-action';
import * as $ from 'jquery';
import {BaseToolProvider} from '../../../providers/base-tool/base-tool';
import {KsBasketPage} from '../ks-basket/ks-basket';
import {ViewController} from "ionic-angular/navigation/view-controller";
import * as Hammer from 'hammerjs';

@IonicPage()
@Component({
  selector: 'page-kstrend',
  templateUrl: 'kstrend.html',
})
export class KstrendPage extends KstrendAction {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public base: BaseToolProvider) {
    super();
  }

  arr = [9, 13, 14, 6, 10, 15, 16, 3, 8, 12, 17, 12, 15, 18, 5, 15];

  ngOnInit(): void {

    // this.initView(this.navParams.get('wanfa'),1);
    // this.base.requestJiangQiData('21', '3').then(() => {
    //     $('.alert-con').html(this.navParams.get('htm'));
    //     // $('.alert-con').html(localStorage.kshtml);
    //     console.log('请求结束～～～');
    //     // this.initView(this.navParams.get('wanfa'),1);
    //     this.changePlaySelect();
    //   }
    // );
    //  getPrevious
    // first
    // last
    // indexOf
    //  length(): number;

    console.log('this.navCtrl.first()===' + this.navCtrl.first())
    console.log('this.navCtrl.getPrevious==' + this.navCtrl.getPrevious())
    console.log('this.navCtrl.last()==' + this.navCtrl.last())
    console.log('this.navCtrl.length()==' + this.navCtrl.length())


    $('.alert-con').html(this.navParams.get('htm'));
    this.initView(this.navParams.get('wanfa'),1);
    this.changePlaySelect();
  }

  ionViewDidLoad() {

    // this.initView(this.navParams.get('wanfa'),1);
    console.log('this.navParams.get(\'wanfa\')====' + this.navParams.get('wanfa'));

    // $('.alert-con').html(this.navParams.get('htm'));
    this.base.requestJiangQiData('21', '3', 'trend').then(() => {
      // $('.alert-con').html(this.navParams.get('htm'));
      // $('.alert-con').html(localStorage.kshtml);
      console.log('请求结束～～～');
      // this.initView(this.navParams.get('wanfa'),1);
      //   this.changePlaySelect();
    });

    this.initany();
    console.log(55555);

    this.drawtrend();
  }

  drawtrend() {

    // var c = document.getElementById("canvas");
    // var table1  = document.getElementById("testtd");
    // var  TDS = table1.getElementsByTagName("td");

    // var cxt2= c.getContext("2d");
    // cxt2.strokeStyle = 'rgba(255,0,0,0.5)';


    // var icount =0;
    // for(var i=0; i < TDS.length ; i++)
    // {
    //   if (TDS[i].innerHTML == "0")
    //   {
    //     var H = TDS[i].offsetHeight/2;
    //     if (icount==0){
    //       cxt2.moveTo(TDS[i].offsetLeft,TDS[i].offsetTop + H) ;
    //     }
    //     else
    //     {
    //       cxt2.lineTo(TDS[i].offsetLeft,TDS[i].offsetTop + H) ;
    //     }
    //     icount = icount +1;
    //   }
    // }

    // var obj = $('.hzzs-container .his-line').eq(0).find(".t-5");
    // cxt2.moveTo(obj.offsetLeft,obj.offsetTop + 30)
    //  obj = $('.hzzs-container .his-line').eq(1).find(".t-7");
    // cxt2.lineTo(obj.offsetLeft,obj.offsetTop + 20);
    //  obj = $('.hzzs-container .his-line').eq(3).find(".t-3");
    // cxt2.lineTo(obj.offsetLeft,obj.offsetTop + 20);

    // cxt.beginPath();
    // cxt.moveTo(f_left - cvs_left, f_top - cvs_top);
    // cxt.lineTo(t_left - cvs_left, t_top - cvs_top);
    // cxt.closePath();
    // cxt.stroke();
    // cxt.restore();
    // $('#canvas').append(cvs);
    // cxt2.stroke();


    // var cvs = document.createElement("canvas");
    // cvs.width = 100 ;//Math.abs(f_left - t_left) < w ? w : Math.abs(f_left - t_left);
    // cvs.height = 200; //Math.abs(f_top - t_top);
    // cvs.style.top = 150+'px';//cvs_top + parseInt(f_height / 2) + "px";
    // cvs.style.left = 250+'px';  //cvs_left + parseInt(f_width / 2) + "px";
    // cvs.style.position = "absolute";
    // var cxt = cvs.getContext("2d");
    // cxt.save();
    // cxt.strokeStyle = '#ff6600';
    // cxt.lineWidth = 5;
    // cxt.lineJoin = "round";
    // cxt.beginPath();
    // cxt.moveTo(140, 250);
    // cxt.lineTo(50, 200);
    // cxt.closePath();
    // cxt.stroke();
    // cxt.restore();
    // $('#canvas').append(cvs);
    //
    // var cvs = document.createElement("canvas");
    // cvs.width = 100 ;//Math.abs(f_left - t_left) < w ? w : Math.abs(f_left - t_left);
    // cvs.height = 200; //Math.abs(f_top - t_top);
    // cvs.style.top = 50+'px';//cvs_top + parseInt(f_height / 2) + "px";
    // cvs.style.left = 150+'px';  //cvs_left + parseInt(f_width / 2) + "px";
    // cvs.style.position = "absolute";
    // var cxt = cvs.getContext("2d");
    // cxt.save();
    // cxt.strokeStyle = '#ff6600';
    // cxt.lineWidth = 5;
    // cxt.lineJoin = "round";
    // cxt.beginPath();
    // cxt.moveTo(40, 150);
    // cxt.lineTo(250, 100);
    // cxt.closePath();
    // cxt.stroke();
    // cxt.restore();
    // $('#canvas').append(cvs);


    // var w = 25, bg = '#ff6600';
    // for (var j = 0; j < 16; j++) {
    //   // (Math.random() * (max - min) | 0) + min
    //   var random = Math.floor(Math.random() * (16) + 3);
    //   var tid = $('.hzzs-container .his-line').eq(j).find(".t-" + random);
    //   random = Math.floor(Math.random() * (16) + 3);
    //   var fid = $('.hzzs-container .his-line').eq(j + 1).find(".t-" + random);
    //   var f_width = fid.outerWidth();
    //   var f_height = fid.outerHeight();
    //   var f_offset = fid.offset();
    //   // var f_top = f_offset.top;
    //   // var f_left = f_offset.left;
    //   var f_top = fid[0].offsetTop;
    //   var f_left = fid[0].offsetLeft;
    //   var t_offset = tid.offset();
    //   // var t_top = t_offset.top;
    //   // var t_left = t_offset.left;
    //   var t_top = tid[0].offsetTop;
    //   var t_left = tid[0].offsetLeft;
    //   var cvs_left = Math.min(f_left, t_left);
    //   var cvs_top = Math.min(f_top, t_top);
    //   tid.css("background", bg).css("color", "red");
    //   fid.css("background", bg).css("color", "red");
    //   var cvs = document.createElement("canvas");
    //   cvs.width = Math.abs(f_left - t_left) < w ? w : Math.abs(f_left - t_left);
    //   cvs.height = Math.abs(f_top - t_top);
    //   cvs.style.top = cvs_top + parseInt(f_height / 2) + "px";
    //   cvs.style.left = cvs_left + parseInt(f_width / 2) + "px";
    //   cvs.style.position = "absolute";
    //   var cxt = cvs.getContext("2d");
    //   cxt.save();
    //   cxt.strokeStyle = '#ff6600';
    //   cxt.lineWidth = 4;
    //   cxt.lineJoin = "round";
    //   cxt.beginPath();
    //   cxt.moveTo(f_left - cvs_left, f_top - cvs_top);
    //   cxt.lineTo(t_left - cvs_left, t_top - cvs_top);
    //   cxt.closePath();
    //   cxt.stroke();
    //   cxt.restore();
    //   $('#canvas').append(cvs);
    // }

    // var w = 20, c = '#ff6600', bg = '#d5d5d5', div = 'canvas';
    // $("#test1").after("<hr />");


    // var list = ids.split(",");
    // $('.his-line').eq(4).find(".t-7").after("<hr />");
    // for (var j = 15; j > 0; j--) {
    // var tid = $("#" + list[j]);
    // var fid = $("#" + list[j - 1]);
    // (Math.random() * (max - min) | 0) + min
    //  var random =  Math.floor(Math.random()*(16)+3);
    //   var tid = $('.his-line').eq(j).find(".t-" + random);
    //   var fid = $('.his-line').eq(j - 1).find(".t-" + random);
    //   var f_width = fid.outerWidth();
    //   var f_height = fid.outerHeight();
    //   var f_offset = fid.offset();
    //   // var f_top = f_offset.top;
    //   // var f_left = f_offset.left;
    //   var f_top = fid.offsetTop;
    //   var f_left = fid.offsetLeft;
    //   var t_offset = tid.offset();
    //   // var t_top = t_offset.top;
    //   // var t_left = t_offset.left;
    //   var t_top = tid.offsetTop;
    //   var t_left = tid.offsetLeft;
    //   var cvs_left = Math.min(f_left, t_left);
    //   var cvs_top = Math.min(f_top, t_top);
    //   tid.css("background", bg).css("color", "red");
    //   fid.css("background", bg).css("color", "red");
    //   var cvs = document.createElement("canvas");
    //   cvs.width = Math.abs(f_left - t_left) < w ? w : Math.abs(f_left - t_left);
    //   cvs.height = Math.abs(f_top - t_top);
    //   cvs.style.top = cvs_top + parseInt(f_height / 2) + "px";
    //   cvs.style.left = cvs_left + parseInt(f_width / 2) + "px";
    //   cvs.style.position = "absolute";
    //   var cxt = cvs.getContext("2d");
    //   cxt.save();
    //   cxt.strokeStyle = c;
    //   cxt.lineWidth = 1;
    //   cxt.lineJoin = "round";
    //   cxt.beginPath();
    //   cxt.moveTo(f_left - cvs_left, f_top - cvs_top);
    //   cxt.lineTo(t_left - cvs_left, t_top - cvs_top);
    //   cxt.closePath();
    //   cxt.stroke();
    //   cxt.restore();
    //   $("#" + div).append(cvs);
    //
    // }

  }

  initany() {

    console.log(44444);

    // var myElement = document.getElementsByClassName('ion-con')[0];
    // var mc = new Hammer(myElement);
//  mc.on("pan swipe panleft panright panstart panmove  ", function(ev) {
//    console.log(111111222);
//    console.log(ev.type);
//    // var obj =  $('.hzzs-container .t-3').eq(0);
//    var obj =  $('.hzzs-container');
//    $('.ks-tab-second').scrollLeft(obj.scrollLeft());
//    this.left = obj.scrollLeft();
//    // var marginLeft = obj.css('margin-left');
//    // console.log('marginLeft==='+marginLeft)
//    // console.log('left==='+left)
//    // $('.ks-tab-second').scrollLeft(left);
//    // $('.ks-tab-second').scrollTo(offserleft,0);
//    // $('.top-line .t-3').scrollTo(offserleft,0);
// // if(offserleft>0){
// //   $('.top-line .t-3').css('margin-left','-'+offserleft+'px');
// // }else{
// //   $('.top-line .t-3').css('margin-left',offserleft-48+'px');
// // }
//  });

    // mc.on("panstart", function(ev) {
    //   $('.ks-tab-second').scrollLeft($('.hzzs-container').scrollLeft());
    // });
    // mc.on("panend pancancel", function(ev) {
    //   $('.ks-tab-second').scrollLeft($('.hzzs-container').scrollLeft());
    // });



    // var startx, starty, left;
    // document.getElementsByClassName('hmfb-container')[0].addEventListener("touchstart",
    //   function (e) {
    //     startx = e.touches[0].pageX;
    //     // starty = e.touches[0].pageY;
    //     // var obj =  $('.hzzs-container .t-3').eq(0);
    //     var obj = $('.hmfb-container');
    //     left = obj.scrollLeft();
    //     $('.ks-tab-second').scrollLeft($('.hmfb-container').scrollLeft());
    //   }, true);
    // document.getElementsByClassName('hmfb-container')[0].addEventListener("touchmove",
    //   function (e) {
    //     $('.ks-tab-second').scrollLeft($('.hmfb-container').scrollLeft());
    //     // $('.ks-tab-second').scrollLeft(left);
    //   }, true)
    // document.getElementsByClassName('hmfb-container')[0].addEventListener("touchend",
    //   function (e) {
    //     $('.ks-tab-second').scrollLeft($('.hmfb-container').scrollLeft());
    //     // $('.ks-tab-second').scrollLeft(left);
    //   }, true)



    var startx, starty, left;
    document.getElementsByClassName('ion-con')[0].addEventListener("touchstart",
      function (e) {
        startx = e.touches[0].pageX;
        // starty = e.touches[0].pageY;
        // var obj =  $('.hzzs-container .t-3').eq(0);
        var obj = $('.hzzs-container');
        left = obj.scrollLeft();
        $('.ks-tab-second').scrollLeft($('.hmfb-container').scrollLeft());
        $('.ks-tab-second').scrollLeft($('.hzzs-container').scrollLeft());
      }, true);
    document.getElementsByClassName('ion-con')[0].addEventListener("touchmove",
      function (e) {
        $('.ks-tab-second').scrollLeft($('.hmfb-container').scrollLeft());
        $('.ks-tab-second').scrollLeft($('.hzzs-container').scrollLeft());
        // $('.ks-tab-second').scrollLeft(left);
      }, true)
    document.getElementsByClassName('ion-con')[0].addEventListener("touchend",
      function (e) {
        $('.ks-tab-second').scrollLeft($('.hmfb-container').scrollLeft());
        $('.ks-tab-second').scrollLeft($('.hzzs-container').scrollLeft());
        // $('.ks-tab-second').scrollLeft(left);
      }, true)

  }


  ionViewDidLeave() {
    clearInterval(this.base.timeIddd);
    //记录当前topselelctview
    // localStorage.kshtml = $('page-kstrend .alert-con').html();
    // console.log('localStorage.kshtml===' + localStorage.kshtml);

  }

  ionViewWillLeave() {
    clearInterval(this.base.timeIddd);
    //记录当前topselelctview
    localStorage.kshtml = $('page-kstrend .alert-con').html();
    localStorage.wanfa = $('page-kstrend .wanfa').text();
    console.log('localStorage.kshtml===' + localStorage.kshtml);

  }

  // dropdownClick(){
  //
  //
  //
  // }

  pushToBasket() {


    // 未 选号 并且 缓存未空 -->  按钮灰色
    // 否则 -->  按钮亮色

    // localStorage.moneyunit;

    // var ballstr = localStorage.balls;


    //购彩蓝 balls 数组添加数据 ，然后push

    this.addOrderEvent();


    this.navCtrl.push(KsBasketPage, {})

  }

  addOrderEvent() {

    var zhu = $('.ks-bom-ul .active').length;
    // if (zhu === 0) return;
    if (zhu > 0) {

      let wanfa = $('page-kstrend .wanfa').text();
      if (wanfa.search('二同号') != -1) {
          zhu = zhu*5;
        }
      // if (wanfa.search('二同号') != -1) {
      //   this.dealWithBallDataWithErth(zhu*5);
      // } else {
        this.dealWithBallData(zhu);
      // }

      let balll = JSON.parse(localStorage.balls);
      // $('.bottom-r').css('background', '');
      this.cleanBalls();

    } else {
      //弹框提示
      alert('请选号~');
    }

  }


  dealWithBallData(zhu){

    let wayId = 1;
    let ballStr = this.getBallStr();
    let wanfa = $('page-kstrend .wanfa').text();
    var moneyunit = localStorage.moneyunit;
    var jsid = 1;
    if (localStorage.balls != null) {
      jsid = JSON.parse(localStorage.balls).length + 1;
    }
    let betinfo =
      {
        "jsId": jsid,
        "wayId": wayId,
        "ballStr": ballStr,
        "viewBalls": ballStr,
        "num": zhu,
        "moneyunit": moneyunit,
        "position": [],
        "multiple": 1,
        "onePrice": 2,
        "prize_group": 1,
        "wanfa": wanfa,
        "price": zhu * 2 * moneyunit
      };
    let balls = [];
    let ballsitem = "";
    let ball = localStorage.balls;
    console.log('添加号码时候localStorage.bal==='+localStorage.balls);
    // if (ball == null) {
    if (!localStorage.balls) {

      balls.push(betinfo);
      ballsitem = JSON.stringify(balls);
    } else {
      let balldata = JSON.parse(ball);
      //检测号码重复性～～
      if (this.isNumDuplication(betinfo).j == 1) {

        ballsitem = JSON.stringify(this.isNumDuplication(betinfo).data);
      } else {

        balldata.push(betinfo);
        ballsitem = JSON.stringify(balldata);
      }
    }
    localStorage.balls = ballsitem;

  }


  isNumDuplication(betinfo) {
    // 先得到新增号码
    // 遍历 存在号码数组
    var j = 0;
    var ballstr = betinfo.ballStr;
    var balldata = JSON.parse(localStorage.balls);
    for (var i = 0; i < balldata.length; i++) {
      var str = balldata[i].ballStr;
      if (str == ballstr) {
        j++;
        balldata[i].num = parseInt(balldata[i].num) + parseInt(betinfo.num);
        balldata[i].price += betinfo.price;
      }
    }
    var result = {j: j, data: balldata};
    return result;
  }


  getBallStr() {
    // $('.ks-bom-ul .active').length;

    var len = $('.ks-bom-ul .active').length;
    var arr = [], str;

    let wanfa = $('page-kstrend .wanfa').text();
    if (wanfa.search('二同号') != -1) {
      for (var i = 0; i < len; i++) {
        var txt = $('.ks-bom-ul .active').eq(i).attr('data-index');
        arr.push(txt);
      }
      str = arr.join('|');
    }else{
      for (var i = 0; i < len; i++) {
        var txt = $('.ks-bom-ul .active').eq(i).text();
        arr.push(parseInt(txt));
      }
      str = arr.join('|');//112|223|334
    }

    return str;

  }


  cleanBalls(){

    $('.ks-bom-ul .active').removeClass('active');

  }



}
