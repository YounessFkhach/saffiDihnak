import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { VideoDetailModule } from './../components/video-detail/video-detail.module';
// import { VideoDetailComponent } from './../components/video-detail/video-detail';
// import { VideoSearchComponent } from './../components/video-search/video-search';
// import { VideoListComponent } from './../components/video-list/video-list';
import { SocialSharing } from '@ionic-native/social-sharing';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, ToastController, ModalController } from 'ionic-angular';
import { MyApp } from './app.component';

// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { VideosProvider } from '../providers/videos/videos';

import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { SQLite } from '@ionic-native/sqlite'
import { VideoDbProvider } from '../providers/video-db/video-db';
import { ProverbsProvider } from '../providers/proverbs/proverbs';

import { AdMobFree } from '@ionic-native/admob-free'
import { GameProvider } from '../providers/game/game';
import { UserStateProvider } from '../providers/user-state/user-state';


// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';


// export const FIREBASE_CONFIG = {
//     apiKey: "AIzaSyAtajGRqYFfyWEvlX66FKxwzbHjpZfhoS0",
//     authDomain: "saffidihnak-1fb26.firebaseapp.com",
//     databaseURL: "https://saffidihnak-1fb26.firebaseio.com",
//     projectId: "saffidihnak-1fb26",
//     storageBucket: "saffidihnak-1fb26.appspot.com",
//     messagingSenderId: "647194455379"
//   };





// comment ss

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages : "true"}),
    HttpModule,
    // AngularFireModule.initializeApp(FIREBASE_CONFIG),
    // AngularFireAuthModule,
    // AngularFireDatabaseModule
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
    SocialSharing,
    File,
    FileTransfer,
    SQLite,
    VideoDbProvider,
    InAppBrowser,
    ToastController,
    ProverbsProvider,
    AdMobFree,
    ProverbsProvider,
    ModalController,
    GameProvider,
    UserStateProvider
  ],
  exports: [
  ]
})
export class AppModule {}
