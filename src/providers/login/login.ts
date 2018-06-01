import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestProvider } from '../rest/rest'
import {Storage} from '@ionic/storage';

interface loginParameter {
  username: string,
  password: string
}

@Injectable()
export class LoginProvider {

  loginApi:string = '/mobile-h5-auth/login?_t=init'

  constructor(public http: HttpClient,public rest: RestProvider,public storage:Storage) {
      //  this.storage.get('userInfo').then((data) => {
      //      this.loginApi += data.auth_token
      //  })
  }

  loginApp(parameter: loginParameter){
    return this.rest.postUrlReturn(this.loginApi, parameter);
  }

}
