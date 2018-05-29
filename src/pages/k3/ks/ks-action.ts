import * as $ from 'jquery';
import {Observable} from "rxjs/Observable";


export class KsAction {

  timeIddd;

  initView() {

    this.requestData();
    this.initClick();
    this.changePlaySelect();
    this.ballClick();
    this.fastBtnDxds123();
    this.moneyUnitChange();
    this.cleanBalls();
    this.trendClick();
    this.addOrder();


  }

  requestData() {
    //玩法
    //奖期
    this.cutDownTime();
  }


  cutDownTime() {

    let _this = this;
    var totalSec = _this.getRemainTime('2017-09-11 15:39:31', '2017-09-11 15:40:30');
    var ttt = totalSec;
    var liArr = $('.r-time span');
    var timeId = setInterval(function () {
      _this.timeIddd = timeId;
      if (totalSec <= 0) {
        //--奖期
        // requestJiangQiData(1);
        clearInterval(timeId);
        return;
      }
      totalSec--;
      var hour = Math.floor(totalSec / 3600);
      var minute = Math.floor(totalSec % 3600 / 60);
      var sec = totalSec % 60;
      //显示
      liArr[0].innerHTML = hour;
      liArr[1].innerHTML = minute;
      liArr[2].innerHTML = sec;

      var scale = totalSec / ttt * 100;

      $('.time-bar').css('width', scale + '%');

    }, 1000)
  }


  getRemainTime(startime, endtime) {
    var a = new Date(startime.replace(/-/g, '/')).getTime();
    var b = new Date(endtime.replace(/-/g, '/')).getTime();
    var t = (b - a) / 1000;
    return t;
  }


  /**
   * 添加注单
   */
  addOrder() {

    let _this = this;
    $('.bottom-m ion-icon').on('click', function () {

      _this.addOrderEvent();
      // localStorage.removeItem("balls");
      // var zhu = $('.total-num').text();
      // // if (zhu === 0) return;
      // if (zhu > 0) {
      //   _this.dealWithBallData(zhu);
      //   // alert(localStorage.balls);
      //   let balll = JSON.parse(localStorage.balls);
      //   $('.confirm-number').removeClass('hide');
      //   $('.confirm-number').text(balll.length);
      //   // var  htl =  '<span class="confirm-number">'+ balll.length +'</span>';
      //   // $('.confirm-btn').html(htl);
      //   // alert('注单添加成功~');
      //   _this.cleanBalls();
      // } else {
      //   //弹框提示
      //   alert('请选号~');
      // }
    });
  }

  addOrderEvent() {
    let _this = this;
    var zhu = $('.total-num').text();
    // if (zhu === 0) return;
    if (zhu > 0) {
      _this.dealWithBallData(zhu);
      // alert(localStorage.balls);
      console.log(11111)

      let balll = JSON.parse(localStorage.balls);
      $('.confirm-number').removeClass('hide');
      $('.bottom-r').css('background','');
      $('.confirm-number').text(balll.length);
      _this.cleanBalls();
    } else {
      //弹框提示
      alert('请选号~');
    }
  }


  // shake: boolean = false;
  // shaked() {
  //   let _this = this;
  //   // if (window.DeviceMotionEvent) {
  //   // 移动浏览器支持运动传感事件
  //   // window.addEventListener('devicemotion', _this.deviceMotionHandler, false);
  //   // }
  //   var speed = 15, self = this;    // 用来判定的加速度阈值，太大了则很难触发
  //   var x, y, z, lastX, lastY, lastZ;
  //   x = y = z = lastX = lastY = lastZ = 0;
  //   //func()
  //   window.addEventListener('devicemotion', ((event) => {
  //     var acceleration = event.accelerationIncludingGravity;
  //     x = acceleration.x;
  //     y = acceleration.y;
  //     //alert(this.shake)
  //     if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
  //       alert(1111);
  //       self.shake = true;
  //     }
  //   }))
  // }
//   deviceMotionHandler(eventData) {
//     let _this = this;
//     var SHAKE_THRESHOLD = 20;
// // 定义一个变量保存上次更新的时间
//     var last_update = 0;
// // 紧接着定义x、y、z记录三个轴的数据以及上一次出发的时间
//     var x, y, z, last_x, last_y, last_z;
// // 为了增加这个例子的一点无聊趣味性，增加一个计数器
//     var count = 0;
//     var acceleration = eventData.accelerationIncludingGravity;
//     // var curTime = new Date().getTime();
//     var x, y, z, lastX, lastY, lastZ, speed = 15;
//     x = y = z = lastX = lastY = lastZ = 0;
//     x = acceleration.x;
//     y = acceleration.y;
//     if ((Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed)) {
//       _this.shakeClick();
//       // alert('yaole~~~')
//     }
//   }


  shakeAnimation(no1, no2, no3, num) {
    let _this = this;
    for (var i = 1; i < 7; i++) {
      $('.saizi-pop div').removeClass('sz-' + i);
    }
    $('.sz-left').addClass('sz-' + no1).addClass('animate-0');
    $('.sz-mid').addClass('sz-' + no2).addClass('animate-1');
    $('.sz-right').addClass('sz-' + no3).addClass('animate-2');
    $('.saizi-pop').removeClass('hide');
    var obj = $('.section.current .content-box');
    var len = obj.find('.ball-unit').length;

    setTimeout(function () {
      for (var i = 0; i < len; i++) {
        if (parseInt(obj.find('span').eq(i).text()) == num) {
          obj.find('.ball-num').eq(i).addClass('active');
        }
      }

      var fx = obj.find('.active').offset().left;
      var fy = obj.find('.active').offset().top;
      var selfx = $('.sz-left').offset().left;
      var selfy = $('.sz-left').offset().top + 70;
      var wx = fx - selfx;
      var wy = fy - selfy;
      $('.saizi-pop').css('transform', " translate(" + wx + "px," + wy + "px) scale(0.01)");
      $('.animate-0').removeClass('animate-0');
      $('.animate-1').removeClass('animate-1');
      $('.animate-2').removeClass('animate-2');
      _this.calculateMoney();
      var player = $('#mp3')[0];
      player.play();
    }, 2500);

    setTimeout(function () {
      $('.saizi-pop').css('transform', "scale(1)");
      $('.saizi-pop').addClass('hide');
    }, 3500);

  }


  shakeClick() {

    let _this = this;
    if (!$('.saizi-pop').hasClass('hide')) {
      return;
    }
    $('.active').removeClass('active');
    $('.selected').removeClass('selected');

    // 先取随机数
    // 再 添加 对应的 图片类 ，执行动画
    // 执行结束后  进行位移缩放

    var wanfa = $('.wanfa').text();
    if (wanfa.search('和值') != -1) {

      var no1 = Math.floor(Math.random() * 6 + 1);
      var no2 = Math.floor(Math.random() * 6 + 1);
      var no3 = Math.floor(Math.random() * 6 + 1);
      //和值
      var num = no1 + no2 + no3;
      _this.shakeAnimation(no1, no2, no3, num);

    } else if (wanfa.search('三同号') != -1) {

      var no1 = Math.floor(Math.random() * 6 + 1);
      var num = no1 * 100 + no1 * 10 + no1;
      _this.shakeAnimation(no1, no1, no1, num);

    } else if (wanfa.search('二同号') != -1) {

      var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
      no1 = b[0];
      no2 = b[1];
      var num1 = no1 * 10 + no1;
      var num2 = no2;
      for (var i = 1; i < 7; i++) {
        $('.saizi-pop div').removeClass('sz-' + i);
      }
      $('.sz-left').addClass('sz-' + no1);
      $('.sz-mid').addClass('sz-' + no1);
      $('.sz-right').addClass('sz-' + no2);

      $('.sz-left').addClass('animate-0');
      $('.sz-mid').addClass('animate-1');
      $('.sz-right').addClass('animate-2');
      $('.saizi-pop').removeClass('hide');
      var obj = $('.section.current .content-box .tonghao');

      var len = obj.find('.ball-unit').length;
      console.log('len===' + len);
      setTimeout(function () {
        for (var i = 0; i < len; i++) {
          // console.log('i===' + i);
          // console.log('text=str==' + obj.find('span').eq(i).text());
          // console.log('text===' + parseInt(obj.find('span').eq(i).text()));
          if (parseInt(obj.find('span').eq(i).text()) == num1 || parseInt(obj.find('span').eq(i).text()) == num2) {
            obj.find('.ball-num').eq(i).addClass('active');
          }
        }
        var fx = obj.find('.active').offset().left;
        var fy = obj.find('.active').offset().top;
        var selfx = $('.sz-left').offset().left;
        var selfy = $('.sz-left').offset().top + 70;
        var wx = fx - selfx;
        var wy = fy - selfy;
        $('.saizi-pop').css('transform', " translate(" + wx + "px," + wy + "px) scale(0.01)");
        $('.animate-0').removeClass('animate-0');
        $('.animate-1').removeClass('animate-1');
        $('.animate-2').removeClass('animate-2');
        var player = $('#mp3')[0];
        player.play();

      }, 2500);

      setTimeout(function () {

        $('.saizi-pop').css('transform', "scale(1)");
        $('.saizi-pop').addClass('hide');
      }, 3500);

    } else if (wanfa.search('三不同号') != -1) {
      var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
      var c = [b[0], b[1], b[2]].sort();
      num = c[0] * 100 + c[1] * 10 + c[2];
      _this.shakeAnimation(c[0], c[1], c[2], num);
    } else if (wanfa.search('二不同号') != -1) {
      var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
      var c = [b[0], b[1]].sort();
      num = c[0] * 10 + c[1];
      _this.shakeAnimation('', c[0], c[1], num);
    } else if (wanfa.search('三连号') != -1) {
      var no = Math.floor(Math.random() * 4 + 1);
      var num = no * 100 + (no + 1) * 10 + no + 2;
      _this.shakeAnimation(no, no + 1, no + 2, num);
    } else if (wanfa.search('单挑') != -1) {
      var no = Math.floor(Math.random() * 6 + 1);
      _this.shakeAnimation(no, '', '', no);
    }

  }


  shuffle(a) {
    var len = a.length;
    for (var i = 0; i < len - 1; i++) {
      var index = Math.floor(Math.random() * (len - i));
      var temp = a[index];
      a[index] = a[len - i - 1];
      a[len - i - 1] = temp;
    }
    return a;
  }

  dealWithBallData(zhu) {

    let _this = this;
    let wayId = 1;
    let ballStr = _this.getBallStr();
    let wanfa = $('.wanfa').text();
    var moneyunit = 1;
    var txt = $('.money-btn i').text();
    if (txt == '元') {
      moneyunit = 1;
    } else if (txt == '角') {
      moneyunit = 0.1;
    } else if (txt == '分') {
      moneyunit = 0.01;
    }
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
    if (ball == null) {
      balls.push(betinfo);
      ballsitem = JSON.stringify(balls);
    } else {
      let balldata = JSON.parse(ball);
      //检测号码重复性～～
      if (_this.isNumDuplication(betinfo).j == 1) {

        ballsitem = JSON.stringify(_this.isNumDuplication(betinfo).data);
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

    var obj = $('.section.current .content-box');
    var len = obj.find('.active').length;
    var arr = [], str;
    for (var i = 0; i < len; i++) {
      var txt = $('.section.current .content-box .active').eq(i).find('span').text();
      arr.push(txt);
    }
    str = arr.join('|');//112|223|334
    return str;
  }

  trendClick() {

    $('.trend-div').on('click', function () {
      $('.right-popover').css('height')=='200px'? $('.right-popover').css('height','0px'):$('.right-popover').css('height','200px');
    })

    $('.side-nav-a').on('click', function () {
      var index = $(this).index();
      switch (index) {
        case 0:
//走势图
          break;
        case 1:
//近期开奖
          break;
        case 2:
//号码统计
          $('.trend-select-pop').removeClass('hide');
          $('.right-popover').css('height','0px');
          break;
        case 3:
          //玩法说明
          break;
      }
      $('.right-popover').css('height','0px');

    })

  }

  initTrendEvent() {

    //一进来只显示遗漏
    $('.aver').addClass('hide');
    $('.most').addClass('hide');
    $('.cold').addClass('hide');
    $('.pop-box input').eq(0).attr('checked', true);
    $('.pop-quxiao,.pop-queding').on('click', function () {
      $('.trend-select-pop').addClass('hide');
    })
    $('.pop-box .item,.pop-box input').on('click', function () {

      var index = $(this).index();
      console.log($('.pop-box input').eq(index).attr('checked'))
      if ($('.pop-box input').eq(index).attr('checked') == 'checked') {
        $('.pop-box input').eq(index).attr('checked', false);
        switch (index) {
          case 0:
            $('.loss').addClass('hide');
            break;
          case 1:
            $('.cold').addClass('hide');
            break;
          case 2:
            $('.aver').addClass('hide');
            break;
          case 3:
            $('.most').addClass('hide');
            break;
        }
      } else {
        $('.pop-box input').eq(index).attr('checked', true);
        switch (index) {
          case 0:
            $('.loss').removeClass('hide');
            break;
          case 1:
            $('.cold').removeClass('hide');
            break;
          case 2:
            $('.aver').removeClass('hide');
            break;
          case 3:
            $('.most').removeClass('hide');
            break;
        }
      }
    })
  }

  moneyUnitChange() {
    var _this = this;
    //元角分
    $('.money-btn').click(function () {
      $('.money-menu').css('display', 'block');
      // $('.money-menu').css('z-index','999');
    });

    $('.money-menu li').each(function () {

      $(this).on('click', function () {
        $('.money-menu li').removeClass('active');
        $(this).addClass('active');
        var txt = $('.money-menu li').eq($(this).index()).text();
        $('.money-menu').css('display', 'none');
        $('.money-btn').find('i').text(txt);
        _this.calculateMoney();
      });
    });
  }

  fastBtnDxds123() {

    var _this = this;
    $('.select-btn li').on('click', function () {

      $('.active').removeClass('active');
      $(this).addClass('active');
      var obj = $(this).parents('.select-btn').siblings('.content-box');
      var len = obj.find('.ball-unit').length;
      var txt = $(this).attr('class').split(' ')[0];
      if (txt.search('li') != -1) {
        var num = txt.substr(2, 1);
        for (var i = 0; i < len; i++) {
          var str = obj.find('.ball-num span').eq(i).text();
          if (str.search(num) != -1) {
            obj.find('.ball-num').eq(i).addClass('active');
          }
        }
        return;
      }
      switch (txt) {
        case 'da':
          var num = Math.ceil(len / 2) - 1;
          obj.find('.ball-num:gt(' + num + ')').addClass('active');
          break;
        case 'xiao':
          var num = Math.ceil(len / 2);
          obj.find('.ball-num:lt(' + num + ')').addClass('active');
          break;
        case 'ji':
          obj.find('.ball-num:even').addClass('active');
          break;
        case 'ou':
          obj.find('.ball-num:odd').addClass('active');
          break;
      }
      // _this.calculateNumOfBet();
      _this.calculateMoney();
    })

    //三同通
    $('.tx-btn').on('click', function () {
      // $('.active').removeClass('active');
      $(this).find('.tx-num').toggleClass('selected');
      if ($(this).find('.tx-num').hasClass('selected')) {
        $(this).siblings('.ball-unit').find('.ball-num').addClass('active');
      } else {
        $(this).siblings('.ball-unit').find('.ball-num').removeClass('active');
      }
      // _this.calculateNumOfBet();
      _this.calculateMoney();

    })
  }


  changePlaySelect() {

    let _this = this;
    //主玩法选择
    $('.play-list .play-black').each(function () {
      $(this).on('click', function () {
        $('.play-list .play-black').removeClass('play-yellow');
        $(this).addClass('play-yellow');
        // var title = $('.wanfa').text();
        var title = $('.play-list .play-yellow').text();
        //清空当前页面
        $('.active').removeClass('active');
        $('.wanfa').text(title);
        _this.changeBallUi(title);
        _this.removeCover();
        // _this.calculateNumOfBet();
        _this.calculateMoney();
      })
    });
  };

  changeBallUi(title) {

    let _this = this;
    $('.section').addClass('hide');
    $('.section').removeClass('current');
    switch (title) {
      case '和值':
        $('.hz-section').removeClass('hide');
        $('.hz-section').addClass('current');
        break;
      case '三同号':
        $('.santh-section').removeClass('hide');
        $('.santh-section').addClass('current');
        break;
      case '二同号':
        $('.ert-section').removeClass('hide');
        $('.ert-section').addClass('current');
        break;
      case '三不同号':
        $('.sanbth-section').removeClass('hide');
        $('.sanbth-section').addClass('current');
        break;
      case '二不同号':
        $('.erbth-section').removeClass('hide');
        $('.erbth-section').addClass('current');
        break;
      case '三连号':
        $('.sanlh-section').removeClass('hide');
        $('.sanlh-section').addClass('current');
        break;
      case '单挑一骰':
        $('.dtys-section').removeClass('hide');
        $('.dtys-section').addClass('current');
        break;
    }
  }


  ballClick() {

    let _this = this;
    $('.content-box .ball-unit').on('click', function () {

      $(this).find('.ball-num').toggleClass('active');
      _this.calculateMoney();


    })


    $('.tonghao-th .ball-unit').on('click', function () {
      var index = $(this).index();
      $('.tonghao-bth .ball-num').eq(index).removeClass('active');
      _this.calculateMoney();
    })
    $('.tonghao-bth .ball-unit').on('click', function () {
      var index = $(this).index();
      $('.tonghao-th .ball-num').eq(index).removeClass('active');
      _this.calculateMoney();
    })

  }

  calculateNumOfBet() {

    var zhushu;
    if ($('.wanfa').text().search('二同号') != -1) {
      var a = $('.tonghao-th .active').length;
      var b = $('.tonghao-bth .active').length;
      var c = $('.content-box .active').length - $('.tonghao .active').length;
       zhushu = a * b + c;
    } else {
       zhushu = $('.content-box .active').length;
    }

    if(zhushu>0){
      $('.bottom-r').css('background','');
    }

    return zhushu;
  }


  calculateMoney() {

    let _this = this;

    var zhu = _this.calculateNumOfBet();
    $('.total-num').text(zhu);
    var txt = $('.money-btn i').text();
    var moneyunit = 1;
    switch (txt) {
      case '元':
        moneyunit = 1;
        break;
      case '角':
        moneyunit = 0.1;
        break;
      case '分':
        moneyunit = 0.01;
        break;
    }

    var newmoney = Math.floor((zhu * moneyunit * 2) * 100) / 100;  //注数 * 单元 * 倍数 *2
    $('.money').text(newmoney);

  }

  initClick() {
    var _this = this;
    $('.l-clean').on('click', function () {
      $('.active').removeClass('active');

      // _this.calculateNumOfBet();
      _this.calculateMoney();

    })

    $('.shake').on('click', function () {
      _this.shakeClick();
    })

    _this.initTrendEvent();

  }



  cleanBalls() {

    $('.active').removeClass('active');

    $('.total-num').text(0);
    $('.money').text(0);

  }

  addCover() {

    $('.header-top').addClass('hide');
    $('.body-bg').removeClass('hide');
    $('.alert-con').removeClass('hide');

  }

  removeCover() {
    $('.header-top').removeClass('hide');
    $('.body-bg').addClass('hide');
    $('.alert-con').addClass('hide');
  }

}
