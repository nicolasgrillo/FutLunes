import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { CreateMatchModel } from '../../models/CreateMatchModel';
import { SignUpModel } from '../../models/SignUpModel';
import { Match } from '../../models/models';

@Injectable()
export class MatchServiceProvider {

  private baseApiUrl = ENV.API_BASE_URL;

  constructor(
    private http: HttpClient
  ) {}

  public getCurrentMatch(): Observable<any>{
    return this.http.get(this.baseApiUrl + "api/matches/current");
  }

  public addMatch(cmm : CreateMatchModel, token : string) : Observable<any> {
    return this.http.post(
      this.baseApiUrl + "api/matches/add",
      JSON.stringify(cmm),
      {
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + token
        }
      }
    ) 
  }

  public updateMatch(id: number, cmm : CreateMatchModel, token : string) : Observable<any> {
    return this.http.put(
      this.baseApiUrl + "api/matches/" + id,
      JSON.stringify(cmm),
      {
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + token
        }
      }
    ) 
  }

  public signUp(subscription : SignUpModel, token : string): Observable<any> {
    return this.http.post(
      this.baseApiUrl + "api/matches/signup",
      JSON.stringify(subscription),
      {
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + token
        }
      }
    )
  }

  public dismiss(subscription : SignUpModel, token : string): Observable<any> {
    return this.http.post(
      this.baseApiUrl + "api/matches/dismiss",
      JSON.stringify(subscription),
      {
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + token
        }
      }
    )
  }

  public confirmMatch(match : Match, accessToken: string) : Observable<any> {
    return this.http.post(
      this.baseApiUrl + "api/matches/" + match['id'] + "/confirm",
      "",
      {
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + accessToken
        }
      }
    )
  }

  public deconfirmMatch(match : Match, accessToken: string) : Observable<any> {
    return this.http.post(
      this.baseApiUrl + "api/matches/" + match['id'] + "/deconfirm",
      "",
      {
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + accessToken
        }
      }
    )
  }

}
