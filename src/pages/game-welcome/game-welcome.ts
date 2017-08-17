import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
  user : any = {
    name : "",
    score: 0,
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private storage: Storage) {

    this.storage.get("userName")
      .then(val => {
        console.log("your name is: " + val);
      })
    
    this.storage.get("userId")
      .then(val => console.log("your id: " + val))
      .catch(e => console.error(e))
                  
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
                            this.storage.set("userName" , data.userName)
                          }

                        }
                      ]
                    })
                    .present()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameWelcomePage');
  }

  openGame(){
    this.navCtrl.insert(this.navCtrl.length(), "GamePage", {
      user: this.user
    })
  }

}
