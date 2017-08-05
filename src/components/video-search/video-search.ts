import { NavController } from 'ionic-angular';
import { VideoDetail, VideosProvider } from './../../providers/videos/videos';
import { Component } from '@angular/core';


/**
 * Generated class for the VideoSearchComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'video-search',
  templateUrl: 'video-search.html'
})
export class VideoSearchComponent {

  videosIds : any[] = [];
  videos : VideoDetail[] = [];

  constructor(public navCtrl: NavController, private videosProvider : VideosProvider) {
    
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

}
