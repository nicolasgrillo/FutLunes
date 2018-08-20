import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { PlayerServiceProvider, LoadingProvider } from '../../providers/providers';
import { Storage } from '@ionic/storage';
import { User, IToken } from '../../models/models';
import { ChangePasswordPage } from '../change-password/change-password';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  loading: Loading;
  userInfo : User;
  accessToken : IToken;
  changePasswordPage : any;
  updateProfilePage : any;

  @ViewChild('username') username: string;
  @ViewChild('firstName') firstName: string;
  @ViewChild('lastName') lastName: string;
  @ViewChild('email') email: string;
  @ViewChild('appearances') appearances: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private playerService: PlayerServiceProvider,
              private storage: Storage,
              private loadProvider: LoadingProvider){
                this.changePasswordPage = ChangePasswordPage;
                //TODO: Addd update profile page
                this.updateProfilePage = null;              
  }

  ionViewWillEnter() {
    this.loading = this.loadProvider.showLoading(this.loading, this.loadingCtrl);
    this.storage.get("userInfo").then(
      (info) => {
        this.userInfo = JSON.parse(info)

        this.storage.get("access_token").then(
          (token) => {
            this.accessToken = JSON.parse(token)
            if (this.userInfo == null) this.profileCallback();
            else {
              this.username = this.userInfo.username;
              this.firstName = this.userInfo.firstName;
              this.lastName = this.userInfo.lastName;
              this.email = this.userInfo.email;
              this.appearances = this.userInfo.appearances;
            }
          }
        );

        this.loading = this.loadProvider.dismissLoading(this.loading);
      }
    );    
  }

  private profileCallback(): void{
    if (this.userInfo == null && this.accessToken != null) {      
      this.playerService.getInfo(this.accessToken.userName, this.accessToken.access_token)
      .subscribe(
        (info) =>
        {
          var user = new User();
          user.username = info.userName;
          user.firstName = info.firstName;
          user.lastName = info.lastName;
          user.email = info.email;
          user.appearances = info.appearances;
          
          this.userInfo = user;
          this.storage.set("userInfo", JSON.stringify(this.userInfo));

          this.username = this.userInfo.username;
          this.firstName = this.userInfo.firstName;
          this.lastName = this.userInfo.lastName;
          this.email = this.userInfo.email;
          this.appearances = this.userInfo.appearances;
        },
        (err) =>
        {
          this.loading = this.loadProvider.showError(this.loading, this.alertCtrl, 'Error cargando perfil');
          console.log(err);
        }
      )
    }
    
  }
}
