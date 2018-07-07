import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LottoryCenterPage } from './lottory-center';
import { ComponentsModule } from '../../components/components.module'


@NgModule({
  declarations: [
    LottoryCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(LottoryCenterPage),
    ComponentsModule
  ],
})
export class LottoryCenterPageModule {}
