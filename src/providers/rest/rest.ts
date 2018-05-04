import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }


  private postUrlReturn(url: string,parameter): Observable<string[]> {
    return this.http.post('http://www.zhenwin.com'+url,parameter)
  }

  private getUrlReturn(url: string): Observable<string[]> {
    return this.http.get('http://www.zhenwin.com'+url)
      .map(this.extractData)
      .catch(this.handleError)
  }

  private extractData(res: Response) {
    let body = res;
    return JSON.parse(body) || {};
  }

  private handleError(error: Response | any) {
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
