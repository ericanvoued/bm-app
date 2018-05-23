import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestProvider } from '../rest/rest';


@Injectable()
export class BankCardProvider {

  bindCardApi = '/h5api-bank-cards/1/bind-card'

  constructor(public http: HttpClient,public rest: RestProvider) {
    // console.log('Hello BankCardProvider Provider');
  }


  getBindCard(options){
    return this.rest.postUrlReturn(this.bindCardApi, options);
  }





}
