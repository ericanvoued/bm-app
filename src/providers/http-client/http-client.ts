import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpClientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let baseUrl = 'http://user.firecat.com'

@Injectable()
export class HttpClientProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HttpClientProvider Provider');
  }

    public fetchData(url):Promise<any>{
        return new Promise((resolve,reject) => {
            //this.beforeRequest()
            this.http.get(baseUrl+url).subscribe((data:any) => {
                resolve(data)

            })
        })
    }

    public postData(url,params):Promise<any>{
        //return this.http.post(baseUrl + url,params)
         return new Promise((resolve,reject) => {
             this.http.post(baseUrl + url,params).subscribe(data => {
                 resolve(data)
             })
         })
    }
}
