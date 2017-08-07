import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
// import { File } from '@ionic-native/file';

/*
  Generated class for the VideosProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class VideosProvider {
  uploadsId : string = "UUxKWhe_05cuDe3ATBK_UnVA"



  url1: string = "https://www.googleapis.com/youtube/v3/videos?id=";
  url2: string = "&part=contentDetails,snippet,statistics&key=AIzaSyD4cXEM1w9udInuog2sSg67Q1hLHhWXQUE"
  idUrl1: string = "https://www.googleapis.com/youtube/v3/playlistItems?playlistId="
  idUrl2: string = "&part=contentDetails&key=AIzaSyD4cXEM1w9udInuog2sSg67Q1hLHhWXQUE&maxResults="

  constructor(public http: Http) {

  }

  getAllIds(count: number){
    return this.http.get(this.idUrl1 + this.uploadsId + this.idUrl2 + count);
  }

  getNextIds(count : number, pageToken : string){
    return this.http.get(this.idUrl1 + this.uploadsId + this.idUrl2 + count + "&pageToken=" + pageToken);
  }

  getInfo(idArray : string[]){
    return this.http.get(this.url1 + idArray.join(",") + this.url2)
  }

  getByKey(keyWord : string){
    return this.http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCxKWhe_05cuDe3ATBK_UnVA&maxResults=20&key=AIzaSyD4cXEM1w9udInuog2sSg67Q1hLHhWXQUE"+ "&q=" + keyWord);
  }
  

}





export class VideoDetail {
  id : string
  title : string
  description : string
  viewCount : number
  duration : string
  url : string
  image : string

  constructor(data : any){
    if(data.snippet){
      //in case data is youtube api element
      this.id           = data.id
      this.title        = data.snippet.title
      this.description  = data.snippet.description
      this.viewCount    = data.statistics.viewCount
      this.duration     = this.parseDuration(data.contentDetails.duration)
      this.url          = "https://www.youtube.com/watch?v=" + data.id
      this.image        = data.snippet.thumbnails.medium.url
      
    }else{
      // in case data is from DB
      this.id           = data.id
      this.title        = data.title
      this.description  = data.description
      this.viewCount    = data.viewCount
      this.duration     = data.duration
      this.url          = "https://www.youtube.com/watch?v=" + data.id
      this.image        = data.image
    }
  }



  parseDuration(PT) {
    var output = [];
    var durationInSec = 0;
    var matches = PT.match(/P(?:(\d*)Y)?(?:(\d*)M)?(?:(\d*)W)?(?:(\d*)D)?T(?:(\d*)H)?(?:(\d*)M)?(?:(\d*)S)?/i);
    var parts = [
      { // years
        pos: 1,
        multiplier: 86400 * 365
      },
      { // months
        pos: 2,
        multiplier: 86400 * 30
      },
      { // weeks
        pos: 3,
        multiplier: 604800
      },
      { // days
        pos: 4,
        multiplier: 86400
      },
      { // hours
        pos: 5,
        multiplier: 3600
      },
      { // minutes
        pos: 6,
        multiplier: 60
      },
      { // seconds
        pos: 7,
        multiplier: 1
      }
    ];
    
    for (var i = 0; i < parts.length; i++) {
      if (typeof matches[parts[i].pos] != 'undefined') {
        durationInSec += parseInt(matches[parts[i].pos]) * parts[i].multiplier;
      }
    }
    
    // Hours extraction
    if (durationInSec > 3599) {
      output.push(Math.floor(durationInSec / 3600));
      durationInSec %= 3600;
    }
    // Minutes extraction with leading zero
    output.push(('0' + Math.floor(durationInSec / 60)).slice(-2));
    // Seconds extraction with leading zero
    output.push(('0' + durationInSec % 60).slice(-2));
    
    return output.join(':');
  }

}