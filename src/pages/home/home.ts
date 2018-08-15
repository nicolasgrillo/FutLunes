import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/providers';
import { LoginPage, ProfilePage, AdminPage, MatchPage } from '../pages';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  profilePage: any;
  matchPage: any;
  loginPage: any;
  adminPage: any;

  constructor(public navCtrl: NavController,
              private auth : AuthServiceProvider,
              public alertCtrl: AlertController) 
              {
                this.profilePage = ProfilePage;
                this.matchPage = MatchPage;
                this.loginPage = LoginPage;
                this.adminPage = AdminPage;
              }

  ionViewWillEnter(): void {
    this.isAuthenticated = this.auth.isAuthenticated();
    this.isAdmin = this.auth.isAdmin();
  }
  
  logout(): void {
    this.auth.logOut();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    let alert = this.alertCtrl.create({
      title: 'Desconexión',
      subTitle: 'Sesión cerrada',
      buttons: ['OK']
    });
    alert.present();
  }

}
