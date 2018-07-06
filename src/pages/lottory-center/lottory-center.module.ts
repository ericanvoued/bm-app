import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LottoryCenterPage } from './lottory-center';
import {SscDaxiaoComponentModule} from '../../components/lottory-center/ssc-daxiao/ssc-daxiao.module'
import {SscKaijiangComponentModule} from '../../components/lottory-center/ssc-kaijiang/ssc-kaijiang.module'
import {SscDanshuangComponentModule} from '../../components/lottory-center/ssc-danshuang/ssc-danshuang.module'

import {K3BaseTrendComponentModule} from '../../components/lottory-center/k3-base-trend/k3-base-trend.module'
import {K3CoodHotComponentModule} from '../../components/lottory-center/k3-cood-hot/k3-cood-hot.module'
import {K3KaijiangComponentModule} from '../../components/lottory-center/k3-kaijiang/k3-kaijiang.module'
import {K3ShapeTrendComponentModule} from '../../components/lottory-center/k3-shape-trend/k3-shape-trend.module'
import {LhcShengxiaoComponentModule} from '../../components/lottory-center/lhc-shengxiao/lhc-shengxiao.module'
import {LhcKaijiangComponentModule} from '../../components/lottory-center/lhc-kaijiang/lhc-kaijiang.module'
import {LhcBoseComponentModule} from '../../components/lottory-center/lhc-bose/lhc-bose.module'
import {Pk10daxiaoComponentModule} from '../../components/lottory-center/pk10daxiao/pk10daxiao.module'
import {Pk10LonghuComponentModule} from '../../components/lottory-center/pk10-longhu/pk10-longhu.module'
import {Pk10KaijiangComponentModule} from '../../components/lottory-center/pk10-kaijiang/pk10-kaijiang.module'
import {Pk10DanshuangComponentModule} from '../../components/lottory-center/pk10-danshuang/pk10-danshuang.module'
import {Pk10ChanpiomComponentModule} from '../../components/lottory-center/pk10-chanpiom/pk10-chanpiom.module'
import {YDistributeComponentModule} from '../../components/lottory-center/y-distribute/y-distribute.module'
import {YKaijiangComponentModule} from '../../components/lottory-center/y-kaijiang/y-kaijiang.module'



@NgModule({
  declarations: [
    LottoryCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(LottoryCenterPage),
    SscDanshuangComponentModule,
    SscKaijiangComponentModule,
    SscDaxiaoComponentModule,
    K3BaseTrendComponentModule,
    K3CoodHotComponentModule,
    K3KaijiangComponentModule,
    K3ShapeTrendComponentModule,
    LhcShengxiaoComponentModule,
    LhcKaijiangComponentModule,
    LhcBoseComponentModule,
    Pk10daxiaoComponentModule,
    Pk10LonghuComponentModule,
    Pk10KaijiangComponentModule,
    Pk10DanshuangComponentModule,
    Pk10ChanpiomComponentModule,
    YDistributeComponentModule,
    YKaijiangComponentModule,
    // ComponentsModule
  ],
})
export class LottoryCenterPageModule {}
