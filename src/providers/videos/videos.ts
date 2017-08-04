import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the VideosProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class VideosProvider {
  url1: string = "https://www.googleapis.com/youtube/v3/videos?id=";
  url2: string = "&part=contentDetails,snippet,statistics&key=AIzaSyD4cXEM1w9udInuog2sSg67Q1hLHhWXQUE"
  idUrl: string = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyD4cXEM1w9udInuog2sSg67Q1hLHhWXQUE&channelId=UCxKWhe_05cuDe3ATBK_UnVA&part=id&order=date&maxResults=50";

  constructor(public http: Http) {
    console.log('Hello VideosProvider Provider');
  }

  getAllIds(){
    return this.http.get(this.idUrl);
  }

  getInfo(idArray : string[]){

    return this.http.get(this.url1 + idArray.join(",") + this.url2)
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
