import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('email') email: any;
  public username: string;
  public password: string;
  public error: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth : AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.auth.getToken(this.username, this.password)
    .subscribe((resp) => {
      localStorage.setItem('access_token', resp['access_token']);
    },
    (err) => {
      console.log(err);
    }
    )
    
  }

}
