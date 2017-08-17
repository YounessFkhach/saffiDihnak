import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GameProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GameProvider {

  constructor(public http: Http) {
    
  }

  getQsts(stageId : number){
    return this.http.get("/android_asset/www/assets/files/quiz" + stageId + ".json")
  }

}
