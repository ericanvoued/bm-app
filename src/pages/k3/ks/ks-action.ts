import * as $ from 'jquery';


export class KsAction {


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

  }


  /**
   * 添加注单
   */
  addOrder(){

    let _this = this;
    $('.bottom-m ion-icon').on('click',function (){

      // localStorage.removeItem("balls");
      var zhu = $('.total-num').text();
      // if (zhu === 0) return;

      if(zhu > 0){

        _this.dealWithBallData(zhu);
        // alert(localStorage.balls);
        let balll =JSON.parse(localStorage.balls);
        $('.confirm-number').removeClass('hide');
        $('.confirm-number').text(balll.length);
        // var  htl =  '<span class="confirm-number">'+ balll.length +'</span>';
        // $('.confirm-btn').html(htl);
        // _this.badge = balll.length;
        // alert('注单添加成功~');
        _this.cleanBalls();

      }else{

        //弹框提示
        alert('请选号~');

      }
    });

  }

  dealWithBallData(zhu){

    let _this = this;
    let wayId = 1;
    let ballStr = _this.getBallStr();
    let wanfa = $('.wanfa').text();
    var moneyunit =1 ;
    var txt = $('.money-btn i').text();
    if(txt == '元'){
      moneyunit=1;
    }else if(txt == '角'){
      moneyunit=0.1;
    }else if(txt == '分'){
      moneyunit=0.01;
    }
    var jsid =1;
    if(localStorage.balls != null){
      jsid = JSON.parse(localStorage.balls).length + 1;
    }
    let  betinfo =
      {
        "jsId": jsid,
        "wayId": wayId,
        "ballStr": ballStr,
        "viewBalls": ballStr,
        "num": zhu,
        "moneyunit": moneyunit,
        "position": [],
        "price": zhu*2,
        "multiple": 1,
        "onePrice": 2,
        "prize_group": 1,
        "wanfa": wanfa,
      };
    let balls=[];
    let ballsitem="";
    let ball = localStorage.balls;
    if(ball==null){
      balls.push(betinfo);
      ballsitem = JSON.stringify(balls);
    }else{
      let balldata =JSON.parse(ball);
      balldata.push(betinfo);
      ballsitem = JSON.stringify(balldata);
    }

    localStorage.balls = ballsitem;
  }

  getBallStr(){

    return '22222';

  }

  trendClick(){

    $('.trend-div').on('click',function () {
      $('.popover-wrapper').removeClass('hide');
    })

    $('.side-nav a').on('click',function () {

     var index =  $(this).index();
      switch (index){
        case 0:
          $('.aver').addClass('hide');
          $('.loss').addClass('hide');
          break;
        case 1:
          $('.cold').removeClass('hide');
          $('.aver').removeClass('hide');
          $('.loss').removeClass('hide');
          $('.most').removeClass('hide');
          break;
        case 2:
          //1 弹窗
          //2 遗漏
          $('.loss').addClass('hide');

          break;
        case 3:
          $('.cold').addClass('hide');
          $('.aver').addClass('hide');
          $('.loss').addClass('hide');
          $('.most').addClass('hide');
          break;

      }
      $('.popover-wrapper').addClass('hide');
    })
  }

  moneyUnitChange() {
    var _this = this;
    //元角分
    $('.money-btn').click(function(){
      $('.money-menu').css('display','block');
      // $('.money-menu').css('z-index','999');

    });

    $('.money-menu li').each(function(){

      $(this).on('click',function (){
        $('.money-menu li').removeClass('active');
        $(this).addClass('active');
        var txt = $('.money-menu li').eq($(this).index()).text();
        $('.money-menu').css('display','none');
        $('.money-btn').find('i').text(txt);
        _this.calculateMoney();
      });
    });
  }

  fastBtnDxds123(){

    var _this = this;
    $('.select-btn li').on('click',function () {

      $('.active').removeClass('active');
      $(this).addClass('active');
      var obj = $(this).parents('.select-btn').siblings('.content-box');
      var len = obj.find('.ball-unit').length;
      var txt = $(this).attr('class').split(' ')[0];
      if(txt.search('li')!=-1){
        var num = txt.substr(2, 1);
          for(var i=0;i<len;i++){
            var str = obj.find('.ball-num span').eq(i).text();
            if(str.search(num)!=-1){
              obj.find('.ball-num').eq(i).addClass('active');
            }
          }
        return;
      }
      switch (txt){
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

      _this.calculateNumOfBet();
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
        _this.calculateNumOfBet();
        _this.calculateMoney();

      })
    });

  };

  changeBallUi(title) {

    let _this = this;
    $('.section').addClass('hide');
    switch (title) {

      case '和值':
        $('.hz-section').removeClass('hide');
        break;
      case '三同号':
        $('.santh-section').removeClass('hide');
        break;
      case '二同号':
        $('.ert-section').removeClass('hide');
        break;
      case '三不同号':
        $('.sanbth-section').removeClass('hide');
        break;
      case '二不同号':
        $('.erbth-section').removeClass('hide');
        break;
      case '三连号':
        $('.sanlh-section').removeClass('hide');
        break;
      case '单挑一骰':
        $('.dtys-section').removeClass('hide');
        break;
    }
  }


  ballClick(){

    let _this = this;
    $('.content-box .ball-unit').on('click',function () {

      console.log(1111);
      $(this).find('.ball-num').toggleClass('active');

      _this.calculateNumOfBet();
      _this.calculateMoney();

    })

  }

  calculateNumOfBet(){

    var zhushu = $('.content-box .active').length;
    $('.total-num').text(zhushu);
  }

  calculateMoney(){

    var zhu = $('.total-num').text();
    var txt = $('.money-btn i').text();
    // alert(txt);
    var moneyunit =1 ;
    switch (txt){
      case '元':
        moneyunit=1;
        break;
      case '角':
        moneyunit=0.1;
        break;
      case '分':
        moneyunit=0.01;
        break;
    }

    var newmoney = Math.floor((zhu * moneyunit * 2)*100)/100 ;  //注数 * 单元 * 倍数 *2
    // Math.floor(15.7784514000 * 100) / 100
    $('.money').text(newmoney);

  }

  initClick(){
    var _this = this;
    $('.l-clean').on('click',function () {
      $('.active').removeClass('active');

      _this.calculateNumOfBet();
      _this.calculateMoney();

    })
  }

  cleanBalls(){

    $('.active').removeClass('active');

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
