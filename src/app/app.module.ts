import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpClientModule} from "@angular/common/http";

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LottoryCenterPage } from '../pages/lottory-center/lottory-center'
import { ActivityPage } from '../pages/activity/activity'
import { UserCenterPage } from '../pages/user-center/user-center'
import { HotGmageListPage } from '../pages/hot-gmage-list/hot-gmage-list'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonProvider } from '../providers/common/common';
import { SscServiceProvider } from '../providers/games/ssc-service/ssc-service'


import { HttpClientProvider } from '../providers/http-client/http-client';
import { ToolsProvider } from '../providers/tools/tools';
import { ComponentsModule } from '../components/components.module'
//动画模块
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilProvider } from '../providers/util/util';
import { BasketDataProvider } from '../providers/basket-data/basket-data';
import { Vibration } from '@ionic-native/vibration';
import { TrendHeadComponent } from '../components/gametrend/trend-head/trend-head'
import { WuxingComponent } from '../components/gametrend/wuxing/wuxing'
import { gameConfig } from './gameComponent'

// ssc组件
import { ZhixuanfushiComponent } from '../components/ssc-game/wuxing/zhixuanfushi/zhixuanfushi'
import { WuxingzhixuanzuheComponent } from '../components/ssc-game/wuxing/wuxingzhixuanzuhe/wuxingzhixuanzuhe'
import { Zuxuan20Component } from '../components/ssc-game/wuxing/zuxuan20/zuxuan20'
import { Zuxuan30Component } from '../components/ssc-game/wuxing/zuxuan30/zuxuan30'
import { Zuxuan60Component } from '../components/ssc-game/wuxing/zuxuan60/zuxuan60'
import { Zuxuan120Component } from '../components/ssc-game/wuxing/zuxuan120/zuxuan120'
import { Zuxuan10Component } from '../components/ssc-game/wuxing/zuxuan10/zuxuan10'
import { Zuxuan5Component } from '../components/ssc-game/wuxing/zuxuan5/zuxuan5'

import { Zuxuan24Component } from '../components/ssc-game/sixing/zuxuan24/zuxuan24'
import { Zuxuan12Component } from '../components/ssc-game/sixing/zuxuan12/zuxuan12'
import { Zuxuan6Component } from '../components/ssc-game/sixing/zuxuan6/zuxuan6'
import { Zuxuan4Component } from '../components/ssc-game/sixing/zuxuan4/zuxuan4'

import { SiXingZhixuanfushiComponent } from '../components/ssc-game/sixing/zhixuanfushi/zhixuanfushi'
import { QisanzhixuanhezhiComponent } from '../components/ssc-game/qiansan/qisanzhixuanhezhi/qisanzhixuanhezhi'
import { QisanzhixuankuaduComponent } from '../components/ssc-game/qiansan/qisanzhixuankuadu/qisanzhixuankuadu'
import { QisanzhixuanfushiComponent } from '../components/ssc-game/qiansan/qisanzhixuanfushi/qisanzhixuanfushi'
import { QisanzhixuanzuheComponent } from '../components/ssc-game/qiansan/qisanzhixuanzuhe/qisanzhixuanzuhe'
import { Qisanzuxuan3Component } from '../components/ssc-game/qiansan/qisanzuxuan3/qisanzuxuan3'
import { Qisanzuxuan6Component } from '../components/ssc-game/qiansan/qisanzuxuan6/qisanzuxuan6'
import { QisanzuxuanhezhiComponent } from '../components/ssc-game/qiansan/qisanzuxuanhezhi/qisanzuxuanhezhi'
import { QisanbaodanComponent } from '../components/ssc-game/qiansan/qisanbaodan/qisanbaodan'
import { QisantesuhaomaComponent } from '../components/ssc-game/qiansan/qisantesuhaoma/qisantesuhaoma'

import { ZhongsanzhixuanfushiComponent } from '../components/ssc-game/zhongsan/zhongsanzhixuanfushi/zhongsanzhixuanfushi'
import { ZhongsanzhixuanhezhiComponent } from '../components/ssc-game/zhongsan/zhongsanzhixuanhezhi/zhongsanzhixuanhezhi'
import { ZhongsanzhixuankuaduComponent } from '../components/ssc-game/zhongsan/zhongsanzhixuankuadu/zhongsanzhixuankuadu'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LottoryCenterPage,
    ActivityPage,
    UserCenterPage,
    TabsPage,
    HotGmageListPage,
    TrendHeadComponent,
    WuxingComponent,
    ...gameConfig.ssc
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      NoopAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LottoryCenterPage,
    ActivityPage,
    UserCenterPage,
    TabsPage,
    HotGmageListPage,
    TrendHeadComponent,
    WuxingComponent,
    ...gameConfig.ssc
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Vibration,
    CommonProvider,
    HttpClientProvider,
    ToolsProvider,
    UtilProvider,
    SscServiceProvider,
    BasketDataProvider
    
  ]
})
export class AppModule {}
