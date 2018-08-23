import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { PlayerServiceProvider, LoadingProvider } from '../../providers/providers';
import { Storage } from '@ionic/storage';
import { User, IToken } from '../../models/models';
import { ChangePasswordPage } from '../change-password/change-password';
import { UpdateProfilePage } from '../update-profile/update-profile';

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

  @ViewChild('userName') userName: string;
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
                this.updateProfilePage = UpdateProfilePage;              
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
              this.fillUserCard(this.userInfo);
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
        (userInfo) =>
        {
          this.userInfo = userInfo;
          this.storage.set("userInfo", JSON.stringify(userInfo));
          this.fillUserCard(this.userInfo);          
        },
        (err) =>
        {
          this.loading = this.loadProvider.showError(this.loading, this.alertCtrl, 'Error cargando perfil');
          console.log(err);
        }
      )
    }    
  }

  private fillUserCard(userInfo : User) : void {
    this.userName = userInfo.userName;
    this.firstName = userInfo.firstName;
    this.lastName = userInfo.lastName;
    this.email = userInfo.email;
    this.appearances = userInfo.appearances;
  }
}
