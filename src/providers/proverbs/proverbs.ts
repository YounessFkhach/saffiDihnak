import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProverbsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProverbsProvider {

  DB_NAME : string = 'proverbs.db'
  isReady : boolean = false
  db : SQLiteObject

  constructor(private sqlite : SQLite,
              private http : Http) {
    this.sqlite = new SQLite();
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
        db.executeSql('CREATE TABLE IF NOT EXISTS `sayings` (`_id` INTEGER PRIMARY KEY, `text` TEXT UNIQUE, `author` VARCHAR(110));', {})
          .then(() => {
            db.executeSql('CREATE TABLE IF NOT EXISTS `watched` (`_id` INTEGER PRIMARY KEY, `text` TEXT UNIQUE, `author` VARCHAR(110));', {})
              .then(() => {
                console.log("All tables were created")
                resolve("done");
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

  getAllSayings(){
    return new Promise((resolve, reject)=>{
      this.db.executeSql('select * from `sayings` order by _id desc', {})
        .then((data) => {
          var sayingsArray : any[] = []
          if(data == null) return;
          
          if(data.rows && data.rows.length > 0){
            for(let i = 0; i < data.rows.length; i++) {
              sayingsArray.push(data.rows.item(i));
            }
          }
          resolve(sayingsArray);
        })
        .catch(e => {
          console.log(e)
          reject(e)
        });
      }).catch(e => console.log(e))
  }

  getAllWisdoms(){
    return new Promise((resolve, reject)=>{
      this.db.executeSql('select * from `wisdoms` order by _id desc', {})
        .then((data) => {
          var wisdomsArray : any[] = []
          
          if(data.rows && data.rows.length > 0){
            for(let i = 0; i < data.rows.length; i++) {
              wisdomsArray.push(data.rows.item(i));
            }
          }
          resolve(wisdomsArray);
        })
        .catch(e => {
          console.log(e)
          reject(e)
        });
      }).catch(e => console.log(e))
  }

  insertSaying(saying : any){
    return this.db.executeSql('insert into `sayings` (text, author) values (?,?)', [saying.text, saying.author])
  }

  insertWisdom(wisdom : any){
    this.db.executeSql('insert into `wisdom` (text, author) values (?,?)', [wisdom.text, wisdom.author])
  }

  getLocalData(name : string) {
    return this.http.get("/android_asset/www/assets/files/" + name + ".json")
  }

  getServerData(name : string){
    return this.http.get("http://fkhach.me/apps/saffiDihnak/" + name + ".json")
  }


}
