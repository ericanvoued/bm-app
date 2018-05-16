import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { CountTipComponent } from '../components/count-tip/count-tip'

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
import { SixingComponent } from '../components/gametrend/sixing/sixing'
import { ZhixuanhezhiComponent } from '../components/gametrend/qiansan/zhixuanhezhi/zhixuanhezhi'
import { gameConfig } from './gameComponent'



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
    SixingComponent,
    ZhixuanhezhiComponent,
    CountTipComponent,
    ...gameConfig.ssc,
    ...gameConfig.d5
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      NoopAnimationsModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true'   
    })
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
    SixingComponent,
    ZhixuanhezhiComponent,
    CountTipComponent,
    ...gameConfig.ssc,
    ...gameConfig.d5
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
