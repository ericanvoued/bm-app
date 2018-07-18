import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

//page module
import {HttpClientModule} from "@angular/common/http";
import {TabsPage} from '../pages/tabs/tabs'

//native provider
import {QRScanner} from '@ionic-native/qr-scanner';
import {Camera} from '@ionic-native/camera';
import {File} from '@ionic-native/file';
import {FileTransfer} from '@ionic-native/file-transfer';

//users proviver
import {HomeProvider} from '../providers/home/home';
import {LoginProvider} from '../providers/login/login';
import {RestProvider} from '../providers/rest/rest';
import {LoadingProvider} from '../providers/loading/loading';
import {InfoCenterProvider} from '../providers/info-center/info-center';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {CommonProvider} from '../providers/common/common';
import {HttpClientProvider} from '../providers/http-client/http-client';
import {ToolsProvider} from '../providers/tools/tools';
import {BaseToolProvider} from '../providers/base-tool/base-tool';
import {SignupProvider} from '../providers/signup/signup';

import {KstrendAction} from '../pages/k3/kstrend/kstrend-action';

//动画模块
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UtilProvider} from '../providers/util/util';
import {BasketDataProvider} from '../providers/basket-data/basket-data';
import {Vibration} from '@ionic-native/vibration';



//开奖中心的组件
import {K3CoodHotComponent} from '../components/lottory-center/k3-cood-hot/k3-cood-hot'
import {K3KaijiangComponent} from '../components/lottory-center/k3-kaijiang/k3-kaijiang'
import {K3ShapeTrendComponent} from '../components/lottory-center/k3-shape-trend/k3-shape-trend'
import {K3BaseTrendComponent} from '../components/lottory-center/k3-base-trend/k3-base-trend'
import {LhcShengxiaoComponent} from '../components/lottory-center/lhc-shengxiao/lhc-shengxiao'
import {LhcKaijiangComponent} from '../components/lottory-center/lhc-kaijiang/lhc-kaijiang'
import {LhcBoseComponent} from '../components/lottory-center/lhc-bose/lhc-bose'
import {SscKaijiangComponent} from '../components/lottory-center/ssc-kaijiang/ssc-kaijiang'
import {SscDanshuangComponent} from '../components/lottory-center/ssc-danshuang/ssc-danshuang'
import {SscDaxiaoComponent} from '../components/lottory-center/ssc-daxiao/ssc-daxiao'
import {YDistributeComponent} from '../components/lottory-center/y-distribute/y-distribute'
import {YKaijiangComponent} from '../components/lottory-center/y-kaijiang/y-kaijiang'

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    K3CoodHotComponent,
    K3KaijiangComponent,
    K3ShapeTrendComponent,
    K3BaseTrendComponent,
    LhcShengxiaoComponent,
    LhcKaijiangComponent,
    LhcBoseComponent,
    SscKaijiangComponent,
    SscDanshuangComponent,
    SscDaxiaoComponent,
    YDistributeComponent,
    YKaijiangComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',//按钮内容
      backButtonIcon: 'ios-arrow-back',//按钮图标样式
      tabsHideOnSubPages: true
    })
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    K3CoodHotComponent,
    K3KaijiangComponent,
    K3ShapeTrendComponent,
    K3BaseTrendComponent,
    LhcShengxiaoComponent,
    LhcKaijiangComponent,
    LhcBoseComponent,
    SscKaijiangComponent,
    SscDanshuangComponent,
    SscDaxiaoComponent,
    YDistributeComponent,
    YKaijiangComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    QRScanner,
    Vibration,
    File,
    FileTransfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HomeProvider,
    LoginProvider,
    RestProvider,
    LoadingProvider,
    InfoCenterProvider,
    CommonProvider,
    HttpClientProvider,
    ToolsProvider,
    UtilProvider,
    BasketDataProvider,
    SignupProvider,
    BaseToolProvider, KstrendAction
  ]
})
export class AppModule {
}
