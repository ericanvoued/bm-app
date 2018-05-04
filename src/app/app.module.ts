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

import { HttpClientProvider } from '../providers/http-client/http-client';
import { ToolsProvider } from '../providers/tools/tools';

//动画模块
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilProvider } from '../providers/util/util';
import { BasketDataProvider } from '../providers/basket-data/basket-data';
import { Vibration } from '@ionic-native/vibration';
import { TrendHeadComponent } from '../components/gametrend/trend-head/trend-head'
import { WuxingComponent } from '../components/gametrend/wuxing/wuxing'

import { ZhixuanfushiComponent } from '../components/ssc-game/wuxing/zhixuanfushi/zhixuanfushi'
import { WuxingzhixuanzuheComponent } from '../components/ssc-game/wuxing/wuxingzhixuanzuhe/wuxingzhixuanzuhe'


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
    WuxingzhixuanzuheComponent
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
    WuxingzhixuanzuheComponent
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
    BasketDataProvider
    
  ]
})
export class AppModule {}
