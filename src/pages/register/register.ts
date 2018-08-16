import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/providers';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  createSuccess: boolean = false;
  loading: Loading;

  constructor(public navCtrl: NavController, 
              private auth: AuthServiceProvider,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
    
  }

  register() {
    this.showLoading();
    if (this.credentials.password != this.credentials.confirmPassword) {
      this.showPopup("Error", "La contraseña no coincide con la confirmación.");
    }
    else {
      this.auth.register(this.credentials).subscribe(
        () => {                
            this.createSuccess = true;

            this.auth.getToken(this.credentials.username, this.credentials.password).subscribe(
              (resp) => {
                this.auth.Token = resp;
              },
              (err) => {
                console.log(err.message);
              }
            )

            this.showPopup("Exito","Usuario creado.");  
        },
        (error) => 
        {
          this.showPopup("Error", this.parseErrors(error));
          this.loading.dismiss();
        }
      )
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
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

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
