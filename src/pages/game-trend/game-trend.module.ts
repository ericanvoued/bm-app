import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameTrendPage } from './game-trend';
import { ComponentsModule } from '../../components/components.module';
import { GameTrendModule } from '../../components/gameTrend.module'
import { WuXingPageModule } from '../../components/wuxing.module'

@NgModule({
  declarations: [
    GameTrendPage,
  ],
  imports: [
    IonicPageModule.forChild(GameTrendPage),ComponentsModule,GameTrendModule,WuXingPageModule
  ],
})
export class GameTrendPageModule {}
