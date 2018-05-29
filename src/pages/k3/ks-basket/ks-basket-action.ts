import * as $ from 'jquery';

export class KsBasketAction {


  initView() {


    this.loadData();
    this.zhuiJiaJian();
    this.beiJiaJian();
    this.initClick();
  }

  initClick() {

    let _this = this;
    $('.clean-all').on('click', function () {
      _this.cleanAll();
    })

    $('.random1').on('click', function () {
      _this.randomMore(1);
    })

    $('.random5').on('click', function () {
      _this.randomMore(5);
    })

  }

  /*
   机选
   */
  randomMore(num) {

    let _this= this;
    var wanfa = $('.wanfa').text();

    switch (wanfa) {

      case '和值':
        // Math.floor(Math.random()*(max-min+1)+min); 18-3+1 +3
        if (num == 1) {
          var no = Math.floor(Math.random() * 16 + 3);
          _this.dealWithRandom(no);
        }else {
          for(var i =0 ;i <5 ;i++) {
            var no = Math.floor(Math.random() * 16 + 3);
            _this.dealWithRandom(no);
          }
        }
        _this.loadData();
        break;
      case '三同号':
        if (num == 1) {
          var no = Math.floor(Math.random() * 6 + 1);
          no = no *100+no*10+no;
          _this.dealWithRandom(no);
        }else {
          for(var i =0 ;i <5 ;i++) {
            var no = Math.floor(Math.random() * 6 + 1);
            no = no *100+no*10+no;
            _this.dealWithRandom(no);
          }
        }
        _this.loadData();
        break;

      case '二同号':
        if (num == 1) {

          var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
          var c = [b[0], b[1]].sort();
          no = c[0] * 100 + c[0] * 10 + c[1];
          _this.dealWithRandom(no);
        }else {
          for(var i =0 ;i <5 ;i++) {
            var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
            var c = [b[0], b[1]].sort();
            no = c[0] * 100 + c[0] * 10 + c[1];
            _this.dealWithRandom(no);

            }
          }
        _this.loadData();
        break;

      case '三不同号':
        if (num == 1) {
        var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
        var c = [b[0], b[1], b[2]].sort();
          no = c[0] * 100 + c[1] * 10 + c[2];
          _this.dealWithRandom(no);
        }else {
          for (var i = 0; i < 5; i++) {
            var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
            var c = [b[0], b[1], b[2]].sort();
            no = c[0] * 100 + c[1] * 10 + c[2];
            _this.dealWithRandom(no);
          }
        }
        _this.loadData();
        break;
      case '二不同号':
        if (num == 1) {

          var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
          var c = [b[0], b[1]].sort();
          no = c[0] * 10 + c[1];
          _this.dealWithRandom(no);
        }else {

          for (var i = 0; i < 5; i++) {
            var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
            var c = [b[0], b[1]].sort();
            no = c[0] * 10 + c[1];
            _this.dealWithRandom(no);
          }
        }
        _this.loadData();
        break;
      case '三连号':
        if (num == 1) {
          var no = Math.floor(Math.random() * 4 + 1);
          var no = no * 100 + (no+1) * 10 + (no+2);
          _this.dealWithRandom(no);
        }else {
          for (var i = 0; i < 5; i++) {
            var no = Math.floor(Math.random() * 4 + 1);
            var no = no * 100 + (no+1) * 10 + (no+2);
            _this.dealWithRandom(no);
          }
        }
        _this.loadData();
        break;

      case '单挑一骰':
        if (num == 1) {
          var no = Math.floor(Math.random() * 6 + 1);
          _this.dealWithRandom(no);
        }else {
          for (var i = 0; i < 5; i++) {
            var no = Math.floor(Math.random() * 6 + 1);
            _this.dealWithRandom(no);
          }
        }
        _this.loadData();
        break;
    }
  }


  dealWithRandom(no) {

    let _this = this;
    let wayId = 1;
    let ballStr = no;
    let wanfa = $('.wanfa').text();
    // var moneyunit = 1;
    // var txt = $('.money-btn i').text();
    // console.log(txt)
    // if (txt == '元') {
    //   moneyunit = 1;
    // } else if (txt == '角') {
    //   moneyunit = 0.1;
    // } else if (txt == '分') {
    //   moneyunit = 0.01;
    // }
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
        "num": 1,
        "moneyunit": localStorage.moneyunit,
        "position": [],
        "multiple": 1,
        "onePrice": 2,
        "prize_group": 1,
        "wanfa": wanfa,
        "price": 2*localStorage.moneyunit,
      };
    let balls = [];
    let ballsitem = "";
    let ball = localStorage.balls;
    if (ball == null) {
      balls.push(betinfo);
      ballsitem = JSON.stringify(balls);
    } else {
      let balldata = JSON.parse(ball);
      //检测号码重复
      if(_this.isNumDuplication(betinfo).j==1){
        ballsitem = JSON.stringify(_this.isNumDuplication(betinfo).data);
      }else{
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
    for(var i=0;i< balldata.length;i++){
      var str = balldata[i].ballStr;
      if(str == ballstr){
        j++;
        balldata[i].num = parseInt(balldata[i].num)+ parseInt(betinfo.num) ;
        balldata[i].price += betinfo.price;
      }
    }
    var result = {j:j,data:balldata};
    return result;
  }

cleanAll()
{

  localStorage.removeItem("balls");
  $('.buy-list').html("");
  $('#bei input').val(0);
  $('#zhui input').val(0);
  $('.total-con .qi').text(0);
  $('.total-con .zhu').text(0);
  $('.total-con .yuan').text(0);
  $('.big-text .col').text(0);
}


loadData()
{

  let list = "";
  let arr = JSON.parse(localStorage.balls);
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {

    let price = parseInt(arr[i].num) * 2;

    let item = '<li class="buy-li clear">\n' +
      '        <div class="li-close">\n' +
      '         <ion-icon name="ios-close-circle-outline" role="img" class="icon icon-ios ion-ios-close-circle-outline" aria-label="close circle-outline" ng-reflect-name="ios-close-circle-outline"></ion-icon>' +
      '        </div>\n' +
      '        <div class="buy-con">\n' +
      '          <div class="number">\n' +
      '            <i style="color: #FE5600;width: auto; display: inline;">\n' +
      '              <i>' + arr[i].ballStr + '</i>\n' +
      '            </i>\n' +
      '          </div>\n' +
      '          <div class="mt5"><span class="direct-select">' + arr[i].wanfa + '</span> <span>' + arr[i].num + '注' + arr[i].price + '元</span>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '      </li>';
    list += item;
  }

  $('.buy-list').html(list);
  this.closeBtnClick();
}


closeBtnClick()
{

  let _this = this;
  $('.li-close').each(function () {

    $(this).on('click', function () {

      console.log('======')

      let indexx = $(this).parent().index();
      $('.buy-list .buy-li').eq(indexx).remove();
      //记录索引，删除缓存数组中对应的值， 并且删除对应ui
      // var ball = localStorage.getItem("balls");  //此时取得是字符串
      let dataa = JSON.parse(localStorage.balls);
      // alert( dataa.length );
      dataa.splice(indexx, 1);
      // localStorage.removeItem("balls");
      localStorage.balls = JSON.stringify(dataa);
      // let arr = JSON.parse(localStorage.balls);
      // alert(arr.length);
      _this.calculateMoney();

    });
  });

}


zhuiJiaJian()
{

  let _this = this;
  $('#zhui ion-icon').each(function () {
    var obj = $('#zhui input');

    $(this).click(function () {

      if ($(this).index() == 0) {//减
        var num = obj.val();
        if (num == 1) {
          obj.val(1);
        } else {
          obj.val((num | 0) - 1);
        }
      } else if ($(this).index() == 2) { //加
        var num = obj.val();
        obj.val((num | 0) + 1);

      }
      _this.calculateMoney();

    });

  });
}


beiJiaJian()
{

  var obj = $('#bei input');
  obj.val(1);
  let _this = this;
  $('#bei ion-icon').each(function () {

    $(this).click(function () {

      if ($(this).index() == 0) {//减
        var num = obj.val();
        if (num == 1) {
          obj.val(1);
        } else {
          obj.val((num | 0) - 1);
        }
      } else if ($(this).index() == 2) { //加

        var num = obj.val();
        obj.val((num | 0) + 1);
      }

      _this.calculateMoney();

    });

  });

  // $("#beishudiv input").change(function(){
  //   if(parseInt($(this).val()) > parseInt(localStorage.min_multiple)){
  //     $(this).val(localStorage.min_multiple);
  //     calculateMoney();
  //     loadBuylist();
  //   }else {
  //     calculateMoney();
  //     loadBuylist();
  //
  //   }
  // });
}


/*

 */
calculateMoney()
{

  var arr = JSON.parse(localStorage.balls);
  var zhu = 0, money = 0;
  for (var i = 0; i < arr.length; i++) {
    zhu = zhu + parseInt(arr[i].num);
    money = money + arr[i].price;
  }
  var total = $('#zhui input').val() * $('#bei input').val() * money;
  $('.yuan').text(total);
  $('.zhu').text(zhu);

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
}
