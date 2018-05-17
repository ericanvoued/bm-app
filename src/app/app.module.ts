import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LottoryCenterPage } from '../pages/lottory-center/lottory-center'
import { ActivityPage } from '../pages/activity/activity'
import { UserCenterPage } from '../pages/user/user-center/user-center'
import { HotGmageListPage } from '../pages/hot-gmage-list/hot-gmage-list'


import { IonicStorageModule } from '@ionic/storage'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Camera} from '@ionic-native/camera';
import {File} from '@ionic-native/file';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
import { HomeProvider } from '../providers/home/home';
import { LoginProvider } from '../providers/login/login';
import { RestProvider } from '../providers/rest/rest';
import { LoadingProvider } from '../providers/loading/loading';
import { InfoCenterProvider } from '../providers/info-center/info-center';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LottoryCenterPage,
    ActivityPage,
    UserCenterPage,
    TabsPage,
    HotGmageListPage,
    // LoginPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',//按钮内容
      backButtonIcon: 'ios-arrow-back',//按钮图标样式
      tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot() //全局定义 storage 模块
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
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
  ]
})
export class AppModule { }
