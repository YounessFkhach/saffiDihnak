import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameWelcomePage } from './game-welcome';

@NgModule({
  declarations: [
    GameWelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(GameWelcomePage),
  ],
})
export class GameWelcomePageModule {}
