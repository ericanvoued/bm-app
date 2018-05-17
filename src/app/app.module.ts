import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LottoryCenterPage } from '../pages/lottory-center/lottory-center'
import { ActivityPage } from '../pages/activity/activity'
import { UserCenterPage } from '../pages/user-center/user-center'
import { HotGmageListPage } from '../pages/hot-gmage-list/hot-gmage-list'

import { LhcSlidePage } from '../pages/lhc/lhc-slide/lhc-slide'
import { KsPage } from '../pages/k3/ks/ks'
// import { KsBasketPage } from '../pages/k3/ks-basket/ks-basket'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PopViewComponent } from '../components/pop-view/pop-view';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LottoryCenterPage,
    ActivityPage,
    UserCenterPage,
    TabsPage,
    HotGmageListPage,
    LhcSlidePage,
    KsPage,
    PopViewComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',//按钮内容
      backButtonIcon: 'ios-arrow-back',//按钮图标样式
      tabsHideOnSubPages: true
    }),
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
    LhcSlidePage,
    KsPage,
    PopViewComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
