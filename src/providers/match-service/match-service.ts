import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { CreateMatchModel } from '../../models/CreateMatchModel';

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

}
