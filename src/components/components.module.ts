import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { GamemenuComponent } from './gamemenu/gamemenu';
import { TabYuanComponent } from './tab-yuan/tab-yuan';
import { RightmenuComponent } from './rightmenu/rightmenu';
import { MenumodalComponent } from './menumodal/menumodal';
import { ZuxuanhezhiComponent } from './ssc-game/zuxuanhezhi/zuxuanhezhi';
import { ZuxuanliuComponent } from './ssc-game/zuxuanliu/zuxuanliu';
import { Zuxuan120Component } from './ssc-game/wuxing/zuxuan120/zuxuan120';
import { Zuxuan60Component } from './ssc-game/wuxing/zuxuan60/zuxuan60';
import { HouerdaxiaodanshuangComponent } from './ssc-game/houerdaxiaodanshuang/houerdaxiaodanshuang';
import { WuxingzhixuanzuheComponent } from './ssc-game/wuxing/wuxingzhixuanzuhe/wuxingzhixuanzuhe';
import { Zuxuan30Component } from './ssc-game/wuxing/zuxuan30/zuxuan30';
import { Zuxuan20Component } from './ssc-game/wuxing/zuxuan20/zuxuan20';

import { ZhixuanfushiComponent } from './ssc-game/wuxing/zhixuanfushi/zhixuanfushi'

@NgModule({
	declarations: [GamemenuComponent,
    TabYuanComponent,
    RightmenuComponent,
    MenumodalComponent,
    ZuxuanhezhiComponent,
    ZuxuanliuComponent,
    Zuxuan120Component,
    Zuxuan60Component,
    HouerdaxiaodanshuangComponent,
    Zuxuan30Component,
    Zuxuan20Component,
    ],
	imports: [CommonModule],
	exports: [GamemenuComponent,
    TabYuanComponent,
    RightmenuComponent,
    MenumodalComponent,
    ZuxuanhezhiComponent,
    ZuxuanliuComponent,
    Zuxuan120Component,
    Zuxuan60Component,
    HouerdaxiaodanshuangComponent,
    Zuxuan30Component,
    Zuxuan20Component,
    ]
})
export class ComponentsModule {}
