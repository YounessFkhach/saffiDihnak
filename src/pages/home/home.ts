import { VideoDetailComponent } from './../../components/video-detail/video-detail';
import { VideosProvider } from './../../providers/videos/videos';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  videosIds : any[] = [];
  videos : any[] = [];

  constructor(public navCtrl: NavController, private videosProvider : VideosProvider) {
    this.videosProvider.getAllIds().subscribe(res => {
      this.videosIds = res.json().items.map(item => item.id.videoId);

      this.videosProvider.getInfo(this.videosIds).subscribe(res => {
        this.videos = res.json().items;
      })

    })

  }

  openVideo(video) {
    this.navCtrl.push(VideoDetailComponent, {
      video: video
    });
  }

  openSearchModal(){
    //To Do
    console.log("search modal")
  }

}
