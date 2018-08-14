import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/providers';

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
  loading: Loading;
  @ViewChild('username') username: string;
  @ViewChild('password') password: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private auth : AuthServiceProvider) {  }

  login(){
    this.showLoading();
    this.auth.getToken(this.username, this.password)
    .subscribe(
      (resp) => 
        {
          this.auth.Token = resp;
          this.showSuccess('Authenticated');
          this.navCtrl.setRoot('HomePage');
        },
      (err) => 
        {
          this.showError('Access Denied');
          console.log(err);
        }
    )    
  }

  createAccount(){
    this.navCtrl.push('RegisterPage');
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
