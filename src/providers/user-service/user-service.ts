import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../src/environments/environment';

/*
  Generated class for the UserService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserService {

  apiBaseUrl : string = ENV.API_BASE_URL;

  constructor(private http: HttpClient) {}

}
