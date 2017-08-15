import { NgModule } from '@angular/core';
import { IonicPageModule, AlertController } from 'ionic-angular';
import { GamePage } from './game';

@NgModule({
  declarations: [
    GamePage,
  ],
  imports: [
    IonicPageModule.forChild(GamePage),
  ],
  providers: [
    AlertController,
  ]
})
export class GamePageModule {}
