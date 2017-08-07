import { VideoDetail } from './../videos/videos';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

/*
  Generated class for the VideoDbProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class VideoDbProvider {
  DB_NAME : string = 'videos.db'
  // db : SQLiteObject;
  // isOpen : boolean = false

  constructor( private sqlite : SQLite) {
    this.sqlite = new SQLite();
    this.create().then((db : SQLiteObject) => {
      console.log("database created!")
      db.executeSql('CREATE TABLE IF NOT EXISTS videos (`_id` INTEGER PRIMARY KEY, `id` VARCHAR(20) UNIQUE, `image` VARCHAR(100), `description` TEXT, `title` VARCHAR(110), `duration` VARCHAR(10), `viewCount` INT);', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log("table creation error: " + e));
      }).catch(e => console.log("database creation error: " + e))
  }

  create(){
    return this.sqlite.create({
      name: this.DB_NAME,
      location: 'default'
    })
  }

  getVideos(){
    console.log("getting videos")
    return new Promise((resolve, reject)=>{
      this.create().then((db : SQLiteObject) => {
      console.log("database created!!")
      db.executeSql('select * from `videos` order by `_id` desc', {})
        .then((data) => {
          //after recieving videos
          var videoArray : VideoDetail[] = []
          if(data == null) return;
          
          if(data.rows && data.rows.length > 0){
            for(let i = 0; i < data.rows.length; i++) {
              videoArray.push(new VideoDetail(data.rows.item(i)));
            }
          }

          console.table(videoArray)
            // videoArray = data.rows
            //                   .map(item => new VideoDetail(item))
          resolve(videoArray);
        })
        .catch(e => {
          console.log(e)
          reject(e)
        });
      }).catch(e => console.log(e))
    });
    
  }

  insertVideo(video : VideoDetail){
    
    this.create().then((db : SQLiteObject) => {
      db.executeSql('insert into `videos` (id, image, description, title, duration, viewCount) values (?,?,?,?,?,?)', [video.id, video.image, video.description, video.title, video.duration, video.viewCount])
        .then((data) => {console.log("video is stored")})
        .catch(e => {
          console.log("error inserting video")
          //console.log(e)
        });
      }).catch(e => {
        //console.log(e)
      })
  }

  updateVideo(video : VideoDetail){
    this.create().then((db : SQLiteObject) => {
      db.executeSql('UPDATE `videos` set  description = ?, title = ?, viewCount = ? WHERE id = ?', [video.description, video.title, video.viewCount, video.id])
        .then((data) => {console.log("video Updated")})
        .catch(e => {
          console.log("error updating video")
        });
      }).catch(e => {
        console.log(e)
      })
  }

  deleteVideo(id: String){
    this.create().then((db : SQLiteObject) => {
      db.executeSql('DELETE  FROM `videos` WHERE id = ?', [id])
        .then((data) => {console.log("video deleted")})
        .catch(e => {
          console.log("error deletiong")
        });
      }).catch(e => {
        console.log(e)
      })
  }




}
