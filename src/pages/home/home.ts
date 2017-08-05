import { VideoSearchComponent } from './../../components/video-search/video-search';
import { VideoListComponent } from './../../components/video-list/video-list';
import { VideoDetailComponent } from './../../components/video-detail/video-detail';
import { VideosProvider, VideoDetail } from './../../providers/videos/videos';
import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  videosIds : any[] = [];
  videos : VideoDetail[] = [];
  nextPageToken : string;
  isLoading : boolean = false;

  constructor(public navCtrl: NavController, private videosProvider : VideosProvider) {
    this.videosProvider.getAllIds(10).subscribe(res => {
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

  openSearchModal(){
    this.navCtrl.push(VideoSearchComponent);
  }

  doRefresh(refresher : any){
    
    this.videosProvider.getAllIds(10).subscribe(res => {
      // list of ids to get data of
      var newIds : string[] = []
      // get the last 10 ids
      var ids = res.json().items.map(item => item.contentDetails.videoId).reverse()
      
      
      // add the non exesting ids to newIds
      ids.forEach(id => {
        if(!this.idExists(id)){
          newIds.push(id)
        }
      });

      //get the new Ids data
      this.videosProvider.getInfo(newIds).subscribe(res => {
        res.json().items.map(item => {
          this.videos.unshift(new VideoDetail(item))
        });
      })

      //complete the refresh
      refresher.complete();
    })
    
    // set timeout to stop refreshing if the network is down
    setTimeout(() => {
      refresher.complete();
    }, 5000);

  }

  openMore(){
    this.content.scrollToTop(10)
    this.navCtrl.push(VideoListComponent, {
      pageToken : this.nextPageToken
    });
  }


  doInfinite(infiniteScroll) {
    if(!this.isLoading){
      this.isLoading = true;
      this.videosProvider.getNextIds(10, this.nextPageToken).subscribe(res => {   
        // get the next Ids
        var nextIds : string[] = []
        nextIds = res.json().items
          .map(item => item.contentDetails.videoId)
          .filter(id => !this.idExists(id))
      
        // Update the next token
        this.nextPageToken = res.json().nextPageToken

        // add the videos to view
        this.videosProvider.getInfo(nextIds).subscribe(res => {
          var nextVideos : any[] = []
          nextVideos = res.json().items
          nextVideos.map(item => {
            this.videos.push(new VideoDetail(item))
          });

          infiniteScroll.complete()
          this.isLoading = false;
        })

      })
    
    }

    setTimeout(() => {
      infiniteScroll.complete();
    }, 8000);
  }

  idExists(id : string){
    var existArr = this.videos.filter(video => video.id == id)
    return existArr.length > 0
  }


}
