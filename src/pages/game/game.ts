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
  user : any = {
    name : "",
    score: 0,
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController) {

                
                
    let prompt = this.alertCtrl
                    .create({
                      title : "سجل الدخول",
                      inputs: [
                        {
                          name: "userName",
                          placeholder: "الاسم"
                        }
                      ],
                      buttons: [
                        {
                          text: "login",
                          handler: data => {
                            this.user.name = data.userName;
                            console.log("your name is: " + this.user.name)
                          }

                        }
                      ]
                    })
                    .present()
    
  }


  ionViewDidLoad() {
    
  }

}
