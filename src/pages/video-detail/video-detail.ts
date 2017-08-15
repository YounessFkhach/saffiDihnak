import { VideoDetail } from './../../providers/videos/videos';
import { VideoDbProvider } from './../../providers/video-db/video-db';
import { AdMobFree, AdMobFreeRewardVideoConfig, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
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
  video : VideoDetail;
  isWatched: boolean = false
  index : number
  videos : VideoDetail[];

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams, 
                private socialSharing: SocialSharing, 
                private youtube: YoutubeVideoPlayer,
                private admobFree: AdMobFree,
                private videoDB : VideoDbProvider
                ) {
                  
            this.video = this.navParams.get('video')
            this.index = this.navParams.get('index')
            this.videos = this.navParams.get('videos')

            const videoConfig: AdMobFreeRewardVideoConfig = {
              id: "ca-app-pub-1487801603037906/4358205508",
              isTesting: false,
              autoShow: false
            };
            this.admobFree.rewardVideo.config(videoConfig);
            this.admobFree.rewardVideo.prepare()
                .then(() => {
                  this.navCtrl.viewWillUnload.asObservable().subscribe(() => {
                    console.log("VideoDetail will leave")
                    if(this.isWatched){
                      this.admobFree.rewardVideo.show()
                        .then(() => {
                            console.log("rewardVideo is showing")                    
                        })
                        .catch(e => console.error(e))
                    }
                  })
                })
                .catch(e => console.error(e))

            const bannerConfig: AdMobFreeBannerConfig = {
              id: "ca-app-pub-1487801603037906/3070186327",
              isTesting: false,
              autoShow: true,
              overlap: true
            };
            this.admobFree.banner.config(bannerConfig);
            this.admobFree.banner.prepare()
              .then(() => {
                //console.log("banner is showing")
              })
              .catch(e => console.log(e));

    // hide the banner whene the user exits the view
    this.navCtrl.viewWillLeave.asObservable().subscribe(() => {
      this.admobFree.banner.hide()
    })
            
  }

  ionViewDidLoad() {
    

  }

  playVideo(){
    this.youtube.openVideo(this.video.id)
    this.setWatched()
    this.isWatched = true
  }

  setWatched(){
    this.videoDB.setWatched(this.video.id)
  }

  shareVideo(){
    this.socialSharing.share("شاهد هذا الفيديو عن" + " " + this.video.title + " " + this.video.url, "صفي ذهنك")
  }

  convert(text : string){
	  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	  var text1=text.replace(exp, "<a href='$1'>$1</a>");
	  var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
	  return text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
  }

  next(){

    if(this.index == this.videos.length-1)
      return
    this.index++
    this.video = this.videos[this.index]


    // this.admobFree.banner.prepare()
    //   .then(() => {
    //     console.log("banner is showing")
    //   })
    //   .catch(e => console.log(e));
  }

  prev(){
   
    if(this.index == 0)
      return
    this.index--
    this.video = this.videos[this.index]

    // this.admobFree.banner.prepare()
    //   .then(() => {
    //     console.log("banner is showing")
    //   })
    //   .catch(e => console.log(e));
  }


}
