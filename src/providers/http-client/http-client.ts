import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingProvider } from '../loading/loading'
/*
  Generated class for the HttpClientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//let baseUrl = 'http://user.firecat.com'
let baseUrl = 'http://www.zhenwin.com'
//let baseUrl = '/api'

@Injectable()
export class HttpClientProvider {

  constructor(public http: HttpClient, public load:LoadingProvider) {
    console.log('Hello HttpClientProvider Provider');
  }

    public fetchData(url):Promise<any>{
        return new Promise((resolve,reject) => {
            //this.beforeRequest()
            this.http.get(baseUrl+url).subscribe((data:any) => {
                if (data.IsSuccess || data.isSuccess) {
                    resolve(data);
                  } else {
                      console.log('ffqfqwfwq')
                   // this.load.showTip(data.Msg, 3000);
                    //reject(data);
                  }
            }, (e) => {
                this.load.showTip(JSON.stringify(e), 3000);
                reject(e);
              })
        })
    }

    public postData(url,params):Promise<any>{
        //return this.http.post(baseUrl + url,params)
         return new Promise((resolve,reject) => {
             this.http.post(baseUrl + url,params).subscribe((data:any) =>  {
                if (data.isSuccess) {
                    resolve(data);
                  } else {
                   // this.load.showTip(data.Msg, 3000);
                    console.log(data)
                    //reject(data);
                  }
            }, (e) => {
                this.load.showTip(JSON.stringify(e), 3000);
                 //reject(e);
              })
         })
    }
}
