import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { AuthServiceProvider } from '../auth-service/auth-service';

/*
  Generated class for the PlayerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlayerServiceProvider {

  private baseApiUrl = ENV.API_BASE_URL;

  constructor(private http: HttpClient,
              private auth: AuthServiceProvider) {}

  public getInfo(username : string, accesstoken : string): Observable<any> {
    return this.http.get(
      this.baseApiUrl + "api/players/" + username + "/",
      {
        headers: {
          "Authorization": "Bearer " + accesstoken
        }
      }
    );
  }

}
