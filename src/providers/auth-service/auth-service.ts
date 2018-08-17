import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs/Observable';
import 'rxjs/add/operator/map';
import { StorageProvider } from '../storage/storage';

@Injectable()
export class AuthServiceProvider {

  private baseApiUrl = ENV.API_BASE_URL;

  constructor(
    private http: HttpClient,
    private storage : StorageProvider
  ) {}

  get Token(): any {
    var access_token = this.storage.getKey("access_token");
    if (access_token != null) return access_token;
    return null;
  }
  
  set Token(token : any) {
    this.storage.setKey("access_token", token);    
  }

  get CurrentUser() : string {
    if (this.Token != null) return this.Token['userName'];
    return null;
  }
  
  

  public getToken(user : string, password: string): Observable<any> {

    var requestBody = "grant_type=password&username=" + user + "&password=" + password;

    return this.http.post(
      this.baseApiUrl + "token",
      requestBody,
      {
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }
    )
  }

  // Register
  public register(credentials): Observable<any> {
    return this.http.post(
      this.baseApiUrl + "api/account/register", 
      credentials, 
        {
          headers: 
          {
            'Content-type':'application/json'
          }
        }
      )      
    }
  

  public tokenHasExpired() : boolean {
    var expirationDate = new Date(this.Token['.expires']);
    return ((new Date).getTime() > expirationDate.getTime());
  }

  public isAuthenticated() : boolean {
    return (this.Token != null && !(this.tokenHasExpired()));
  }

  public isAdmin() : boolean {
    return (this.isAuthenticated() && this.CurrentUser == 'admin');
  }

  public logOut() : void {
    this.storage.removeKey("access_token");
    this.storage.removeKey("userInfo");
  }
  
}
