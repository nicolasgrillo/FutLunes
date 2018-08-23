import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { AuthServiceProvider } from '../auth-service/auth-service';
import 'rxjs/add/operator/map';
import { User } from '../../models/User';

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
    ).map(
      (info) => {
        return info as User
      }
    );
  }

}
