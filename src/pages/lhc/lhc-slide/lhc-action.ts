import * as $ from 'jquery';

// import {Config} from './config';
// import {NavParams} from "ionic-angular";
import * as Hammer from 'hammerjs';

export class LhcAction {

  ani = {

    shu: ['10', '22', '34', '46'],
    niu: ['9', '21', '33', '45'],
    hu: ['8', '20', '32', '44'],
    tu: ['7', '19', '31', '43'],
    long: ['6', '18', '30', '42'],
    she: ['5', '17', '29', '41'],
    ma: ['4', '16', '28', '40'],
    yang: ['3', '15', '27', '39'],
    hou: ['2', '14', '26', '38'],
    ji: ['1', '13', '25', '37', '49'],
    gou: ['12', '24', '36', '48'],
    pig: ['11', '23', '35', '47']

  };


  // initEffect() {
  //
  //   this.requestData();
  //   this.initView();
  //
  //   this.tmBallClick();
  //   this.tmboxBtnClick();
  //   this.changePlaySelect();
  //
  //   this.betBtnClick();
  //   this.alertBetBtnClick();
  //   // this.dropdownClick();
  // }

  requestData() {
    //请求玩法

    //请求奖期

  }

  // UI总结：
  // 1， 特码，  正码，  不中
  // 2， 半波
  // 3， 生肖
  // 4， 尾数

  initView() {

    // $('.after-select .after-con').css('display','none');
    // $('.after-select .after-con').eq(0).css('display','block');
    this.requestData();
    this.tmBallClick();
    this.tmboxBtnClick();
    this.changePlaySelect();
    this.betBtnClick();
    this.alertBetBtnClick();

    //取消按钮
    this.alertCancelBtnClick();

    this.cleanBtnClick();
    this.bb_boxBtnClick();
    this.bb_BallClick();
    this.ani_BallClick();
    this.ws_BallClick();
    this.points_BallClick();

    // var _this = this, startX, startY, endX, endY, distanceX, distanceY;

    this.initHisBox();

    // if($('.lhc-content-child .section.active').offset().top < 159){
    //   $(".his-box").stop().animate({height:"0px"},100);
    // }else{
    //   $(".his-box").stop().animate({height:"100px"},100);
    // }

    // $(".lhc-content-child")
    //   .hammer({
    //     // 对DOM进行一些初始化，这里可以加入一些参数
    //   })
    //   .bind("tap", function(ev) {
    //     console.log(4444444);
    //   });


  }

  initHisBox(){

    var startx, starty;
    //获得角度
    function getAngle(angx, angy) {
      return Math.atan2(angy, angx) * 180 / Math.PI;
    };
    //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
    function getDirection(startx, starty, endx, endy) {
      var angx = endx - startx;
      var angy = endy - starty;
      var result = 0;
      //如果滑动距离太短
      if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
        return result;
      }
      var angle = getAngle(angx, angy);
      console.log('angle==' + angle);
      if (angle >= -135 && angle <= -45) {
        result = 1;
      } else if (angle > 45 && angle < 135) {
        result = 2;
      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
      } else if (angle >= -45 && angle <= 45) {
        result = 4;
      }
      return result;
    }
    //手指接触屏幕
    document.addEventListener("touchstart", function (e) {
      startx = e.touches[0].pageX;
      starty = e.touches[0].pageY;
    }, false);
    //手指离开屏幕
    document.addEventListener("touchend", function (e) {
      var endx, endy;
      endx = e.changedTouches[0].pageX;
      endy = e.changedTouches[0].pageY;
      var direction = getDirection(startx, starty, endx, endy);

      var len = $('.his-box .his-line').length; //28px

      // console.log('len==='+len);

      // 小于等于 5条数据 -->  下滑 ， 数据 <=5 ,  不能继续下滑
      // 大于 5 条，小于 10 条 -->
      var his  = $(".his-box").css('height');
      switch (direction) {
        case 0:
          console.log("未滑动");
          break;
        case 1://向上

          //  <=140px    ， -->  0px，
          //  >= 140px &&    140px

          if ( parseInt(his) <= 165) {
            $(".his-box").animate({height: "0px"}, 100);
            $('.lhc-content-child .scroll-content').css('overflow', '');
          } else if (parseInt(his) >= 165) {
            $(".his-box").stop().animate({height: "165px"}, 100);
            $('.lhc-content-child .scroll-content').css('overflow', 'hidden');
          }

          // $(".his-box").animate({height:"0px"},100);
          console.log($(".his-box").css('height'));

          break;
        case 2://向下
          // <5 && 0px    ， -->len x 28 px + 25px，
          //  >= 5 && 0px  ， --> 140px
          //           >=140px &&   >5  &&  <10 --> 140px + (len-5)*28
          //          >=10   --> 280px

          if ($('.lhc-content-child .section.active').offset().top < 159) {  //scroll上滑后下 滑动时候
            $(".his-box").stop().animate({height: "0px"}, 0);
            return;
          }
          console.log('his=='+his);
          console.log('his=='+parseInt(his));
          if ($(".his-box").css('height') == '0px' && len<5 ) {
            var  h =  len*28 + 25;
            console.log('h==='+h);
            $(".his-box").animate({height: h+'px'}, 100);

          } else if ($(".his-box").css('height') == '0px' && len >=5) {
//28*5 + 25 px
            $(".his-box").animate({height: "165px"}, 100);

          } else if (parseInt(his) >= 165 && len <10) {

            var h = 165 + (len-5)*28;
            $(".his-box").animate({height: h+"px"}, 100);
          }else if (len >=10) {
//280 + 25
            $(".his-box").animate({height: "305px"}, 100);
          }

          $('.lhc-content-child .scroll-content').css('overflow', 'hidden');
          // console.log($('.lhc-content-child .section.active').offset().top);
          break;

        default:
      }
    }, false);


  }

  dropdownClick() {

    $('.body-bg').css('display', 'block');
    $('.pageMenuSlides').css('display', 'none');
    $('.alert-con').css('display', 'block');

    $('.status-title').css('display', 'none');
    $('.status-time').css('display', 'none');
    $('.status-box').css('display', 'none');

  }

  changePlaySelect() {

    let _this = this;
    //主玩法选择
    $('.play-list .play-black').each(function () {
      $(this).on('click', function () {

        $('.play-list .play-black').removeClass('play-yellow');
        $(this).addClass('play-yellow');
        $('.after-select .after-con').removeClass('active');
        $('.after-select .after-con').eq($(this).parent().index()).addClass('active');

      })
    });
    //子玩法选择
    $('.after-list .play-black').each(function () {

      $(this).on('click', function () {

        //清空当前页面选中
        var wanfa = $('.wanfa').text();
        if (wanfa.search('半波') != -1) {

          $('.currunt .ball-box .red-active').removeClass('red-active');
          $('.currunt .ball-box .green-active').removeClass('green-active');
          $('.currunt .ball-box .blue-active').removeClass('blue-active');
          //还要清空自选数据。。。

        } else if (wanfa.search('生肖') != -1) {
          $('.currunt .ball-box .red-active').removeClass('red-active');
          $('.currunt .ball-box .green-active').removeClass('green-active');
          $('.currunt .ball-box .blue-active').removeClass('blue-active');
          //还要清空自选数据。。

        } else if (wanfa.search('尾数') != -1) {
          $('.currunt .ball-box .red-active').removeClass('red-active');
          $('.currunt .ball-box .green-active').removeClass('green-active');
          $('.currunt .ball-box .blue-active').removeClass('blue-active');
          //还要清空自选数据。。

        }

        $('.currunt').removeClass('currunt');
        $('.after-list .play-black').removeClass('play-yellow');
        $(this).addClass('play-yellow');

        var title = $('.wanfa').text();

        if (title.search('不中') == -1 || title.search('六肖') == -1) {
          _this.recoverTopSlide();

          console.log('.transform=='+$('.slide_one .swiper-wrapper').css('transform'));
          console.log('localStorage.transform=='+localStorage.transform);
          console.log('isfast==='+_this.isfast());

          if(!_this.isfast() && $('.slide_one .swiper-wrapper').css('transform') == 'matrix(1, 0, 0, 1, 0, 0)'){

            $('.slide_one .swiper-wrapper').css('transform', localStorage.transform);
          }
        }

        if (title.search('码') != -1) {
          $('.lhc-tm .t-box').removeClass('current');
        }

        var title1 = $('.play-list .play-yellow').text();
        var title2 = $('.after-list .play-yellow').text();

        $('.wanfa').text(title2);

        _this.changeBallUi(title1);

        $('.body-bg').css('display', 'none');
        $('.pageMenuSlides').css('display', 'block');
        $('.alert-con').css('display', 'none');
        $('.status-title').css('display', 'block');
        $('.status-time').css('display', 'block');
        $('.status-box').css('display', 'block');

      })

    });
  }

  ui改变

  changeBallUi(title) {


    let _this = this;
    var wanfa = $('.wanfa').text();
    $('.section').removeClass('active');

    switch (title) {

      case '特码':
        $('.lhc-tm').addClass('active');
        $('.self-tm').addClass('active');
        $('.lhc-tm .t-box').removeClass('hide');
        break;

      case '正码':
        $('.lhc-tm').addClass('active');
        $('.self-tm').addClass('active');
        $('.lhc-tm .t-box').removeClass('hide');
        break;

      case '不中':
        $('.lhc-tm').addClass('active');
        $('.self-tm').addClass('active');
        _this.removeTopSlide();
        //matrix(1, 0, 0, 1, 0, 0),matrix(1, 0, 0, 1, -414, 0)
        if( $('.slide_one .swiper-wrapper').css('transform') != 'matrix(1, 0, 0, 1, 0, 0)'){

          console.log(11111);
          console.log('transform=='+$('.slide_one .swiper-wrapper').css('transform'));
          localStorage.transform = $('.slide_one .swiper-wrapper').css('transform');
          $('.slide_one .swiper-wrapper').css('transform','matrix(1, 0, 0, 1, 0, 0)');

        }

        $('.lhc-tm .t-box').addClass('hide');
        break;

      case '半波':
        $('.lhc-bb').addClass('active');
        $('.self-bb').addClass('active');

        break;
      case '生肖':
        $('.lhc-sx').addClass('active');
        $('.self-sx').addClass('active');
        console.log(wanfa);
        if (wanfa.search('六肖') != -1) {
          _this.removeTopSlide();
        }

        break;
      case '尾数':
        $('.lhc-ws').addClass('active');
        $('.self-ws').addClass('active');
        break;
      case '总分':
        $('.lhc-points').addClass('active');
        $('.self-points').addClass('active');
        break;

      default:
      // createlhc_tm();
      // tmboxBtnClick();
      // tmBallClick();
    }

    //   localStorage.removeItem('balls');
    //   var wayId = $('.after-select .play-yellow').next().attr('id');
    //   localStorage.wayId = wayId;
    //   clean();

  }


  tmBallClick() {

    $('.b-box .tm-unit').on('click', function () {
      $(this).toggleClass('currunt');
    });
  }

  tmboxBtnClick() {

    // 大小单双 和 生肖 互斥
    // 生肖 可以 多选
    // 大小单双
    let _this = this;
    $('.t-box .dxds').on('click', function () {

      $('.t-box li').removeClass('current');
      $(this).addClass('current');

      var obj = $('.b-box');
      obj.find('.tm-unit').removeClass('currunt');
      // obj.find('.confirm-number').remove();
      var clas = $(this).attr('class');
      console.log(clas);
      clas = clas.split(' ')[1];
      var len = obj.find('.ball').length;
      switch (clas) {
        case 'da':
          var num = Math.ceil(len / 2) - 1;
          obj.find('.tm-unit:gt(' + num + ')').addClass('currunt');
          break;
        case 'xiao':
          var num = Math.ceil(len / 2);
          obj.find('.tm-unit:lt(' + num + ')').addClass('currunt');
          break;
        case 'dan':
          obj.find('.tm-unit:even').addClass('currunt');
          break;
        case 'ou':
          obj.find('.tm-unit:odd').addClass('currunt');
          break;
      }
    });

    $('.t-box .ani').on('click', function () {

      //2在 生肖上  累加
      //1先清除 大小单双的选中 及球选中
      var flag = 1;
      var obj = $('.b-box');
      if ($('.t-box .dxds').hasClass('current')) {
        $('.t-box .dxds').removeClass('current');
        obj.find('.tm-unit').removeClass('currunt');
      }

      //3点击两次取消
      if ($(this).hasClass('current')) {
        flag = 2;
        $(this).removeClass('current');
      } else {
        $(this).addClass('current');
      }

      var clas = $(this).attr('class');
      console.log(clas);
      clas = clas.split(' ')[1];
      // var len = obj.find('.ball').length;
      switch (clas) {
        case 'shu':
          _this.dealWithTmAniBoxClick(_this.ani.shu, flag);
          break;
        case 'niu':
          _this.dealWithTmAniBoxClick(_this.ani.niu, flag);
          break;
        case 'hu':
          _this.dealWithTmAniBoxClick(_this.ani.hu, flag);
          break;
        case 'tu':
          _this.dealWithTmAniBoxClick(_this.ani.tu, flag);
          break;
        case 'long':
          _this.dealWithTmAniBoxClick(_this.ani.long, flag);
          break;
        case 'she':
          _this.dealWithTmAniBoxClick(_this.ani.she, flag);
          break;
        case 'ma':
          _this.dealWithTmAniBoxClick(_this.ani.ma, flag);
          break;
        case 'yang':
          _this.dealWithTmAniBoxClick(_this.ani.yang, flag);
          break;
        case 'hou':
          _this.dealWithTmAniBoxClick(_this.ani.hou, flag);
          break;
        case 'ji':
          _this.dealWithTmAniBoxClick(_this.ani.ji, flag);
          break;
        case 'gou':
          _this.dealWithTmAniBoxClick(_this.ani.gou, flag);
          break;
        case 'pig':
          _this.dealWithTmAniBoxClick(_this.ani.pig, flag);
          break;
      }

      // _this.dealWithManyBallData();
      // _this.calculateNum();
    });

  }

  /*大小单双生肖按钮点击*/
  dealWithManyBallData() {

    let _this = this;
    var type = $('.wanfa').text();

    if (_this.isfast()) {

      var len;
      if (type.search('特码') != -1 || type.search('正') != -1) {

        len = $('.lhc-tm .b-box .currunt').length;
      } else if (type.search('波') != -1) {
        len = $('.lhc-bb .currunt').length;
      } else if (type.search('肖') != -1) {
        len = $('.lhc-sx .currunt').length;
      } else if (type.search('尾') != -1) {
        len = $('.lhc-ws .currunt').length;
      } else if (type.search('总') != -1) {
        len = $('.lhc-points .currunt').length;
      } else if (type.search('不') != -1) {
        len = $('.lhc-tm .currunt').length;
      }
      for (var i = 0; i < len; i++) {
        var str, zhu, odds, txt;
        if (type.search('特码') != -1 || type.search('正') != -1 || type.search('不') != -1) {
          str = $('.b-box .currunt').eq(i).find('span').text();
          zhu = 1;
          odds = 47.7;
          txt = str;
        } else if (type.search('波') != -1) {

          str = $('.currunt').eq(i).attr('id');
          zhu = 1;
          odds = $('.currunt').eq(i).find('h2').text().split(' ')[1];
          odds = odds.substr(2, odds.length - 2);
          txt = $('.currunt').eq(i).find('h2').text().split(' ')[0];

        } else if (type.search('肖') != -1) {
          str = $('.currunt').eq(i).attr('id');
          zhu = 1;
          odds = $('.currunt').eq(i).find('h2').text().split(' ')[1];
          odds = odds.substr(2, odds.length - 2);
          txt = $('.currunt').eq(i).find('h2').text().split(' ')[0];

        } else if (type.search('尾') != -1) {

          str = $('.currunt').eq(i).attr('id');
          zhu = 1;
          odds = $('.currunt').eq(i).find('h2').text().split(' ')[1];
          odds = odds.substr(2, odds.length - 2);
          txt = $('.currunt').eq(i).find('h2').text().split(' ')[0];

        } else if (type.search('总') != -1) {

          str = $('.currunt').eq(i).attr('index');
          zhu = 1;
          odds = $('.currunt').eq(i).find('span').text();
          odds = odds.substr(3, odds.length - 3);
          txt = $('.currunt').eq(i).find('h2').text();

        }
        _this.dealWithBallData(str, zhu, odds, txt);

      }
      //自选 ～
    } else {

      var odds;
      if (type.search('特码') != -1 || type.search('正') != -1) {

        odds = '47.77';
        var obj = $('.self-tm .r-input');
        var length = obj.length;
        for (var i = 0; i < length; i++) {
          if (obj.eq(i).val() != '') {
            var str = $('.self-tm li').eq(i).find('h5').text();
            zhu = parseInt(obj.eq(i).val());
            _this.dealWitSelfBallData(str, zhu, odds, str);
          }
        }

      } else if (type.search('波') != -1) {

        var obj = $('.self-bb .r-input');
        var length = obj.length;
        for (var i = 0; i < length; i++) {
          if (obj.eq(i).val() != '') {
            var str = $('.self-bb li').eq(i).find('h5').attr('index');
            var txt = $('.self-bb li').eq(i).find('h5').text();
            var odds = $('.self-bb li').eq(i).find('.odds').text();
            zhu = parseInt(obj.eq(i).val());
            _this.dealWitSelfBallData(str, zhu, odds, txt);
          }
        }

      } else if (type.search('肖') != -1) {

        var obj = $('.self-sx .r-input');
        var length = obj.length;
        for (var i = 0; i < length; i++) {
          if (obj.eq(i).val() != '') {
            var str = $('.self-sx li').eq(i).find('h5').attr('index');
            var txt = $('.self-sx li').eq(i).find('h5').text();
            var odds = $('.self-sx li').eq(i).find('.odds').text();
            zhu = parseInt(obj.eq(i).val());
            _this.dealWitSelfBallData(str, zhu, odds, txt);
          }
        }
      } else if (type.search('尾') != -1) {

        var obj = $('.self-ws .r-input');
        var length = obj.length;
        for (var i = 0; i < length; i++) {
          if (obj.eq(i).val() != '') {
            var str = $('.self-ws li').eq(i).find('h5').attr('index');
            var txt = $('.self-ws li').eq(i).find('h5').text();
            var odds = $('.self-ws li').eq(i).find('.odds').text();
            zhu = parseInt(obj.eq(i).val());
            _this.dealWitSelfBallData(str, zhu, odds, txt);
          }
        }
      } else if (type.search('总') != -1) {

        var obj = $('.self-points .r-input');
        var length = obj.length;
        for (var i = 0; i < length; i++) {
          if (obj.eq(i).val() != '') {
            var str = $('.self-points li').eq(i).find('h5').attr('index');
            var txt = $('.self-points li').eq(i).find('h5').text();
            var odds = $('.self-points li').eq(i).find('.odds').text();
            zhu = parseInt(obj.eq(i).val());
            _this.dealWitSelfBallData(str, zhu, odds, txt);
          }
        }
      } else if (type.search('不') != -1) {

      }

    }
  }



  dealWitSelfBallData(str, num, odds, text) {

    var ballStr = str;
    // var multiple = num;
    var num = num;
    // var wayId = localStorage.wayId;
    // var prize_group = localStorage.bet_max_prize_group;
    // var price = localStorage.price;
    var jsid = 1;
    if (localStorage.self_balls != null) {
      jsid = JSON.parse(localStorage.self_balls).length + 1;
    }

    var betinfo =
      {
        "jsId": jsid,
        // "wayId":wayId,
        "ball": ballStr,
        "multiple": 1,
        "num": num,
        "type": '',
        "onePrice": 1,
        // "prize_group":prize_group,
        "moneyunit": 1,
        "viewBalls": ballStr,
        "position": [],
        // "max_multiple":localStorage.max_multiple,
        'odds': odds,
        'text': text
      };

    var balls = [];
    var ballsitem = "";

    var ball = localStorage.self_balls;
    if (ball == null) {
      balls.push(betinfo);
      ballsitem = JSON.stringify(balls);
    } else {
      var balldata = JSON.parse(ball);
      balldata.push(betinfo);
      ballsitem = JSON.stringify(balldata);
    }
    localStorage.self_balls = ballsitem;
  }

  dealWithBallData(str, num, odds, text) {

    var ballStr = str;
    // var multiple = num;
    var num = num;
    // var wayId = localStorage.wayId;
    // var prize_group = localStorage.bet_max_prize_group;
    // var price = localStorage.price;
    var jsid = 1;
    if (localStorage.balls != null) {
      jsid = JSON.parse(localStorage.balls).length + 1;
    }

    var betinfo =
      {
        "jsId": jsid,
        // "wayId":wayId,
        "ball": ballStr,
        "multiple": 1,
        "num": num,
        "type": '',
        "onePrice": 1,
        // "prize_group":prize_group,
        "moneyunit": 1,
        "viewBalls": ballStr,
        "position": [],
        // "max_multiple":localStorage.max_multiple,
        'odds': odds,
        'text': text
      };

    var balls = [];
    var ballsitem = "";


    var ball = localStorage.balls;
    if (ball == null) {
      balls.push(betinfo);
      ballsitem = JSON.stringify(balls);
    } else {
      var balldata = JSON.parse(ball);
      balldata.push(betinfo);
      ballsitem = JSON.stringify(balldata);
    }
    localStorage.balls = ballsitem;

  }


  calculateNum() {

    let _this = this;
    var type = $('.wanfa').text();

    if (_this.isfast()) {

      if (type.search('波') != -1) {

        var zhu = $('.currunt').length;
        return zhu;

      } else if ((type.search('肖') != -1 && type.search('六肖') == -1) || (type.search('尾数') != -1)) {

        var zhu = $('.currunt').length;
        return zhu;

      } else if (type.search('总分') != -1) {

        var zhu = $('.currunt').length;
        return zhu;

      } else if (type.search('六肖') != -1) {

        //Cn6 遍历高亮数量，
        var len = $('.currunt').length;
        var zhu = _this.jc(len, 6);
        if (zhu < 0) {
          zhu = 0;
        }
        var moneyunit = $('#input-box').val();
        var money = parseInt(moneyunit) * zhu;
        var t = '共计：￥ ' + money + ' / ' + zhu + '注';
        $('.t-box .l').text(t);

      } else if (type.search('五不中') != -1) {

        var len = $('.currunt').length;
        var zhu = _this.jc(len, 5);
        if (zhu < 0) {
          zhu = 0;
        }
        var moneyunit = $('#input-box').val();
        var money = parseInt(moneyunit) * zhu;
        var t = '共计：￥ ' + money + ' / ' + zhu + '注';
        $('.t-box .l').text(t);

      } else if (type.search('六不中') != -1) {

        var len = $('.currunt').length;
        var zhu = _this.jc(len, 6);
        if (zhu < 0) {
          zhu = 0;
        }
        var moneyunit = $('#input-box').val();
        var money = parseInt(moneyunit) * zhu;
        var t = '共计：￥ ' + money + ' / ' + zhu + '注';
        $('.t-box .l').text(t);

      } else if (type.search('七不中') != -1) {

        var len = $('.currunt').length;
        var zhu = _this.jc(len, 7);
        if (zhu < 0) {
          zhu = 0;
        }
        var moneyunit = $('#input-box').val();
        var money = parseInt(moneyunit) * zhu;
        var t = '共计：￥ ' + money + ' / ' + zhu + '注';
        $('.t-box .l').text(t);
      } else if (type.search('八不中') != -1) {

        var len = $('.currunt').length;
        var zhu = _this.jc(len, 8);
        if (zhu < 0) {
          zhu = 0;
        }
        var moneyunit = $('#input-box').val();
        var money = parseInt(moneyunit) * zhu;
        var t = '共计：￥ ' + money + ' / ' + zhu + '注';
        $('.t-box .l').text(t);
      } else if (type.search('九不中') != -1) {
        var len = $('.currunt').length;
        var zhu = _this.jc(len, 9);
        if (zhu < 0) {
          zhu = 0;
        }
        var moneyunit = $('#input-box').val();
        var money = parseInt(moneyunit) * zhu;
        var t = '共计：￥ ' + money + ' / ' + zhu + '注';
        $('.t-box .l').text(t);

      } else if (type.search('十不中') != -1) {
        var len = $('.currunt').length;
        var zhu = _this.jc(len, 10);
        if (zhu < 0) {
          zhu = 0;
        }
        var moneyunit = $('#input-box').val();
        var money = parseInt(moneyunit) * zhu;
        var t = '共计：￥ ' + money + ' / ' + zhu + '注';
        $('.t-box .l').text(t);

      } else {
        //特码
        var zhu = $('.currunt').length;
        return zhu;
      }

      //自选～
    } else {

      if (type.search('波') != -1) {

        var zhu = 0, obj = $('.self-bb .r-input');
        var len = obj.length;
        // console.log('len='+len);
        for (var i = 0; i < len; i++) {
          if (obj.eq(i).val() != '') {
            // console.log('obj=' + obj.eq(i).val());
            zhu = zhu + parseInt(obj.eq(i).val());
          }
        }
        return zhu;

      } else if ((type.search('肖') != -1 && type.search('六肖') == -1)) {

        var zhu = 0, obj = $('.self-sx .r-input');
        var len = obj.length;
        for (var i = 0; i < len; i++) {
          if (obj.eq(i).val() != '') {
            zhu = zhu + parseInt(obj.eq(i).val());
          }
        }
        return zhu;

      } else if ((type.search('尾数') != -1)) {

        var zhu = 0, obj = $('.self-ws .r-input');
        var len = obj.length;
        for (var i = 0; i < len; i++) {
          if (obj.eq(i).val() != '') {
            zhu = zhu + parseInt(obj.eq(i).val());
          }
        }
        return zhu;

      } else if (type.search('总分') != -1) {
        var zhu = 0, obj = $('.self-points .r-input');
        var len = obj.length;
        for (var i = 0; i < len; i++) {
          if (obj.eq(i).val() != '') {
            zhu = zhu + parseInt(obj.eq(i).val());
          }
        }
        return zhu;

      } else if (type.search('六肖') != -1) {

        //Cn6 遍历高亮数量，
        var len = $('.currunt').length;
        var zhu = _this.jc(len, 6);
        if (zhu < 0) {
          zhu = 0;
        }
        var moneyunit = $('#input-box').val();
        var money = parseInt(moneyunit) * zhu;
        var t = '共计：￥ ' + money + ' / ' + zhu + '注';
        $('.t-box .l').text(t);

      } else if (type.search('五不中') != -1) {

        var len = $('.currunt').length;
        var zhu = _this.jc(len, 5);
        if (zhu < 0) {
          zhu = 0;
        }
        var moneyunit = $('#input-box').val();
        var money = parseInt(moneyunit) * zhu;
        var t = '共计：￥ ' + money + ' / ' + zhu + '注';
        $('.t-box .l').text(t);

      } else if (type.search('六不中') != -1) {

        var len = $('.currunt').length;
        var zhu = _this.jc(len, 6);
        if (zhu < 0) {
          zhu = 0;
        }
        var moneyunit = $('#input-box').val();
        var money = parseInt(moneyunit) * zhu;
        var t = '共计：￥ ' + money + ' / ' + zhu + '注';
        $('.t-box .l').text(t);

      } else if (type.search('七不中') != -1) {

        var len = $('.currunt').length;
        var zhu = _this.jc(len, 7);
        if (zhu < 0) {
          zhu = 0;
        }
        var moneyunit = $('#input-box').val();
        var money = parseInt(moneyunit) * zhu;
        var t = '共计：￥ ' + money + ' / ' + zhu + '注';
        $('.t-box .l').text(t);
      } else if (type.search('八不中') != -1) {

        var len = $('.currunt').length;
        var zhu = _this.jc(len, 8);
        if (zhu < 0) {
          zhu = 0;
        }
        var moneyunit = $('#input-box').val();
        var money = parseInt(moneyunit) * zhu;
        var t = '共计：￥ ' + money + ' / ' + zhu + '注';
        $('.t-box .l').text(t);
      } else if (type.search('九不中') != -1) {
        var len = $('.currunt').length;
        var zhu = _this.jc(len, 9);
        if (zhu < 0) {
          zhu = 0;
        }
        var moneyunit = $('#input-box').val();
        var money = parseInt(moneyunit) * zhu;
        var t = '共计：￥ ' + money + ' / ' + zhu + '注';
        $('.t-box .l').text(t);

      } else if (type.search('十不中') != -1) {
        var len = $('.currunt').length;
        var zhu = _this.jc(len, 10);
        if (zhu < 0) {
          zhu = 0;
        }
        var moneyunit = $('#input-box').val();
        var money = parseInt(moneyunit) * zhu;
        var t = '共计：￥ ' + money + ' / ' + zhu + '注';
        $('.t-box .l').text(t);

      } else {

        //特码 遍历，累加
        var zhu = 0, obj = $('.self-tm .r-input');
        var len = obj.length;
        // console.log('len='+len);
        for (var i = 0; i < len; i++) {
          if (obj.eq(i).val() != '') {
            console.log('obj=' + obj.eq(i).val());
            zhu = zhu + parseInt(obj.eq(i).val());
          }
        }
        // console.log('zhu='+zhu);
        return zhu;
      }

    }
  }


  dealWithTmAniBoxClick(arr, flag) {

    var obj = $('.b-box');
    var len = obj.find('.tm-unit').length;
    if (flag == 1) {
      for (var i = 0; i < len; i++) {
        var tt = obj.find('.tm-unit').eq(i).text();
        if (arr.indexOf(tt) != -1) {
          obj.find('.tm-unit').eq(i).addClass('currunt');
        }
      }
    } else {
      for (var i = 0; i < len; i++) {
        var tt = obj.find('.tm-unit').eq(i).text();
        if (arr.indexOf(tt) != -1) {
          obj.find('.tm-unit').eq(i).removeClass('currunt');
        }
      }
    }

  }


  cleanBtnClick() {

    $('#cleanBtn').on('click', function () {
      //1,快捷清空（球 和 按钮 都清空）
      //2,自选清空
      //3.缓存数据清空
      $('.current').removeClass('current');
      $('.currunt').removeClass('currunt');
      $('.r-input').val('');

    })
  }



  betBtnClick() {

    //阴影弹窗
    let _this = this;

    $('.confirm-btn').on('click', function () {

      //快捷选号
      if (_this.isfast()) {

        localStorage.removeItem('balls');
        // var arr = JSON.parse(localStorage.balls);
        // console.log('是否删除'+localStorage.balls);
        var zhu = _this.calculateNum();
        if (zhu < 1) {
          //弹框提示
          alert('请选择有效注单');
          return;

        } else {

          _this.dealWithManyBallData();
          _this.initPopup();

        }

        //自选
      } else {

        localStorage.removeItem('self_balls');
        var zhu = _this.calculateNum();
        if (zhu < 1) {
          //弹框提示
          alert('请选择有效注单');
          return;
        } else {

          _this.dealWithManyBallData();
          _this.initPopup();

        }

      }


    })
  }


  removeTopSlide() {
    $('.pageMenuSlides').addClass('hide');
    $('.lhc-content').children('.fixed-content').eq(0).next('.scroll-content').css('margin-top', '124px');
    $('.lhc-content .swiper-wrapper .swiper-slide').eq(0).addClass('swiper-no-swiping');
  }


  recoverTopSlide() {
    $('.pageMenuSlides').removeClass('hide');
    $('.lhc-content').children('.fixed-content').eq(0).next('.scroll-content').css('margin-top', '159px');
    $('.lhc-content .swiper-wrapper .swiper-slide').eq(0).removeClass('swiper-no-swiping');

  }


  initPopup() {

    let _this = this;
    var play = $('.wanfa').text();
    $('.lhc-popup').removeClass('hide');

    if (_this.isfast()) {

      //赋值
      var arr = JSON.parse(localStorage.balls);
      console.log(arr);
      var html = '';
      for (var i = 0; i < arr.length; i++) {
        html = html + '<li class="box-ball ">' + play + arr[i].text + '</li>';
      }
      $('.lhc-popup .box').html(html);

      //注数
      $('.zhu').text(_this.calculateNum());
      $('.money').text(_this.calculateNum() * 2 + '元');

    } else {

      //自选
      var arr = JSON.parse(localStorage.self_balls);
      console.log(arr);
      var html = '';
      for (var i = 0; i < arr.length; i++) {
        html = html + '<li class="box-ball ">' + play + arr[i].text + '</li>';
      }
      $('.lhc-popup .box').html(html);

      //注数
      $('.zhu').text(_this.calculateNum());
      $('.money').text(_this.calculateNum() * 2 + '元');

    }

  }


  alertBetBtnClick() {

    //下单请求数据

  }


  alertCancelBtnClick() {

    $('.cancel-btn').on('click', function () {

      $('.lhc-popup').addClass('hide');

    })

  }



  bb_boxBtnClick() {

    $('.lhc-bb .green').addClass('hide');
    $('.lhc-bb .blue').addClass('hide');
    $('.lhc-bb .bb-tops li').on('click', function () {

      $('.lhc-bb .bb-unit').addClass('hide');

      if ($(this).index() == 0) {
        $(this).addClass('red-active');
        $('.bb-tops .green-active').removeClass('green-active');
        $('.bb-tops .blue-active').removeClass('blue-active');
        $('.lhc-bb .red').removeClass('hide');
      } else if ($(this).index() == 1) {
        $(this).toggleClass('green-active');
        $('.bb-tops .red-active').removeClass('red-active');
        $('.bb-tops .blue-active').removeClass('blue-active');
        $('.lhc-bb .green').removeClass('hide');
      } else {
        $(this).toggleClass('blue-active');
        $('.bb-tops .green-active').removeClass('green-active');
        $('.bb-tops .red-active').removeClass('red-active');
        $('.lhc-bb .blue').removeClass('hide');
      }

    });

  }

  bb_BallClick() {

    $('.lhc-bb .bb-unit').on('click', function () {

      $(this).toggleClass('currunt');

      if ($(this).hasClass('red')) {
        $(this).find('.red-ball').toggleClass('red-active');
      } else if ($(this).hasClass('green')) {
        $(this).find('.green-ball').toggleClass('green-active');
      } else {
        $(this).find('.blue-ball').toggleClass('blue-active');

      }
    })

  }

  ani_BallClick() {

    $('.lhc-sx .animals-unit').on('click', function () {

      $(this).toggleClass('currunt');
      $(this).find('.red-ball').toggleClass('red-active');
      $(this).find('.green-ball').toggleClass('green-active');
      $(this).find('.blue-ball').toggleClass('blue-active');
    })
  }

  ws_BallClick() {
    $('.lhc-ws .animals-unit').on('click', function () {

      $(this).toggleClass('currunt');
      $(this).find('.red-ball').toggleClass('red-active');
      $(this).find('.green-ball').toggleClass('green-active');
      $(this).find('.blue-ball').toggleClass('blue-active');
    })
  }

  points_BallClick() {

    $('.lhc-points .points-unit').on('click', function () {

      $(this).toggleClass('currunt');

    })
  }


  isfast() {
    var index = $('.bottomLine').index();
    if (index == 0) {
      return true;
    } else {
      return false;
    }

  }


//阶乘
  jc(n, m) {
    var re = this.factorial(n) / (this.factorial(m) * this.factorial(n - m));
    return re;
  }

  factorial(num) {
    if (num < 0) {
      return -1;
    } else if (num === 0 || num === 1) {
      return 1;
    } else {
      return (num * this.factorial(num - 1));
    }
  }


}
