import { AdMobFree, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import { ProverbsProvider } from './../../providers/proverbs/proverbs';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-sayings',
  templateUrl: 'sayings.html',
})
export class SayingsPage {
  @ViewChild(Slides) slides: Slides;
  title : string = "أقوال"
  proverbs : any[] = []
  data : any[] = []
  index : number
  currentActive : number
  item : any = {text : "" , author : ""}

  firstLoad = true;

  clickCount : number = 0;

  constructor(public navCtrl : NavController, 
              public navParams : NavParams, 
              private provProvider : ProverbsProvider,
              private viewCtrl : ViewController,
              private admobFree : AdMobFree) {
    
    this.provProvider.getData("sayings").subscribe(res => {
      this.proverbs = res.json().items
      this.proverbs = this.shuffleArray(this.proverbs)
      console.table(this.proverbs)

      console.table(this.proverbs)

      this.index = 0;

      this.item = this.proverbs[this.index]


    })      
      

  }


  ionViewDidLoad() {
    const videoConfig: AdMobFreeRewardVideoConfig = {
      id: "ca-app-pub-1487801603037906/4358205508",
      isTesting: false,
      autoShow: false
    };
    this.admobFree.rewardVideo.config(videoConfig);
    this.admobFree.rewardVideo.prepare().then(() => {
      console.log("Ad is showing")
    })

  }

    next(){
      this.clickCount++
      console.log("next")
      this.index = (this.index + 1) % this.proverbs.length

      this.item = this.proverbs[this.index]
      this.showAd()
    }

    prev(){
      this.clickCount++
      console.log("prev")
      this.index = this.index - 1
      if(this.index < 0){
        this.index = this.proverbs.length - 1
      }

      this.item = this.proverbs[this.index]

      this.showAd()
    }

    random(){
      this.clickCount++
      console.log("random")
      this.index = Math.floor(Math.random()*this.proverbs.length)
      this.item = this.proverbs[this.index]
      this.showAd()
    }

    showAd(){
      if(this.clickCount > 30){
        this.admobFree.rewardVideo.isReady().then(() => {
          this.admobFree.rewardVideo.show()
            .then(() => {
              console.log("ad is showing")
              this.clickCount = 0
            })
            .catch((e) => console.log("ad not showing"))
        })
      }
    }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

}
