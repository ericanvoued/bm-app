import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SscPage } from './ssc';
import { ComponentsModule } from '../../../components/components.module';
import { ZhixuanfushiComponent } from '../../../components/ssc-game/wuxing/zhixuanfushi/zhixuanfushi'

@NgModule({
  declarations: [
    SscPage
    ],
  imports: [
    IonicPageModule.forChild(SscPage),ComponentsModule
  ]
})
export class SscPageModule {}
