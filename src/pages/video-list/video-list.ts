//import { VideoDetailPage } from './../video-detail/video-detail';
import { VideoDetail, VideosProvider } from './../../providers/videos/videos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VideoListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video-list',
  templateUrl: 'video-list.html',
})
export class VideoListPage {


  ionViewDidLoad() {
    
  }

  videosIds : any[] = [];
  videos : VideoDetail[] = [];
  nextPageToken : string;
  isFirst = true

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams, 
                private videosProvider : VideosProvider) {

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
    this.navCtrl.push("VideoDetailPage", {
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
