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

  getUrlReturn(url: string): Observable<any> {
    return this.http.get('http://www.zhenwin.com'+url)

  }

  
}
