import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/providers';
import { IToken } from '../../models/IToken';
import { Storage } from '@ionic/storage';
import { LoadingProvider } from '../../providers/loading/loading';
import { HomePage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  credentials = {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: ''
  }

  token : IToken;
  createSuccess: boolean = false;
  loading: Loading;

  constructor(public navCtrl: NavController, 
              private auth: AuthServiceProvider,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private storage: Storage,
              private loadProvider: LoadingProvider) {
    
  }

  register() {
    this.loading = this.loadProvider.showLoading(this.loading, this.loadingCtrl);
    if (this.credentials.password != this.credentials.confirmPassword) {
      this.loading = this.loadProvider.showError(this.loading, this.alertCtrl, "La contraseña no coincide con la confirmación.")
    }
    else {
      this.auth.register(this.credentials).subscribe(
        () => {                
            this.createSuccess = true;

            this.auth.getToken(this.credentials.username, this.credentials.password).subscribe(
              (resp) => {
                this.token = resp;
                this.storage.set('access_token', JSON.stringify(resp));
              },
              (err) => {
                console.log(err.message);
              }
            )
            this.loading = this.loadProvider.showRegisterSuccess(this.loading, this.navCtrl, this.alertCtrl, "Usuario creado.");    
            
        },
        (error) => 
        {
          this.loading = this.loadProvider.showError(this.loading, this.alertCtrl, this.parseErrors(error));
        }
      )
    }
  }

  parseErrors(response) {
    var errors = [];
    if (response.error != null){
      if (response.error.modelState != null){
        for (var key in response.error.modelState) {
            for (var i = 0; i < response.error.modelState[key].length; i++) {
                errors.push(response.error.modelState[key][i]);
            }
        }
      }
    }
    else {
      errors.push(response.message);
    }
    var output = errors.join(", ").toString();
    return output
  }
}
