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

  constructor(public http: Http) {
    console.log('Hello ProverbsProvider Provider');
  }

  getData(name : string) {
    return this.http.get("/android_asset/www/assets/files/" + name + ".json")
  }


}
