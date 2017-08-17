import { GameProvider } from './../../providers/game/game';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the GamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  user : any
  qsts: any[] = []

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private gameProvider: GameProvider) {

    this.user = this.navParams.get("user")

    this.gameProvider.getQsts(1).subscribe(res => {
      this.qsts = res.json().questions
    })

  
    
  }


  ionViewDidLoad() {
    
  }


  openQst(index : number){
    console.table(this.qsts[index])
  }

}
