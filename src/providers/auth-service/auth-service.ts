import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs/Observable';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthServiceProvider {

  private baseApiUrl = ENV.API_BASE_URL;

  get Token(): string {
    var access_token = localStorage.getItem('access_token');
    if (access_token != null) return access_token;
    return null;
  }
  
  set Token(token : string) {
    localStorage.setItem('access_token', token);
  }
  
  constructor(private http: HttpClient) {}

  public getToken(user : string, password: string): Observable<any> {

    var requestBody = "grant_type=password&username=" + user + "&password=" + password;

    return this.http.post(
      this.baseApiUrl + "/token",
      requestBody,
      {
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }
    )
  }

  public isAuthenticated() :boolean {return (localStorage.getItem("access_token") != null)}
  
}
