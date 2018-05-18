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
import { UserCenterPage } from '../pages/user/user-center/user-center'
import { HotGmageListPage } from '../pages/hot-gmage-list/hot-gmage-list'


import { IonicStorageModule } from '@ionic/storage'
import {Camera} from '@ionic-native/camera';
import {File} from '@ionic-native/file';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
import { HomeProvider } from '../providers/home/home';
import { LoginProvider } from '../providers/login/login';
import { RestProvider } from '../providers/rest/rest';
import { LoadingProvider } from '../providers/loading/loading';
import { InfoCenterProvider } from '../providers/info-center/info-center';
import { LhcSlidePage } from '../pages/lhc/lhc-slide/lhc-slide'
import { KsPage } from '../pages/k3/ks/ks'
// import { KsBasketPage } from '../pages/k3/ks-basket/ks-basket'

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
    WuxingComponent,
    SixingComponent,
    ZhixuanhezhiComponent,
    CountTipComponent,
    LhcSlidePage,
    KsPage,
    ...gameConfig.ssc,
    ...gameConfig.d5
    // LoginPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',//按钮内容
      backButtonIcon: 'ios-arrow-back',//按钮图标样式
      tabsHideOnSubPages: 'true'
    }),
    IonicStorageModule.forRoot()
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
    // LoginPage,
    WuxingComponent,
    SixingComponent,
    ZhixuanhezhiComponent,
    LhcSlidePage,
    KsPage,
    CountTipComponent,
    ...gameConfig.ssc,
    ...gameConfig.d5


  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Vibration,
    File,
    Transfer,
    TransferObject,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HomeProvider,
    LoginProvider,
    RestProvider,
    LoadingProvider,
    InfoCenterProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonProvider,
    HttpClientProvider,
    ToolsProvider,
    UtilProvider,
    SscServiceProvider,
    BasketDataProvider

  ]
})
export class AppModule { }
