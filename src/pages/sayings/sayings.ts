import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobFree, AdMobFreeRewardVideoConfig, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { ProverbsProvider } from './../../providers/proverbs/proverbs';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications';




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
              // private viewCtrl : ViewController,
              private admobFree : AdMobFree,
              private socialSharing : SocialSharing,
              private localNotifications: LocalNotifications) {
    this.provProvider.init().then(()=>{
      //try to load the sayings from the dataBase
      //console.log("database initialised")
      this.provProvider.getAllSayings().then((res : any[])=> {
        //console.log("got the response from the table")
        if(!res.length){
          //console.log("db response is null")
          // if the dataBase is empty then load them from the local file
          this.provProvider.getLocalData("sayings").subscribe(res => {
            //console.log("got the data from local file")
            this.proverbs = this.shuffleArray(res.json().items)

            this.proverbs = this.proverbs.map(item => {
                                  item["imageUrl"] = "assets/icon/testimonial-" + Math.floor((Math.random() * 3) + 1) + ".jpg"
                                  return item
                                })

            this.index = 0;

            this.item = this.proverbs[this.index]
            
          })   
        }else{
          // if the dataBase contains items then save them to the array
          //console.log("db response is not null")
          this.proverbs = this.shuffleArray(res);

          this.proverbs = this.proverbs.map(item => {
                                  item["imageUrl"] = "assets/icon/testimonial-" + Math.floor((Math.random() * 3) + 1) + ".jpg"
                                  return item
                                })

          this.index = 0;

          this.item = this.proverbs[this.index]
  
        }

      })
      .catch((e)=> console.error(e))

      // schedule un update
      setTimeout(() => {
        this.getfromServer()
      }, 5000);

      // schedule the notifications task
      setTimeout(() => {
        this.schedule()
      }, 10000)

    })


    // show the banner
    const bannerConfig: AdMobFreeBannerConfig = {
              id: "ca-app-pub-1487801603037906/3070186327",
              isTesting: false,
              autoShow: true,
              overlap: false
            };
            this.admobFree.banner.config(bannerConfig);
            this.admobFree.banner.prepare()
              .then(() => {
                //console.log("banner is showing")
              })
              .catch(e => {
                console.log(e)
              }); 

    // hide the banner whene the user exits the view  
    this.navCtrl.viewWillLeave.asObservable().subscribe(() => {
      this.admobFree.banner.hide()
    })

    //Log the Sheduled notifications
    this.localNotifications.getAll().then(notifications => {
      //console.log("Number of notifications: " + notifications.length)
      //console.table(notifications)
    })
    
  }

  getfromServer(){
    //console.log("getting items  from server")
    this.provProvider.getServerData("sayings").subscribe(res => {
        // add the fetched data to the dataBase
        // then push them to the providers array
        this.shuffleArray(res.json().items).map(item => {
          this.provProvider.insertSaying(item)
            .then(() => {
              this.proverbs.push(item)
            })
            .catch(() => {
              //the item is already added
            })

        })
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
      //console.log("Ad is ready to be showed")
    })

    this.navCtrl.viewWillLeave.asObservable().subscribe(() => {
      this.admobFree.rewardVideo.show().then(() => {
        //console.log("the viewWillLeave ad is showing")
      })
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

    share(){
      this.socialSharing.share(" '" + this.item.text + "' " + this.item.author + "\n" + "المزيد على قناة " + "https://www.youtube.com/user/tuuuubeable", "صفي ذهنك")
    }

    showAd(){
      if(this.clickCount > 30){
        this.admobFree.rewardVideo.show()
          .then(() => {
            //console.log("ad is showing")
            this.clickCount = 0
          })
          .catch((e) => {
            console.log("ad not showing")
          })
      }else if(this.clickCount == 1){
        this.admobFree.rewardVideo.prepare()
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




  schedule(){
    // Array the new notifications to schedule
    let newNotifications : ILocalNotification[] = [];
    
    // the current date
    let date = new Date()
    
    // set the hours
    date.setHours(20)
    date.setMinutes(0)

    // temp variable to store the proverbs to push
    var toPush : any

    for (var index = 0; index < 7; index++) {
      // push the last proverb
      toPush = this.proverbs[this.proverbs.length - index - 1]

      // set the nextDay date
      date.setDate(date.getDate() + 1)

      newNotifications.push({
        id: index,
        title: "صفي دهنك",
        text: '"'+ toPush.text + '" ' +  toPush.author,
        at: date
      })
    }

    // push another notification after 10 days from the last one
    date.setDate(date.getDate() + 10)
    
    toPush = this.proverbs[Math.floor(this.proverbs.length / 2)]

    newNotifications.push({
      id: 7,
      title: "صفي دهنك",
      text: '"'+ toPush.text + '" ' +  toPush.author,
      at: date
    })

    // Schedule the new Notifications
    this.localNotifications.cancel([0,1,2,3,4,5,6,7]).then(() => {
      this.localNotifications.schedule(newNotifications)
    }).catch(e => {
      console.error(e)
      this.localNotifications.schedule(newNotifications)
    })


  }



}
