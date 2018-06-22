import {Component,ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams,Navbar} from 'ionic-angular';
import {KsAction} from "./ks-action";
import {KsBasketPage} from '../ks-basket/ks-basket';
import {PopoverController} from "ionic-angular";

import {UtilProvider} from '../../../providers/util/util'
import * as $ from 'jquery';
import {RestProvider} from '../../../providers/rest/rest';
import {BaseToolProvider} from '../../../providers/base-tool/base-tool';
import {KstrendPage} from '../kstrend/kstrend';

@IonicPage()
@Component({
  selector: 'page-ks',
  templateUrl: 'ks.html',
})
export class KsPage extends KsAction {

  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public util: UtilProvider,
              public base: BaseToolProvider,
              public rest: RestProvider) {
    super();
  }

  backButtonClick = (e: UIEvent) => {

    for(var i=0;i<localStorage.length;i++){
      var key=localStorage.key(i);
      console.log(key);
    }

    localStorage.removeItem('balls');
    localStorage.removeItem('wanfa');
    localStorage.removeItem('wayId');
    localStorage.removeItem('typeStr');
    localStorage.removeItem('nextDate');
    localStorage.removeItem('kshtml');
    localStorage.removeItem('bet_max_prize_group');
    localStorage.removeItem('bet_min_prize_group');
    localStorage.removeItem('bet_note');
    localStorage.removeItem('bonus_note');
    localStorage.removeItem('moneyunit');
    localStorage.removeItem('max_multiple');
    //暂时不清除这些
    // localStorage.removeItem('hisissue');
    // localStorage.removeItem('yldata60');
    // localStorage.removeItem('yldata60');
    // localStorage.removeItem('yldata90');
    // localStorage.removeItem('yldata');
    this.navCtrl.pop();
  }

  ionViewDidLoad() {

    this.navBar.backButtonClick = this.backButtonClick;
    this.initView();
    this.requestHisData();
    // 获取遗漏
    this.getnewlotterymissed30();
    this.getnewlotterymissed60();
    this.getnewlotterymissed90();
    this.base.requestPlayData('21', '3').then(() => {
        console.log(2222233333)
        this.changePlaySelect();
        // localStorage.kshtml = $('.alert-con').html();
      }
    );


    this.util.shakePhone(() => {
      this.shakeClick();
    })
    this.initAny();
  }

  getnewlotterymissed60() {
    var userInfo = JSON.parse(localStorage.userInfo);
    console.log('userInfo==' + userInfo);
    var url = '/api-lotteries-h5/getnewlottterymissed/21/60?_t=' + userInfo.auth_token;
    this.rest.getUrlReturn(url)
      .subscribe((data) => {
        console.log('遗漏数据～～～～～' + data);
        if (data.IsSuccess) {
          localStorage.yldata60 = JSON.stringify(data.data);
        }
      });
  }

  getnewlotterymissed90() {
    var userInfo = JSON.parse(localStorage.userInfo);
    console.log('userInfo==' + userInfo);
    var url = '/api-lotteries-h5/getnewlottterymissed/21/90?_t=' + userInfo.auth_token;
    // http://user.firecat.com/api-lotteries-h5/load-issues/1?_t=4b5dbcc45a38784ce1aabaaa03ae806a
    this.rest.getUrlReturn(url)
      .subscribe((data) => {
        console.log('遗漏数据～～～～～' + data);
        if (data.IsSuccess) {
          localStorage.yldata90 = JSON.stringify(data.data);
        }
      });
  }

  getnewlotterymissed30() {


    var yl = {
      "hz": {
      "current": {
        "3": 7,
          "4": 30,
          "5": 10,
          "6": 17,
          "7": 3,
          "8": 4,
          "9": 1,
          "10": 30,
          "11": 8,
          "12": 30,
          "13": 30,
          "14": 30,
          "15": 0,
          "16": 30,
          "17": 11,
          "18": 27
      },
      "hot": {
        "3": 2,
          "4": 0,
          "5": 1,
          "6": 11,
          "7": 4,
          "8": 3,
          "9": 3,
          "10": 0,
          "11": 2,
          "12": 0,
          "13": 0,
          "14": 0,
          "15": 2,
          "16": 0,
          "17": 1,
          "18": 1
      },
      "average": {
        "3": 14,
          "4": 30,
          "5": 29,
          "6": 2,
          "7": 7,
          "8": 9,
          "9": 9,
          "10": 30,
          "11": 14,
          "12": 30,
          "13": 30,
          "14": 30,
          "15": 14,
          "16": 30,
          "17": 29,
          "18": 29
      },
      "max": {
        "3": 12,
          "4": 30,
          "5": 19,
          "6": 17,
          "7": 12,
          "8": 22,
          "9": 14,
          "10": 30,
          "11": 15,
          "12": 30,
          "13": 30,
          "14": 30,
          "15": 19,
          "16": 30,
          "17": 18,
          "18": 27
      }
    },
      "k3sth": {
      "current": {
        "111": 7,
          "222": 30,
          "333": 30,
          "444": 30,
          "555": 30,
          "666": 27
      },
      "hot": {
        "111": 2,
          "222": 0,
          "333": 0,
          "444": 0,
          "555": 0,
          "666": 1
      },
      "average": {
        "111": 14,
          "222": 30,
          "333": 30,
          "444": 30,
          "555": 30,
          "666": 29
      },
      "max": {
        "111": 12,
          "222": 30,
          "333": 30,
          "444": 30,
          "555": 30,
          "666": 27
      }
    },
      "k3eth": {
      "current": {
        "eth": {
          "11": 10,
            "22": 3,
            "33": 6,
            "44": 30,
            "55": 30,
            "66": 11
        },
        "one": {
          "11": {
            "2": 30,
              "3": 10,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "22": {
            "1": 30,
              "3": 3,
              "4": 4,
              "5": 30,
              "6": 30
          },
          "33": {
            "1": 30,
              "2": 6,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "44": {
            "1": 30,
              "2": 30,
              "3": 30,
              "5": 30,
              "6": 30
          },
          "55": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 30,
              "6": 30
          },
          "66": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 30,
              "5": 11
          }
        }
      },
      "hot": {
        "eth": {
          "11": 1,
            "22": 5,
            "33": 1,
            "44": 0,
            "55": 0,
            "66": 1
        },
        "one": {
          "11": {
            "2": 0,
              "3": 1,
              "4": 0,
              "5": 0,
              "6": 0
          },
          "22": {
            "1": 0,
              "3": 4,
              "4": 1,
              "5": 0,
              "6": 0
          },
          "33": {
            "1": 0,
              "2": 1,
              "4": 0,
              "5": 0,
              "6": 0
          },
          "44": {
            "1": 0,
              "2": 0,
              "3": 0,
              "5": 0,
              "6": 0
          },
          "55": {
            "1": 0,
              "2": 0,
              "3": 0,
              "4": 0,
              "6": 0
          },
          "66": {
            "1": 0,
              "2": 0,
              "3": 0,
              "4": 0,
              "5": 1
          }
        }
      },
      "average": {
        "eth": {
          "11": 29,
            "22": 7,
            "33": 29,
            "44": 30,
            "55": 30,
            "66": 29
        },
        "one": {
          "11": {
            "2": 30,
              "3": 29,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "22": {
            "1": 30,
              "3": 7,
              "4": 29,
              "5": 30,
              "6": 30
          },
          "33": {
            "1": 30,
              "2": 29,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "44": {
            "1": 30,
              "2": 30,
              "3": 30,
              "5": 30,
              "6": 30
          },
          "55": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 30,
              "6": 30
          },
          "66": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 30,
              "5": 29
          }
        }
      },
      "max": {
        "eth": {
          "11": 19,
            "22": 12,
            "33": 23,
            "44": 30,
            "55": 30,
            "66": 18
        },
        "one": {
          "11": {
            "2": 30,
              "3": 19,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "22": {
            "1": 30,
              "3": 12,
              "4": 25,
              "5": 30,
              "6": 30
          },
          "33": {
            "1": 30,
              "2": 23,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "44": {
            "1": 30,
              "2": 30,
              "3": 30,
              "5": 30,
              "6": 30
          },
          "55": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 30,
              "6": 30
          },
          "66": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 30,
              "5": 18
          }
        }
      }
    },
      "k3sbth": {
      "current": {
        "123": 17,
          "124": 30,
          "125": 5,
          "126": 30,
          "134": 30,
          "135": 30,
          "136": 30,
          "145": 30,
          "146": 8,
          "156": 30,
          "234": 1,
          "235": 30,
          "236": 30,
          "245": 13,
          "246": 30,
          "256": 30,
          "345": 30,
          "346": 30,
          "356": 30,
          "456": 0
      },
      "hot": {
        "123": 11,
          "124": 0,
          "125": 1,
          "126": 0,
          "134": 0,
          "135": 0,
          "136": 0,
          "145": 0,
          "146": 1,
          "156": 0,
          "234": 3,
          "235": 0,
          "236": 0,
          "245": 1,
          "246": 0,
          "256": 0,
          "345": 0,
          "346": 0,
          "356": 0,
          "456": 2
      },
      "average": {
        "123": 2,
          "124": 30,
          "125": 29,
          "126": 30,
          "134": 30,
          "135": 30,
          "136": 30,
          "145": 30,
          "146": 29,
          "156": 30,
          "234": 9,
          "235": 30,
          "236": 30,
          "245": 29,
          "246": 30,
          "256": 30,
          "345": 30,
          "346": 30,
          "356": 30,
          "456": 14
      },
      "max": {
        "123": 17,
          "124": 30,
          "125": 24,
          "126": 30,
          "134": 30,
          "135": 30,
          "136": 30,
          "145": 30,
          "146": 21,
          "156": 30,
          "234": 14,
          "235": 30,
          "236": 30,
          "245": 16,
          "246": 30,
          "256": 30,
          "345": 30,
          "346": 30,
          "356": 30,
          "456": 19
      }
    },
      "k3ebth": {
      "current": {
        "ebth": {
          "12": 5,
            "13": 10,
            "14": 8,
            "15": 5,
            "16": 8,
            "23": 1,
            "24": 1,
            "25": 5,
            "26": 30,
            "34": 1,
            "35": 30,
            "36": 30,
            "45": 0,
            "46": 0,
            "56": 0
        },
        "one": {
          "12": {
            "1": 30,
              "2": 30,
              "3": 17,
              "4": 30,
              "5": 5,
              "6": 30
          },
          "13": {
            "1": 10,
              "2": 17,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "14": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 8
          },
          "15": {
            "1": 30,
              "2": 5,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "16": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 8,
              "5": 30,
              "6": 30
          },
          "23": {
            "1": 17,
              "2": 3,
              "3": 6,
              "4": 1,
              "5": 30,
              "6": 30
          },
          "24": {
            "1": 30,
              "2": 4,
              "3": 1,
              "4": 30,
              "5": 13,
              "6": 30
          },
          "25": {
            "1": 5,
              "2": 30,
              "3": 30,
              "4": 13,
              "5": 30,
              "6": 30
          },
          "26": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "34": {
            "1": 30,
              "2": 1,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "35": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "36": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "45": {
            "1": 30,
              "2": 13,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 0
          },
          "46": {
            "1": 8,
              "2": 30,
              "3": 30,
              "4": 30,
              "5": 0,
              "6": 30
          },
          "56": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 0,
              "5": 30,
              "6": 11
          }
        }
      },
      "hot": {
        "ebth": {
          "12": 12,
            "13": 12,
            "14": 1,
            "15": 1,
            "16": 1,
            "23": 19,
            "24": 5,
            "25": 2,
            "26": 0,
            "34": 3,
            "35": 0,
            "36": 0,
            "45": 3,
            "46": 3,
            "56": 3
        },
        "one": {
          "12": {
            "1": 0,
              "2": 0,
              "3": 11,
              "4": 0,
              "5": 1,
              "6": 0
          },
          "13": {
            "1": 1,
              "2": 11,
              "3": 0,
              "4": 0,
              "5": 0,
              "6": 0
          },
          "14": {
            "1": 0,
              "2": 0,
              "3": 0,
              "4": 0,
              "5": 0,
              "6": 1
          },
          "15": {
            "1": 0,
              "2": 1,
              "3": 0,
              "4": 0,
              "5": 0,
              "6": 0
          },
          "16": {
            "1": 0,
              "2": 0,
              "3": 0,
              "4": 1,
              "5": 0,
              "6": 0
          },
          "23": {
            "1": 11,
              "2": 4,
              "3": 1,
              "4": 3,
              "5": 0,
              "6": 0
          },
          "24": {
            "1": 0,
              "2": 1,
              "3": 3,
              "4": 0,
              "5": 1,
              "6": 0
          },
          "25": {
            "1": 1,
              "2": 0,
              "3": 0,
              "4": 1,
              "5": 0,
              "6": 0
          },
          "26": {
            "1": 0,
              "2": 0,
              "3": 0,
              "4": 0,
              "5": 0,
              "6": 0
          },
          "34": {
            "1": 0,
              "2": 3,
              "3": 0,
              "4": 0,
              "5": 0,
              "6": 0
          },
          "35": {
            "1": 0,
              "2": 0,
              "3": 0,
              "4": 0,
              "5": 0,
              "6": 0
          },
          "36": {
            "1": 0,
              "2": 0,
              "3": 0,
              "4": 0,
              "5": 0,
              "6": 0
          },
          "45": {
            "1": 0,
              "2": 1,
              "3": 0,
              "4": 0,
              "5": 0,
              "6": 2
          },
          "46": {
            "1": 1,
              "2": 0,
              "3": 0,
              "4": 0,
              "5": 2,
              "6": 0
          },
          "56": {
            "1": 0,
              "2": 0,
              "3": 0,
              "4": 2,
              "5": 0,
              "6": 1
          }
        }
      },
      "average": {
        "ebth": {
          "12": 2,
            "13": 2,
            "14": 29,
            "15": 29,
            "16": 29,
            "23": 2,
            "24": 9,
            "25": 29,
            "26": 30,
            "34": 9,
            "35": 30,
            "36": 30,
            "45": 14,
            "46": 14,
            "56": 14
        },
        "one": {
          "12": {
            "1": 30,
              "2": 30,
              "3": 2,
              "4": 30,
              "5": 29,
              "6": 30
          },
          "13": {
            "1": 29,
              "2": 2,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "14": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 29
          },
          "15": {
            "1": 30,
              "2": 29,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "16": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 29,
              "5": 30,
              "6": 30
          },
          "23": {
            "1": 2,
              "2": 7,
              "3": 29,
              "4": 9,
              "5": 30,
              "6": 30
          },
          "24": {
            "1": 30,
              "2": 29,
              "3": 9,
              "4": 30,
              "5": 29,
              "6": 30
          },
          "25": {
            "1": 29,
              "2": 30,
              "3": 30,
              "4": 29,
              "5": 30,
              "6": 30
          },
          "26": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "34": {
            "1": 30,
              "2": 9,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "35": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "36": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 30
          },
          "45": {
            "1": 30,
              "2": 29,
              "3": 30,
              "4": 30,
              "5": 30,
              "6": 14
          },
          "46": {
            "1": 29,
              "2": 30,
              "3": 30,
              "4": 30,
              "5": 14,
              "6": 30
          },
          "56": {
            "1": 30,
              "2": 30,
              "3": 30,
              "4": 14,
              "5": 30,
              "6": 29
          }
        }
      },
      "max": {
        "ebth": {
          "12": 12,
            "13": 11,
            "14": 21,
            "15": 24,
            "16": 21,
            "23": 6,
            "24": 15,
            "25": 16,
            "26": 30,
            "34": 15,
            "35": 30,
            "36": 30,
            "45": 16,
            "46": 20,
            "56": 18
        },
        "one": {
          "12": [12],
            "13": [11],
            "14": [21],
            "15": [24],
            "16": [21],
            "23": [6],
            "24": [15],
            "25": [16],
            "26": [30],
            "34": [15],
            "35": [30],
            "36": [30],
            "45": [16],
            "46": [20],
            "56": [18]
        }
      }
    },
      "k3slh": {
      "current": {
        "123": 17,
          "234": 1,
          "345": 30,
          "456": 0
      },
      "hot": {
        "123": 11,
          "234": 3,
          "345": 0,
          "456": 2
      },
      "average": {
        "123": 2,
          "234": 9,
          "345": 30,
          "456": 14
      },
      "max": {
        "123": 17,
          "234": 14,
          "345": 30,
          "456": 19
      }
    },
      "k3dtys": {
      "current": {
        "1": 5,
          "2": 1,
          "3": 1,
          "4": 0,
          "5": 0,
          "6": 0
      },
      "hot": {
        "1": 16,
          "2": 22,
          "3": 20,
          "4": 8,
          "5": 5,
          "6": 5
      },
      "average": {
        "1": 1,
          "2": 1,
          "3": 1,
          "4": 3,
          "5": 5,
          "6": 5
      },
      "max": {
        "1": 6,
          "2": 5,
          "3": 3,
          "4": 14,
          "5": 15,
          "6": 15
      }
    }
    }
    localStorage.yldata30 = JSON.stringify(yl);
    localStorage.yldata60 = JSON.stringify(yl);
    localStorage.yldata90 = JSON.stringify(yl);
    var userInfo = JSON.parse(localStorage.userInfo);
    console.log('userInfo==' + userInfo);
    // /api-lotteries-h5/getnewlottterymissed/{lottery_id}/{count}
    var url = '/api-lotteries-h5/getnewlottterymissed/21/30?_t=' + userInfo.auth_token;
    // http://user.firecat.com/api-lotteries-h5/load-issues/1?_t=4b5dbcc45a38784ce1aabaaa03ae806a
    this.rest.getUrlReturn(url)
      .subscribe((data) => {
        console.log('遗漏数据～～～～～' + data);
        console.log('localStorage.yldata30===' + localStorage.yldata30);

        if (data.IsSuccess) {

          localStorage.yldata30 = JSON.stringify(data.data);

          // JSON.parse(localStorage.yldata30).k3dtys;
          var hzarr = JSON.parse(localStorage.yldata30).hz;
          var k3sth = JSON.parse(localStorage.yldata30).k3sth;
          var k3eth = JSON.parse(localStorage.yldata30).k3eth;
          var k3sbth = JSON.parse(localStorage.yldata30).k3sbth;
          var k3ebth = JSON.parse(localStorage.yldata30).k3ebth;
          var k3slh = JSON.parse(localStorage.yldata30).k3slh;
          var k3dtys = JSON.parse(localStorage.yldata30).k3dtys;

          for (var k = 0; k < 20; k++) {

            //和值  18
            var inx = k + 3;
            $('.hz-section').find('.total.loss').eq(k).text(hzarr['current'][inx]);
            $('.hz-section').find('.total.cold').eq(k).text(hzarr['hot'][inx]);
            $('.hz-section').find('.total.aver').eq(k).text(hzarr['average'][inx]);
            $('.hz-section').find('.total.most').eq(k).text(hzarr['max'][inx]);

            //三同号   6
            var innx = $('.santh-section  .ball-num').eq(k).find('span').text();
            $('.santh-section').find('.total.loss').eq(k).text(k3sth['current'][innx]);
            $('.santh-section').find('.total.cold').eq(k).text(k3sth['hot'][innx]);
            $('.santh-section').find('.total.aver').eq(k).text(k3sth['average'][innx]);
            $('.santh-section').find('.total.most').eq(k).text(k3sth['max'][innx]);

            // 二同号 tonghao
            var innx = $('.ert-section .tonghao  .ball-num').eq(k).find('span').text();
            $('.ert-section .tonghao').find('.total.loss').eq(k).text(k3eth['current']['eth'][innx]);
            $('.ert-section .tonghao').find('.total.cold').eq(k).text(k3eth['hot']['eth'][innx]);
            $('.ert-section .tonghao').find('.total.aver').eq(k).text(k3eth['average']['eth'][innx]);
            $('.ert-section .tonghao').find('.total.most').eq(k).text(k3eth['max']['eth'][innx]);

            //三不同号 20
            var inx_txt = $('.sanbth-section  .ball-num').eq(k).find('span').text();
            $('.sanbth-section').find('.total.loss').eq(k).text(k3sbth['current'][inx_txt]);
            $('.sanbth-section').find('.total.cold').eq(k).text(k3sbth['hot'][inx_txt]);
            $('.sanbth-section').find('.total.aver').eq(k).text(k3sbth['average'][inx_txt]);
            $('.sanbth-section').find('.total.most').eq(k).text(k3sbth['max'][inx_txt]);

            //二不同号 15
            var inx_txt = parseInt($('.erbth-section  .ball-num').eq(k).find('span').text());
            $('.erbth-section').find('.total.loss').eq(k).text(k3ebth['current']['ebth'][inx_txt]);
            $('.erbth-section').find('.total.cold').eq(k).text(k3ebth['hot']['ebth'][inx_txt]);
            $('.erbth-section').find('.total.aver').eq(k).text(k3ebth['average']['ebth'][inx_txt]);
            $('.erbth-section').find('.total.most').eq(k).text(k3ebth['max']['ebth'][inx_txt]);

            //三连号  4
            var inx_txt = parseInt($('.sanlh-section  .ball-num').eq(k).find('span').text());
            $('.sanlh-section').find('.total.loss').eq(k).text(k3slh['current'][inx_txt]);
            $('.sanlh-section').find('.total.cold').eq(k).text(k3slh['hot'][inx_txt]);
            $('.sanlh-section').find('.total.aver').eq(k).text(k3slh['average'][inx_txt]);
            $('.sanlh-section').find('.total.most').eq(k).text(k3slh['max'][inx_txt]);

            //单挑  6
            var inx_txt = parseInt($('.dtys-section  .ball-num').eq(k).find('span').text());
            $('.dtys-section').find('.total.loss').eq(k).text(k3dtys['current'][inx_txt]);
            $('.dtys-section').find('.total.cold').eq(k).text(k3dtys['hot'][inx_txt]);
            $('.dtys-section').find('.total.aver').eq(k).text(k3dtys['average'][inx_txt]);
            $('.dtys-section').find('.total.most').eq(k).text(k3dtys['max'][inx_txt]);

          }
        }
      });

  }

  requestHisData() {
    // localStorage.clear()
    var userInfo = JSON.parse(localStorage.userInfo);
    console.log('userInfo==' + userInfo);
    var url = '/api-lotteries-h5/load-issues/21?_t=' + userInfo.auth_token; //load-issues/21?count=90&_t=' // + userInfo.auth_token;
    // http://user.firecat.com/api-lotteries-h5/load-issues/1?_t=4b5dbcc45a38784ce1aabaaa03ae806a
    this.rest.getUrlReturn(url)
      .subscribe((data) => {
        console.log(data);
        if (data.IsSuccess) {

          localStorage.hisissue = JSON.stringify(data.data);
          console.log('localStorage.hisissue===' + JSON.parse(localStorage.hisissue));
          var htm = '', newary = [];
          if (data.data.length > 10) {
            newary = data.data.slice(0, 9);
          } else {
            newary = data.data;
          }
          console.log('nweary===' + newary);
          var code0, code1, code2, toltal, dx, jo, item;
          for (var i = 0; i < newary.length; i++) {
            code0 = newary[i].code.split('')[0];
            code1 = newary[i].code.split('')[1];
            code2 = newary[i].code.split('')[2];
            toltal = parseInt(code0) + parseInt(code1) + parseInt(code2);
            toltal > 10 ? dx = '大' : dx = '小';
            toltal % 2 == 0 ? jo = '偶' : jo = '奇';
            //20180602015  20180602015--  0602015期
            if (newary[i].code == '') {
              item = '<li class="his-line">\n' +
                '        <p class="t-issue">' + newary[i].number.slice(4) + '期</p>\n' +
                '        <p class="cutline"><span class="dom"></span></p>\n' +
                '        <p class="kj-ing">正在开奖...</p>\n' +
                '      </li>';
            } else {
              item = '<li class="his-line">\n' +
                // '        <p class="t-issue">' + newary[i].number + '期</p>\n' +
                '        <p class="t-issue">' + newary[i].number.slice(4) + '期</p>\n' +
                '        <p class="cutline"><span class="dom"></span></p>\n' +
                '        <p class="t-num">\n' +
                '           <span class="saizi-span">\n' +
                '        <i class="saizi saizi-' + code0 + '"></i>\n' +
                '        <i class="saizi saizi-' + code1 + '"></i>\n' +
                '        <i class="saizi saizi-' + code2 + '"></i>\n' +
                '      </span>\n' +
                '          ' + newary[i].code + ' </p>\n' +
                '        <p class="t-total"> ' + toltal + '</p>\n' +
                '        <p class="t-big">' + dx + '</p>\n' +
                '        <p class="t-odd">' + jo + '</p>\n' +
                '      </li>';
            }
            htm = htm + item;
          }
          $('.his-ul').html(htm);

        }
      });

  }


  ionViewWillEnter() {

    this.base.requestJiangQiData('21', '3','play').then(() => {
      console.log('k3333333333')
    });

    // console.log('重新进入初始化 页面～～～')
    //初始化 顶部 选择按钮
    this.resetTopSelectView();

    if (localStorage.balls == null) {
      console.log('----WillEnter');
      $('.confirm-number').addClass('hide');
      $('.bottom-r').css('background', 'grey');
      return;
    }
    let balll = JSON.parse(localStorage.balls);
    if (balll.length > 0) {
      $('.confirm-number').removeClass('hide');
      $('.confirm-number').text(balll.length);
    } else {
      $('.confirm-number').addClass('hide');
    }

  }

  ionViewDidLeave() {
    // clearInterval(this.base.timeIddd);
  }

  ionViewWillLeave() {
    clearInterval(this.base.timeIddd);
    //记录当前topselelctview
    localStorage.removeItem('kshtml');
  }


  resetTopSelectView() {

    if (localStorage.kshtml != null) {

      $('page-ks .alert-con').html(localStorage.kshtml);
      console.log('resetTopSel---ocalStorage.kshtml==' + localStorage.kshtml);
      this.changePlaySelect();
    }

    //2 ，页面返回根据玩法切换ui
    if (localStorage.wanfa) {

      console.log('localStorage.wanfa=='+localStorage.wanfa);
      $('page-ks .section').addClass('hide');
      if (localStorage.wanfa.search('和值') != -1) {
        $('.hz-section').removeClass('hide');
        $('.hz-section').addClass('current');
      }else if(localStorage.wanfa.search('三同') != -1){
        $('.santh-section').removeClass('hide');
        $('.santh-section').addClass('current');
      }else if(localStorage.wanfa.search('二同') != -1){
        $('.ert-section').removeClass('hide');
        $('.ert-section').addClass('current');
      }else if(localStorage.wanfa.search('三不同') != -1){
        $('.sanbth-section').removeClass('hide');
        $('.sanbth-section').addClass('current');
      }else if(localStorage.wanfa.search('二不同') != -1) {
        $('.erbth-section').removeClass('hide');
        $('.erbth-section').addClass('current');
      }else if(localStorage.wanfa.search('三连') != -1) {
        $('.sanlh-section').removeClass('hide');
        $('.sanlh-section').addClass('current');
      }else if(localStorage.wanfa.search('单挑') != -1) {
        $('.dtys-section').removeClass('hide');
        $('.dtys-section').addClass('current');
      }


    }


  }


  initAny() {
    localStorage.wayId=237;
    localStorage.moneyunit=1;
    this.base.initHisBox('ks-content');
    if ($('#ks-content .section.current').offset().top < 97) {
      $(".his-box").stop().animate({height: "0px"}, 0);
      return;
    }
  }

  pushToBasket() {

    var moneyunit = 1;
    var txt = $('.money-btn i').text();
    if (txt == '元') {
      moneyunit = 1;
    } else if (txt == '角') {
      moneyunit = 0.1;
    } else if (txt == '分') {
      moneyunit = 0.01;
    }
    localStorage.moneyunit = moneyunit;

    var ballstr = localStorage.balls;
    var zhu = $('.total-num').text();
    //1 当前选择注数为空 但选球不为空
    if (parseInt(zhu) == 0 && ballstr != null && ballstr != '[]') {
      // clearInterval(timeIddd);
      this.navCtrl.push(KsBasketPage, {});
      return;
    } else if (  //2 当前选择注数为空 并且 选球为空
      (parseInt(zhu) == 0 && ballstr == null) ||
      (parseInt(zhu) == 0 && ballstr == '[]')) {

      // var content = localStorage.bet_note;
      // alert("请选号～～～"); //或者机选
      this.shakeClick();
      return;
    }

// 当前选择注数不为空
    this.addOrderEvent();

    this.navCtrl.push(KsBasketPage, {})

  }


  pushToTrend() {

    //判断当前 玩法  -- 》 传参 ， 对应的 不同  走势图页面
    this.navCtrl.push(KstrendPage, {wanfa: $('.wanfa').text(), htm: $('.alert-con').html()});

  }


  // requestPlayData() {
  //   var userInfo = JSON.parse(lopushToTrendcalStorage.userInfo);
  //   console.log(userInfo);
  //   var url = '/api-lotteries-h5/load-data/2/21?_t=' + userInfo.auth_token;
  //   this.rest.postUrlReturn(url, {_token: userInfo.token})
  //     .subscribe((data) => {
  //       console.log(data);
  //       if (data.IsSuccess) {
  //         // this.loading.dismiss();
  //         $('.play-list').html('');
  //         $('.after-select').html('');
  //         var totalArr = data.data.game_ways;
  //         for (var i = 0; i < totalArr.length; i++) {
  //           var name_en = totalArr[i].name_en;
  //           var htm = '<li><i class="play-black">' + totalArr[i].name_cn + '</i><input type="hidden" value=""></input></li>';
  //           $('.play-list').append(htm);
  //           $('.play-list .play-black').eq(i).next().val(name_en);
  //           var aftercon = '<div class="after-con"></div>';
  //           $('.after-select').append(aftercon);
  //           for (var j = 0; j < totalArr[i].children.length; j++) {
  //             var len = totalArr[i].children[j].name_cn.length + 1;
  //             var cellhtml = '<div class="after-list clear after-list-' + len + '"><div class="after-l"><i class="after-text">' + totalArr[i].children[j].name_cn + ':</i><input type="hidden" value="" id=""></input></div><ul class="lastchina"></ul></div>';
  //             $('.after-con').eq(i).append(cellhtml);
  //             $('.after-con').eq(i).find('.after-list').eq(j).find(".after-text").next().val(totalArr[i].children[j].name_en);
  //             for (var x = 0; x < totalArr[i].children[j].children.length; x++) {
  //               var ballhtml = '<li><i class="play-black play-opacity">' + totalArr[i].children[j].children[x].name_cn + '</i><input type="hidden" value="" id=""></input></li>';
  //               $('.after-con').eq(i).find('.after-list .lastchina').eq(j).append(ballhtml);
  //               var name_en = totalArr[i].children[j].children[x].name_en;
  //               var price = totalArr[i].children[j].children[x].price;
  //               var bet_note = totalArr[i].children[j].children[x].bet_note;
  //               var bonus_note = totalArr[i].children[j].children[x].bonus_note;
  //               var max_multiple = totalArr[i].children[j].children[x].max_multiple;
  //               var is_enable_extra = totalArr[i].children[j].children[x].is_enable_extra;
  //               $('.after-con').eq(i).find('.after-list .lastchina').eq(j).find('.play-black').eq(x).next().val(name_en + '|' + price + '|' + bet_note + '|' + bonus_note + '|' + max_multiple + '|' + is_enable_extra);
  //               $('.after-con').eq(i).find('.after-list .lastchina').eq(j).find('input').eq(x).attr('id', totalArr[i].children[j].children[x].id);
  //             }
  //           }
  //         }
  //         this.base.setDefultPlayedUi('3');
  //         this.changePlaySelect();
  //       } else {
  //         // this.loading.dismiss();
  //       }
  //       this.base.requestJiangQiData(21, '3');
  //     });
  // }

}
