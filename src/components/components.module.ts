import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { GamemenuComponent } from './gamemenu/gamemenu';
import { TabYuanComponent } from './tab-yuan/tab-yuan';
import { RightmenuComponent } from './rightmenu/rightmenu';
import { MenumodalComponent } from './menumodal/menumodal';
import { ZuxuanhezhiComponent } from './ssc-game/zuxuanhezhi/zuxuanhezhi';
import { ZuxuanliuComponent } from './ssc-game/zuxuanliu/zuxuanliu';

import { WuxingzhixuanzuheComponent } from './ssc-game/wuxing/wuxingzhixuanzuhe/wuxingzhixuanzuhe';
import { FooterComponent } from './footer/footer';

@NgModule({
	declarations: [GamemenuComponent,
    TabYuanComponent,
    RightmenuComponent,
    MenumodalComponent,
    ZuxuanhezhiComponent,
    ZuxuanliuComponent,
    FooterComponent,
    ],
	imports: [CommonModule],
	exports: [GamemenuComponent,
    TabYuanComponent,
    RightmenuComponent,
    MenumodalComponent,
    ZuxuanhezhiComponent,
    ZuxuanliuComponent,
    FooterComponent,
    ]
})
export class ComponentsModule {}
