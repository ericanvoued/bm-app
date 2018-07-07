import { NgModule } from '@angular/core';
import { IonicPage, IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';

@IonicPage()
@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
  ],
})
export class TabsPageModule {}
