import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameWelcomePage } from './game-welcome';
import { IonicStorageModule } from '@ionic/storage'
@NgModule({
  declarations: [
    GameWelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(GameWelcomePage),
    IonicStorageModule.forRoot()
  ],
})
export class GameWelcomePageModule {}
