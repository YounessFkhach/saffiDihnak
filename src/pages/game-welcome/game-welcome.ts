import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GameWelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game-welcome',
  templateUrl: 'game-welcome.html',
})
export class GameWelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameWelcomePage');
  }

  openGame(){
    this.navCtrl.insert(this.navCtrl.length(), "GamePage")
  }

}
