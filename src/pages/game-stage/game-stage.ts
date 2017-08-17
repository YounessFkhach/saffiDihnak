import { GameProvider } from './../../providers/game/game';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the GameStagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game-stage',
  templateUrl: 'game-stage.html',
})
export class GameStagePage {
  stageId: number = 1;
  qsts : any[]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public gameProvider: GameProvider,
              private storage : Storage) {
    
    this.stageId = this.navParams.get("stageId")
    
    this.gameProvider.getQsts(this.stageId).subscribe(res => {
      this.qsts = res.json().qsts
    })

      

  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameStagePage');
  }

}
