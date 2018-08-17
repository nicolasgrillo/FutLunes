import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/providers';
import { LoginPage, ProfilePage, AdminPage, MatchPage } from '../pages';
import { CreateMatchPage } from '../create-match/create-match';
import { IToken } from '../../models/models';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  token : IToken;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  profilePage: any;
  matchPage: any;
  loginPage: any;
  adminPage: any;
  createMatchPage: any;

  constructor(public navCtrl: NavController,
              private auth : AuthServiceProvider,
              public alertCtrl: AlertController,
              private storage : Storage) 
              {
                this.profilePage = ProfilePage;
                this.matchPage = MatchPage;
                this.loginPage = LoginPage;
                this.adminPage = AdminPage;
                this.createMatchPage = CreateMatchPage;
              }

  ionViewWillEnter(): void {
    this.storage.get('access_token').then((accessToken) => {
      if (accessToken != null){
        this.token = JSON.parse(accessToken);
        this.isAuthenticated = (this.token != null);
        this.isAdmin = (this.token.userName == 'admin');
      }
    });    
  }
  
  logout(): void {
    this.storage.remove('access_token');
    this.storage.remove('userInfo');
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    let alert = this.alertCtrl.create({
      title: 'Desconexión',
      subTitle: 'Sesión cerrada',
      buttons: ['OK']
    });
    alert.present();
  }

}
