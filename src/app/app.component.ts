import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { OneSignal } from '@ionic-native/onesignal';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';



//import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "TabsPage";

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'الرئيسية', component: "TabsPage", icon: "home", params: {title: "صفي ذهنك", id: "UUxKWhe_05cuDe3ATBK_UnVA", table: "video"}},
    
    {title: "إختبارات شخصية", icon: "trophy", component: "HomePage", params: {title: "إختبارات شخصية", id: "PL99RYxjrqvl5gFa-jHUkmQFkhYoYmKTYn", table: "tests"}},
    {title: "TOP 10 توب", icon: "funnel", component: "HomePage", params: {title: "TOP 10 توب", id: "PL99RYxjrqvl5Zgsd_MVeIHSokrHGwTzQe", table: "top"}},
    {title: "ألغاز و حلول", component: "HomePage", icon: "bulb", params: {title: "ألغاز و حلول", id: "PL99RYxjrqvl4ttWbD-I9OJvqq23XjHG0J", table: "riddles"}},

    { title: 'قناة اليوتوب', icon: "logo-youtube",component: ["https://www.youtube.com/user/tuuuubeable"] },
    { title: 'صفحة الفايسبوك', icon: "logo-facebook", component: ["https://www.facebook.com/saffidihnek/"] },
    { title: 'حساب تويتر', icon:"logo-twitter", component: ["https://twitter.com/saffidihnak"] }
  ]


  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private iab: InAppBrowser,
              private oneSignal: OneSignal,
              private admobFree: AdMobFree){


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString('#4e3376');
      statusBar.styleDefault();
      splashScreen.hide();
      
      if (this.splashScreen) {
        setTimeout(() => {
          this.splashScreen.hide();
           this.platform.setDir('rtl', true);
        }, 100);
      }


      //Setting up one signal
        this.oneSignal.startInit('56c91fc7-39da-4650-9ef3-d66f90de4089', '647194455379');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        this.oneSignal.handleNotificationReceived().subscribe(() => {
          console.log("Notification recieved")
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
          console.log("notification opened")
        });

        this.oneSignal.endInit();


      this.platform.setDir('rtl', true);


      //set the BannedAd
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
              .catch(e => console.log(e));
      
    });
  }


  openPage(p){
    //check if p is page or link
    if(p.component instanceof Array){
      var browser = this.iab.create(p.component[0], '_system');
      console.log(browser)
      console.log("open link: " + browser)
    }else{
      this.nav.setRoot(p.component, p.params)
      console.log("open page: " + p.title)
    }
    
  }

}
