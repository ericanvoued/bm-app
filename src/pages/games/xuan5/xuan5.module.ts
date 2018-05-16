import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Xuan5Page } from './xuan5';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    Xuan5Page,
  ],
  imports: [
    IonicPageModule.forChild(Xuan5Page),ComponentsModule
  ],
})
export class Xuan5PageModule {}
