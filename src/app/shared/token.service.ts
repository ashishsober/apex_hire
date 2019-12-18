import { Injectable } from '@angular/core';


@Injectable()
export class TokenService {

  getToken(): String {
    return window.sessionStorage['accessToken'];
  }

  saveToken(token: String) {
    window.sessionStorage['accessToken'] = token;
  }

  destroyToken() {
    window.sessionStorage.removeItem('accessToken');
  }

}
