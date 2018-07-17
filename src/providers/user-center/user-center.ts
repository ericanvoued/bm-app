import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpClientProvider } from '../http-client/http-client'


@Injectable()
export class UserCenterProvider {
  userInfo:any;



  changePswData={}

  constructor(public http:HttpClientProvider) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }







}
