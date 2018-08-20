import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { UpdateProfileModel } from '../../models/UpdateProfileModel';
import { Storage } from '@ionic/storage/dist/storage';
import { LoadingProvider } from '../../providers/providers';
import { User } from '../../models/User';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {

  user : User
  profile : UpdateProfileModel
  loading : Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private loadProvider: LoadingProvider,
    private auth: AuthServiceProvider
  ) {
    this.profile = new UpdateProfileModel();

  }

  ionViewDidLoad() {
    this.storage.get('userInfo').then(
      (info) => {
        this.user = JSON.parse(info);
        this.profile.email = this.user.email;
        this.profile.firstName = this.user.firstName;
        this.profile.lastName = this.user.lastName;
      }
    )
  }

  update(){
    this.loading = this.loadProvider.showLoading(this.loading, this.loadingCtrl);
    this.storage.get('access_token').then(
      (resp) => {
        var accessToken = JSON.parse(resp).access_token;

        this.auth.updateProfile(this.user.username, this.profile, accessToken).subscribe(
          () => {
            this.storage.remove('userInfo');
            this.loading = this.loadProvider.showIdentitySuccess(this.loading, this.navCtrl, this.alertCtrl, "Perfil actualizado.");    
          },
          (err) => {
            this.loading = this.loadProvider.showError(this.loading, this.alertCtrl, err.message);
          }
        )
      }
    )
  }

}
