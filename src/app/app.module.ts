// import { VideoDetailModule } from './../components/video-detail/video-detail.module';
// import { VideoDetailComponent } from './../components/video-detail/video-detail';
// import { VideoSearchComponent } from './../components/video-search/video-search';
// import { VideoListComponent } from './../components/video-list/video-list';
import { SocialSharing } from '@ionic-native/social-sharing';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { VideosProvider } from '../providers/videos/videos';



// comment ss

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VideosProvider,
    YoutubeVideoPlayer,
    SocialSharing
  ],
  exports: [
  ]
})
export class AppModule {}
