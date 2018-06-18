import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpClientProvider } from '../http-client/http-client'

@Injectable()
export class LottoryCenterProvider {

  constructor(public http:HttpClientProvider) {
    console.log('Hello LottoryCenterProvider Provider');
  }




}
