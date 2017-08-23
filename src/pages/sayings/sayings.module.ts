import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SayingsPage } from './sayings';

@NgModule({
  declarations: [
    SayingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SayingsPage),
  ],
})
export class SayingsPageModule {}
