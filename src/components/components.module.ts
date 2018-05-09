import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { GamemenuComponent } from './gamemenu/gamemenu';
import { TabYuanComponent } from './tab-yuan/tab-yuan';
import { RightmenuComponent } from './rightmenu/rightmenu';
import { MenumodalComponent } from './menumodal/menumodal';
import { ZuxuanhezhiComponent } from './ssc-game/zuxuanhezhi/zuxuanhezhi';
import { ZuxuanliuComponent } from './ssc-game/zuxuanliu/zuxuanliu';

import { HouerdaxiaodanshuangComponent } from './ssc-game/houerdaxiaodanshuang/houerdaxiaodanshuang';
import { WuxingzhixuanzuheComponent } from './ssc-game/wuxing/wuxingzhixuanzuhe/wuxingzhixuanzuhe';

@NgModule({
	declarations: [GamemenuComponent,
    TabYuanComponent,
    RightmenuComponent,
    MenumodalComponent,
    ZuxuanhezhiComponent,
    ZuxuanliuComponent,
    HouerdaxiaodanshuangComponent,
    ],
	imports: [CommonModule],
	exports: [GamemenuComponent,
    TabYuanComponent,
    RightmenuComponent,
    MenumodalComponent,
    ZuxuanhezhiComponent,
    ZuxuanliuComponent,
    HouerdaxiaodanshuangComponent,
    ]
})
export class ComponentsModule {}
