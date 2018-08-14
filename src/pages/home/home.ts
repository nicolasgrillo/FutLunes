import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/providers';
import { LoginPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private auth : AuthServiceProvider) {}

  user;

  ionViewCanEnter(): boolean {
    if(!this.auth.isAuthenticated()){
      this.navCtrl.setRoot(LoginPage);
    }
    return this.auth.isAuthenticated();
  }

  ionViewWillEnter(): void {
    if (this.auth.isAuthenticated()){
      this.user = this.auth.CurrentUser;
    }
  }

  

}
