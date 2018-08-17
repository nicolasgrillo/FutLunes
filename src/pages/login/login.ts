import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/providers';
import { RegisterPage } from '../register/register';
import { Storage } from '@ionic/storage';

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
              private storage : Storage) {  
                this.registerPage = RegisterPage;
              }

  login(){
    this.showLoading();
    this.auth.getToken(this.username, this.password)
    .subscribe(
      (resp) => 
        {
          this.storage.set('access_token', JSON.stringify(resp));
          this.navCtrl.pop();
          
          let alert = this.alertCtrl.create({
            title: 'Bienvenido',
            subTitle: 'Sesión iniciada con éxito',
            buttons: ['OK']
          });
          alert.present();
        },
      (err) => 
        {
          this.showError('Sin acceso');
          console.log(err);
        }
    )    
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showSuccess(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }  

}
