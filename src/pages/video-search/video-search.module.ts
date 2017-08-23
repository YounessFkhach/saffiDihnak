import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoSearchPage } from './video-search';

@NgModule({
  declarations: [
    VideoSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoSearchPage),
  ],
  exports: [
    VideoSearchPage,
  ]
})
export class VideoSearchPageModule {}
