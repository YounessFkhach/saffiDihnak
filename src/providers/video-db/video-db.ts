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
  isReady : boolean = false
  db : SQLiteObject

  constructor( private sqlite : SQLite) {
    this.sqlite = new SQLite();
    //this.init()
  }

  create(){
    return this.sqlite.create({
      name: this.DB_NAME,
      location: 'default'
    })
  }

  init(){
    return new Promise((resolve, reject)=>{
      this.create().then((db : SQLiteObject) => {
        this.db = db;
        db.executeSql('CREATE TABLE IF NOT EXISTS `video` (`_id` INTEGER PRIMARY KEY, `id` VARCHAR(20) UNIQUE, `image` VARCHAR(100), `description` TEXT, `title` VARCHAR(110), `duration` VARCHAR(10), `viewCount` INT);', {})
          .then(() => {
            db.executeSql('CREATE TABLE IF NOT EXISTS `tests` (`_id` INTEGER PRIMARY KEY, `id` VARCHAR(20) UNIQUE, `image` VARCHAR(100), `description` TEXT, `title` VARCHAR(110), `duration` VARCHAR(10), `viewCount` INT);', {})
              .then(() => {
                db.executeSql('CREATE TABLE IF NOT EXISTS `top` (`_id` INTEGER PRIMARY KEY, `id` VARCHAR(20) UNIQUE, `image` VARCHAR(100), `description` TEXT, `title` VARCHAR(110), `duration` VARCHAR(10), `viewCount` INT);', {})
                  .then(() => {
                    db.executeSql('CREATE TABLE IF NOT EXISTS `riddles` (`_id` INTEGER PRIMARY KEY, `id` VARCHAR(20) UNIQUE, `image` VARCHAR(100), `description` TEXT, `title` VARCHAR(110), `duration` VARCHAR(10), `viewCount` INT);', {})
                      .then(() => {
                        db.executeSql('CREATE TABLE IF NOT EXISTS `watched` (`_id` INTEGER PRIMARY KEY, `id` VARCHAR(20) UNIQUE);', {})
                          .then(() => {
                            console.log("All tables were created")
                            resolve("done");
                          })
                          .catch(e => console.log(e))
                      })
                      .catch(e => console.log(e))
                  })
                  .catch(e => console.log(e))
              })
              .catch(e => console.log(e))
          })
          .catch(e => {
            reject(e);
            console.log("table creation error: " + e)
          });
      }).catch(e => console.log("database creation error: " + e))
    });
  }

  getVideos(table : string){
    console.log("getting videos")
    return new Promise((resolve, reject)=>{
      this.db.executeSql('select * from `' + table + '` order by _id desc', {})
        .then((data) => {
          //after recieving videos
          var videoArray : VideoDetail[] = []
          if(data == null) return;
          
          if(data.rows && data.rows.length > 0){
            for(let i = 0; i < data.rows.length; i++) {
              videoArray.push(new VideoDetail(data.rows.item(i)));
            }
          }
          resolve(videoArray);
        })
        .catch(e => {
          console.log(e)
          reject(e)
        });
      }).catch(e => console.log(e))
  }

  insertVideo(table : string ,video : VideoDetail){
    this.db.executeSql('insert into `' + table + '` (id, image, description, title, duration, viewCount) values (?,?,?,?,?,?)', [video.id, video.image, video.description, video.title, video.duration, video.viewCount])
      .then((data) => {console.log("video is stored")})
      .catch(e => {
        console.log("error inserting video")
        //console.log(e)
      });
  }

  updateVideo(table : string ,video : VideoDetail){
    this.db.executeSql('UPDATE `' + table + '` set  description = ?, title = ?, viewCount = ? WHERE id = ?', [video.description, video.title, video.viewCount, video.id])
      .then((data) => {console.log("video Updated")})
      .catch(e => {
        console.log("error updating video")
      });
  }

  deleteVideo(table : string ,id: String){
    this.db.executeSql('DELETE  FROM `' + table + '` WHERE id = ?', [id])
      .then((data) => {console.log("video deleted")})
      .catch(e => {
        console.log("error deletiong")
    });
  }

  getWatched(){
    return new Promise((resolve, reject)=>{
      this.db.executeSql('select * from `watched` order by _id desc', {})
        .then((data) => {
          //after recieving videos
          var watchedArray : string[] = []
          if(data == null) return;
          
          if(data.rows && data.rows.length > 0){
            for(let i = 0; i < data.rows.length; i++) {
              watchedArray.push(data.rows.item(i).id);
            }
          }
          resolve(watchedArray);
        })
        .catch(e => {
          console.log(e)
          reject(e)
        });
      }).catch(e => console.log(e))
  }

  setWatched(id : string){
    this.db.executeSql('insert into `watched` (id) values (?)', [id])
      .then((data) => {console.log("video is added to watched")})
      .catch(e => {
        console.log("error inserting video to watched")
        //console.log(e)
      });
  }


}
