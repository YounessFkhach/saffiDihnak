import { VideoDbProvider } from './../../providers/video-db/video-db';

import { VideoDetail, VideosProvider } from './../../providers/videos/videos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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

  playListId : string
  title : string

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams, 
                private videosProvider : VideosProvider,
                private videoDb : VideoDbProvider,
                private modalCtrl : ModalController) {

    this.nextPageToken = navParams.get("pageToken")
    this.playListId = navParams.get("playListId")
    this.title = navParams.get("title")
    this.getNext();
    this.navCtrl.viewDidEnter.asObservable().subscribe(this.checkWatched)
  }

  getNext(){
    this.videosProvider.getNextIds(this.playListId, 15, this.nextPageToken).subscribe(res => {
      this.nextPageToken = res.json().nextPageToken
      this.videosIds = res.json().items.map(item => item.contentDetails.videoId);
      this.videosProvider.getInfo(this.videosIds).subscribe(res => {
        this.videos = res.json().items.map(item => new VideoDetail(item));
        this.checkWatched()
      })
    })
  }

  openVideo(video : VideoDetail, index : number) {
    this.modalCtrl
      .create("VideoDetailPage", {
        video: video,
        index: index,
        videos : this.videos
      })
      .present()
  }

  openMore(){
    this.videos = [];
    this.getNext()
  }

  checkWatched(){
    this.videoDb.getWatched().then((res : string[]) => {
      res.map(item => {
        this.videos.forEach(video => {
          if(video.id == item){
            video.isWatched = true
          }
        });
      })
    })
  }


  idExists(id : string){
    var existArr = this.videos.filter(video => video.id == id)
    return existArr.length > 0
  }



}
