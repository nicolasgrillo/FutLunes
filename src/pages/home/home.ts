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

  constructor(public navCtrl: NavController,
              private auth : AuthServiceProvider) {}

  // ionViewCanEnter(): boolean {
  //   if(!this.auth.isAuthenticated()){
  //     this.navCtrl.setRoot(LoginPage);
  //   }
  //   return this.auth.isAuthenticated();
  // }

  ionViewWillEnter(): void {
    if (this.auth.isAuthenticated()){
      if (this.auth.isAdmin()){
        this.navCtrl.push(AdminPage);
      }
      else {
        this.navCtrl.push(UserPage);
      }
    }
  }

  

}
