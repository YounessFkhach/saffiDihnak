import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "TabsPage";

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'الرئيسية', component: "tabs" },
    { title: 'قناة اليوتوب', component: "AboutPage" },
    { title: 'صفحة الفايسبوك', component: null },
    { title: 'حساب تويتر', component: null },
  ]


  constructor(private platform: Platform,private statusBar: StatusBar,private splashScreen: SplashScreen) {
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
    //To Do
    this.nav.setRoot(p)
    console.log("open page: " + p.title)
  }

}
