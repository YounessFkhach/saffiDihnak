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
    { title: 'الرئيسية', component: "tabs" },
    { title: 'قناة اليوتوب', component: ["https://www.youtube.com/user/tuuuubeable"] },
    { title: 'صفحة الفايسبوك', component: ["https://www.facebook.com/saffidihnek/"] },
    { title: 'حساب تويتر', component: ["https://twitter.com/saffidihnak"] },
  ]


  constructor(private platform: Platform,private statusBar: StatusBar,private splashScreen: SplashScreen, private iab: InAppBrowser) {
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
      this.platform.setDir('rtl', true);

    });
  }


  openPage(p){
    //check if p is page or link
    if(p.component instanceof Array){
      let browser = this.iab.create(p.component[0], '_system');
      console.log("open link: " + p.title)
    }else{
      this.nav.setRoot(p.Component)
      console.log("open page: " + p.title)
    }
    
  }

}
