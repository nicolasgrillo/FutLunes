import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/providers';
import { LoginPage, AdminPage, UserPage } from '../pages';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(public navCtrl: NavController,
              private auth : AuthServiceProvider) {}

  ionViewWillEnter(): void {
    this.isAuthenticated = this.auth.isAuthenticated();
    this.isAdmin = this.auth.isAdmin();
  }

  login(): void {
    this.navCtrl.push(LoginPage)
  }

  profile(): void {
    console.log("Something with profile");
    //this.navCtrl.push(ProfilePage)
  }

  admin(): void {
    this.navCtrl.push('AdminPage');
  }

  logout(): void {
    this.auth.logOut();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}
