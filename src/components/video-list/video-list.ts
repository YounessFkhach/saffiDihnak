import { Component } from '@angular/core';
import { VideoDetailComponent } from './../../components/video-detail/video-detail';
import { VideosProvider, VideoDetail } from './../../providers/videos/videos';
import { NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the VideoListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'video-list',
  templateUrl: 'video-list.html'
})
export class VideoListComponent {
videosIds : any[] = [];
  videos : VideoDetail[] = [];
  nextPageToken : string;
  isFirst = true

  constructor(public navCtrl: NavController, public navParams: NavParams, private videosProvider : VideosProvider) {
    this.nextPageToken = navParams.get("pageToken")
    this.getNext();

  }

  getNext(){
    this.videosProvider.getNextIds(15, this.nextPageToken).subscribe(res => {
      this.nextPageToken = res.json().nextPageToken
      this.videosIds = res.json().items.map(item => item.contentDetails.videoId);
      this.videosProvider.getInfo(this.videosIds).subscribe(res => {
        this.videos = res.json().items.map(item => new VideoDetail(item));
      })
    })
  }

  openVideo(video) {
    this.navCtrl.push(VideoDetailComponent, {
      video: video
    });
  }

  openMore(){
    this.videos = [];
    this.getNext()
  }



  idExists(id : string){
    var existArr = this.videos.filter(video => video.id == id)
    return existArr.length > 0
  }


}
