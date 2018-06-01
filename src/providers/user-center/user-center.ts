import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserCenterProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserCenterProvider Provider');
  }

}
