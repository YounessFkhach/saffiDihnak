import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameStagePage } from './game-stage';
import { IonicStorageModule } from '@ionic/storage'

@NgModule({
  declarations: [
    GameStagePage,
  ],
  imports: [
    IonicPageModule.forChild(GameStagePage),
    IonicStorageModule.forRoot()
  ],
})
export class GameStagePageModule {}
