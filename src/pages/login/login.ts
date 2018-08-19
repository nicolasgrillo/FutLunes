import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/providers';
import { RegisterPage } from '../register/register';
import { Storage } from '@ionic/storage';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerPage: any;
  @ViewChild('username') username: string;
  @ViewChild('password') password: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private auth : AuthServiceProvider,
              private storage : Storage,
              private loadProvider: LoadingProvider) {  
                this.registerPage = RegisterPage;
              }

  login(){
    this.loading = this.loadProvider.showLoading(this.loading, this.loadingCtrl);
    this.auth.getToken(this.username, this.password)
    .subscribe(
      (resp) => 
        {
          this.storage.set('access_token', JSON.stringify(resp));
          this.navCtrl.pop();
          this.loading = this.loadProvider.showSuccess(this.loading, this.alertCtrl, "Sesión iniciada con éxito.")          
        },
      (err) => 
        {
          this.loading = this.loadProvider.showError(this.loading, this.alertCtrl, "Sin acceso");
          console.log(err);
        }
    )    
  }
}
