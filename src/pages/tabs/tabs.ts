import { IonicPage, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';


@IonicPage()

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  params : any
  tab1Root = "HomePage";
  tab2Root = "ProverbsHomePage";
  tab3Root = "GamePage";

  constructor(navParams: NavParams) {
    this.params = navParams.data
  }
}
