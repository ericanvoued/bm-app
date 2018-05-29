import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestProvider } from '../rest/rest';

@Injectable()
export class SignupProvider {

  getRegisterParamApi = '/h5-api-auth/register?_t=init';
  // getRegisterParamApi = '/h5-api-auth/register?_t=init&keyword=';

  constructor(public http: HttpClient,public rest: RestProvider) {
    // console.log('Hello SignupProvider Provider');
  }

  getRegisterParam(_keyword) {
    return this.rest.getUrlReturn(this.getRegisterParamApi + _keyword)
  }

  postRegisterData(parameter){
    return this.rest.postUrlReturn(this.getRegisterParamApi, parameter);
  }

}
