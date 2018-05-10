import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Response} from '@angular/http';


@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }


  postUrlReturn(url: string,parameter): Observable<any> {
    return this.http.post('http://www.zhenwin.com'+url,parameter)
  }

  getUrlReturn(url: string): Observable<string[]> {
    return this.http.get('http://www.zhenwin.com'+url)
      // .map(this.extractData)
      // .catch(this.handleError)
  }

  extractData(res: Response) {
    let body = res;
    return JSON.parse(body) || {};
  }

  handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = '${error.status - $(error.statusText || " ") $(err)';
    } else {
      errMsg = error.massage ? error.massage : error.toString();
    }
    console.error(errMsg)
    return Observabale.throw(errMsg)
  }

}
