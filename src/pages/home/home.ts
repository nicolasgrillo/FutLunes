import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/providers';
import { LoginPage, ProfilePage, AdminPage, MatchPage } from '../pages';
import { CreateMatchPage } from '../create-match/create-match';
import { IToken } from '../../models/models';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public token : IToken;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  profilePage: any;
  matchPage: any;
  loginPage: any;
  adminPage: any;
  createMatchPage: any;
  loading: Loading;

  constructor(public navCtrl: NavController,
              private auth : AuthServiceProvider,
              public alertCtrl: AlertController,
              private storage : Storage,
              private loadingCtrl : LoadingController,
              private loadProvider: LoadingProvider) 
              {
                this.profilePage = ProfilePage;
                this.matchPage = MatchPage;
                this.loginPage = LoginPage;
                this.adminPage = AdminPage;
                this.createMatchPage = CreateMatchPage;
              }


  ionViewDidEnter(): void {
    this.loading = this.loadProvider.showLoading(this.loading, this.loadingCtrl);
    this.storage.get('access_token').then((accessToken) => {
      if (accessToken != null){
        this.token = JSON.parse(accessToken);
        this.isAuthenticated = (this.token != null);
        this.isAdmin = (this.token.userName == 'admin');
      }
      this.loading = this.loadProvider.dismissLoading(this.loading);
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
