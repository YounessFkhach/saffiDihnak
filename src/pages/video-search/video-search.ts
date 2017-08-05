import { VideoDetail, VideosProvider } from './../../providers/videos/videos';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the VideoSearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video-search',
  templateUrl: 'video-search.html',
})
export class VideoSearchPage {

  videosIds : any[] = [];
  videos : VideoDetail[] = [];

  constructor(  public navCtrl: NavController,
                private videosProvider : VideosProvider) {
    
    // ToDo
  }

  ionViewDidLoad() {
    
  }

  getItems(event : any){
    var keyWord : string =  event.target.value
    
    this.videosProvider.getByKey(keyWord).subscribe(res => {
      // get the videos Id
      this.videosIds = res.json().items.map(item => item.id.videoId)
      
      // construct the videos 
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

  

}
