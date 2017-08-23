import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProverbsHomePage } from './proverbs-home';

@NgModule({
  declarations: [
    ProverbsHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ProverbsHomePage),
  ],
})
export class ProverbsHomePageModule {}
