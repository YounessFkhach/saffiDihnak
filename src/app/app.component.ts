import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  pages: any[] = [
    { title: 'الرئيسية', component: null },
    { title: 'قناة اليوتوب', component: null },
    { title: 'صفحة الفايسبوك', component: null },
    { title: 'حساب تويتر', component: null },
  ]


  constructor(private platform: Platform,private statusBar: StatusBar,private splashScreen: SplashScreen) {
    this.statusBar.backgroundColorByHexString('#4e3376');
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.platform.setDir('rtl', true);
    });
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      // this.statusBar.backgroundColorByHexString('#D32F2F');
      this.statusBar.backgroundColorByHexString('#4e3376');
      this.splashScreen.hide();
    });
  }

  openPage(p){
    //To Do
    console.log("open page: " + p.title)
  }

}
