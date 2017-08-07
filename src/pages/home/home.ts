import { VideoDbProvider } from './../../providers/video-db/video-db';
import { IonicPage } from 'ionic-angular';
import { VideosProvider, VideoDetail } from './../../providers/videos/videos';
import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

@IonicPage()
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
  storedVideos : string[] = [];
  
  constructor(public navCtrl: NavController, private videosProvider : VideosProvider, private videoDb : VideoDbProvider) {
    this.videoDb.getVideos().then((data : VideoDetail[]) => {
      data.map(item => {
        this.storedVideos.push(item.id)
        this.videos.push(item)
      })
      console.log("videos stored: "+ this.storedVideos.length)
      // once the videos got recieved from the data base we will get the updates from the server

      this.videosProvider.getAllIds(10).subscribe(res => {
        this.nextPageToken = res.json().nextPageToken
        
        // get the ids as long as they don't exist already
        this.videosIds = res.json().items
                                .map(item => item.contentDetails.videoId)
                                .filter(id => !this.idExists(id))
        

        this.videosProvider.getInfo(this.videosIds).subscribe(res => {
          res.json().items
                      .reverse()
                      .map(item => {
                        var v = new VideoDetail(item)
                        this.videos.unshift(v)
                        this.videos.map(item =>{
                          if(!this.idStored(item.id))
                            this.videoDb.insertVideo(v)
                        })
                      });
        })

        // schedule un update
        setTimeout(() => {
          this.updateVideos()
        }, 3000);

      })

      //schedule database cleanup 
      var dataBaseLength = 15
      if(this.storedVideos.length > dataBaseLength)
        setTimeout(()=> {
          for (var index = this.storedVideos.length; index > dataBaseLength; index--) {
            this.videoDb.deleteVideo(this.storedVideos[index - 1])
            console.log("deleting id: " + this.storedVideos[index])
          }
        }, 30000)

    })
  }

  openVideo(video) {
    this.navCtrl.push("VideoDetailPage", {
      video: video
    });
  }


  updateVideos(){
    this.videosProvider.getInfo(this.videos.map(item => item.id)).subscribe(res => {
      console.log("updating vidoes")
          res.json().items
                      .reverse()
                      .map(item => {
                        var v = new VideoDetail(item)
                        this.videoDb.updateVideo(v)
                        this.videos.forEach(video => {
                          if(video.id == item.id){
                            video.viewCount = v.viewCount
                            video.title     = v.title
                            video.description = v.description
                          }
                        });
                      });
        })

  }

  openSearchModal(){
    this.navCtrl.push("VideoSearchPage");
  }

  doRefresh(refresher? : any){
    
    this.videosProvider.getAllIds(10).subscribe(res => {
      // list of ids to get data of
      var newIds : string[] = []
      // get the last 10 ids
      var ids = res.json().items.map(item => item.contentDetails.videoId)
      
      // update the token
      this.nextPageToken = res.json().nextPageToken
      
      // add the non exesting ids to newIds
      ids.forEach(id => {
        if(!this.idExists(id)){
          newIds.push(id)
        }
      });

      //get the new Ids data
      if(newIds.length > 0){
        this.videosProvider.getInfo(newIds).subscribe(res => {
          res.json().items
            .reverse()
            .map(item => {
              var v = new VideoDetail(item)
              this.videos.unshift(v)
            
              //save the new video to the DB
              this.videoDb.insertVideo(v)
          });
        })
      }

      this.updateVideos();
      //complete the refresh
      if(refresher)
        refresher.complete();
    })
    
    // set timeout to stop refreshing if the network is down
    if(refresher)
      setTimeout(() => {
        refresher.complete();
      }, 5000);

  }

  openMore(){
    this.content.scrollToTop(10)
      this.navCtrl.push("VideoListPage", {
      pageToken : this.nextPageToken
    });
  }


  doInfinite(infiniteScroll) {
    if(!this.nextPageToken){
      this.videosProvider.getAllIds(10).subscribe(res => {
        this.nextPageToken = res.json().nextPageToken
        this.doInfinite(infiniteScroll)
      })
    }else{
      if(!this.isLoading){
        this.isLoading = true;
        this.videosProvider.getNextIds(10, this.nextPageToken).subscribe(res => {   
          // get the next Ids
          var nextIds : string[] = []
          nextIds = res.json().items
            .map(item => item.contentDetails.videoId)
            .filter(id => !this.idExists(id))
        
          // Update the next token
          var oldToken = this.nextPageToken // saving the old token in case of error
          this.nextPageToken = res.json().nextPageToken

          // add the videos to view
          this.videosProvider.getInfo(nextIds).subscribe(res => {
            var nextVideos : any[] = []
            nextVideos = res.json().items
            nextVideos.map(item => {
              //if(!this.idExists(item.id))
              this.videos.push(new VideoDetail(item))
            });

            infiniteScroll.complete()
            this.isLoading = false;
          }, err => {
            // in case of error restore the old Token
            this.nextPageToken = oldToken
          })

        }, err =>{
          // in case of error getting the next ids turn laoding on
          //console.log("error handled")
          this.isLoading = false;
        })
      
      }

      setTimeout(() => {infiniteScroll.complete();}, 5000);
    }
  }

  idExists(id : string){
    var existArr = this.videos.filter(video => video.id == id)
    return existArr.length > 0
  }

  idStored(id : string): boolean{
    var existArr = this.storedVideos.filter(item => item == id)
    return existArr.length > 0
  }

  ionViewDidLoad() {
    
  }




}
