import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { IonicModule } from 'ionic-angular';
import { GamemenuComponent } from './gamemenu/gamemenu';
import { TabYuanComponent } from './tab-yuan/tab-yuan';
import { RightmenuComponent } from './rightmenu/rightmenu';
import { MenumodalComponent } from './menumodal/menumodal';
import { ZuxuanhezhiComponent } from './ssc-game/zuxuanhezhi/zuxuanhezhi';
import { ZuxuanliuComponent } from './ssc-game/zuxuanliu/zuxuanliu';

import { WuxingzhixuanzuheComponent } from './ssc-game/wuxing/wuxingzhixuanzuhe/wuxingzhixuanzuhe';
import { FooterComponent } from './footer/footer';
// import { LottoryKaijiangComponent } from './lottoyCenter/lottory-kaijiang/lottory-kaijiang';
// import { LottoryDaxiaoComponent } from './lottoyCenter/lottory-daxiao/lottory-daxiao';
// import { Lottory_11YkaijiangComponent } from './lottoyCenter/lottory-11-ykaijiang/lottory-11-ykaijiang';
// import { LottoryDistributeComponent } from './lottoyCenter/lottory-distribute/lottory-distribute';
import { AxibaComponent } from './axiba/axiba';

@NgModule({
	declarations: [
    TabYuanComponent,
    RightmenuComponent,
    MenumodalComponent,
    GamemenuComponent,
    ZuxuanhezhiComponent,
    ZuxuanliuComponent,
    FooterComponent,
    AxibaComponent,
    ],
	imports: [CommonModule],
	exports: [
    TabYuanComponent,
    RightmenuComponent,
    MenumodalComponent,
    GamemenuComponent,
    ZuxuanhezhiComponent,
    ZuxuanliuComponent,
    FooterComponent,
    AxibaComponent,   
    ]
})
export class ComponentsModule {}


