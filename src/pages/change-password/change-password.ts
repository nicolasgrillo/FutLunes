import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { ChangePasswordModel } from '../../models/models';
import { LoadingProvider } from '../../providers/loading/loading';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage/dist/storage';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  credentials : ChangePasswordModel; 
  loading: Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadProvider: LoadingProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private auth: AuthServiceProvider,
    private storage: Storage) {
    this.credentials = new ChangePasswordModel();
  }

  update() {
    this.loading = this.loadProvider.showLoading(this.loading, this.loadingCtrl);
    if (this.credentials.newPassword != this.credentials.confirmPassword) {
      this.loading = this.loadProvider.showError(this.loading, this.alertCtrl, "La contraseña no coincide con la confirmación.")
    }
    else {
      this.storage.get('access_token').then(
        (token) => {
          var accessToken = JSON.parse(token).access_token;
          this.auth.changePassword(this.credentials, accessToken).subscribe(
            () => {
              this.loading = this.loadProvider.showIdentitySuccess(this.loading, this.navCtrl, this.alertCtrl, "Contraseña actualizada.");    
            },
            (err) => {
              this.loading = this.loadProvider.showError(this.loading,this.alertCtrl,err);
            }
          )
        }
      )      
    }
  }

}
