import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-video-detail',
  templateUrl: 'video-detail.html',
})
export class VideoDetailPage {
  video : any;

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams, 
                private socialSharing: SocialSharing, 
                private youtube: YoutubeVideoPlayer) {
                  
            this.video = this.navParams.get('video')
  }

  ionViewDidLoad() {
    
  }

  playVideo(){
    this.youtube.openVideo(this.video.id);
  }

  shareVideo(){
    this.socialSharing.share("صفي ذهنك بمشاهدة هذا الفيديو عن" + " " + this.video.title, "صفي ذهنك", this.video.image, this.video.url)
  }

  convert(text : string){
	  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	  var text1=text.replace(exp, "<a href='$1'>$1</a>");
	  var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
	  return text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
  }


}
