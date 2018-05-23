import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestProvider } from '../rest/rest';

interface loginParameter {
  username: string,
  password: string
}

@Injectable()
export class LoginProvider {

  loginApi:string = '/h5-api-auth/login?_t=init'

  constructor(public http: HttpClient,public rest: RestProvider) {

  }

  loginApp(parameter: loginParameter){
    return this.rest.postUrlReturn(this.loginApi, parameter);
  }

}
