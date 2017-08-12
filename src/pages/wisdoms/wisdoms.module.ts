import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WisdomsPage } from './wisdoms';

@NgModule({
  declarations: [
    WisdomsPage,
  ],
  imports: [
    IonicPageModule.forChild(WisdomsPage),
  ],
})
export class WisdomsPageModule {}
