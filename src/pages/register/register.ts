import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
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

  createSuccess = false;
  credentials = {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmation: ''
  }

  constructor(public navCtrl: NavController, 
              private auth: AuthServiceProvider,
              private alertCtrl: AlertController) {
    
  }

  register() {
    if (this.credentials.password != this.credentials.confirmation) {
      this.showPopup("Error", "La contraseña no coincide con la confirmación.");
    }
    else {
      this.auth.register(this.credentials).subscribe(
      success => {
        if (success) {
          this.createSuccess = true;
          this.showPopup("Exito","Usuario creado.");
        }
        else {
          this.showPopup("Error","Hubo un problema creando el usuario.")
        }
      },
      error => {
        this.showPopup("Error",error);
      }
      )
    }
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
