import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Injectable()
export class MatchServiceProvider {

  private baseApiUrl = ENV.API_BASE_URL;

  constructor(private http: HttpClient) {}

  public getCurrentMatch(): Observable<any>{
    return this.http.get(this.baseApiUrl + "api/matches/current");
  }

}
