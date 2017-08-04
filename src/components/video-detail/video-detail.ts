import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { SocialSharing } from '@ionic-native/social-sharing';


/**
 * Generated class for the VideoDetailComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'video-detail',
  templateUrl: 'video-detail.html'
})
export class VideoDetailComponent {

  video : any;

  constructor(private socialSharing: SocialSharing, public navCtrl: NavController,public navParams: NavParams, private youtube: YoutubeVideoPlayer) {
    this.video = this.navParams.get('video')
  }

  playVideo(){
    this.youtube.openVideo(this.video.id);
  }

  shareVideo(){
    this.socialSharing.share("صفي ذهنك بمشاهدة هذا الفيديو عن" + " " + this.video.title, "صفي ذهنك", this.video.image, this.video.url)
  }

}

