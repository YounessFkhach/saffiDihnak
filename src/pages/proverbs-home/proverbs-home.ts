import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProverbsHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proverbs-home',
  templateUrl: 'proverbs-home.html',
})
export class ProverbsHomePage {
  title : string = "أقوال و حكم"

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    
  }

  openPage(p){
    this.navCtrl.push(p);
  }

}
