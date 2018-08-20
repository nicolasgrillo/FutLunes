import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs/Observable';
import 'rxjs/add/operator/map';
import { IToken } from '../../models/models';
import { ChangePasswordModel } from '../../models/ChangePasswordModel';
import { UpdateProfileModel } from '../../models/UpdateProfileModel';

@Injectable()
export class AuthServiceProvider {

  private baseApiUrl = ENV.API_BASE_URL;  

  constructor(
    private http: HttpClient
  ) {}

  public getToken(user : string, password: string): Observable<IToken> {

    var requestBody = "grant_type=password&username=" + user + "&password=" + password;

    return this.http.post(
      this.baseApiUrl + "token",
      requestBody,
      {
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }
    ).map((resp) =>{
      return resp as IToken;
    })
  }

  public changePassword(credentials : ChangePasswordModel, accessToken: string) : Observable<any>{
    return this.http.post(
      this.baseApiUrl + "api/account/changepassword",
      JSON.stringify(credentials),
      {
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + accessToken
        }
      }
    )
  }

  public updateProfile(username : string, credentials : UpdateProfileModel, accessToken : string): Observable<any>{
    return this.http.put(
      this.baseApiUrl + "api/account/update",
      credentials,
      {
        headers: 
          {
            'Content-type':'application/json',
            'Authorization':'Bearer ' + accessToken
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
}
