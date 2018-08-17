import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { PlayerServiceProvider } from '../../providers/providers';
import { Storage } from '@ionic/storage';
import { User, IToken } from '../../models/models';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  loading: Loading;
  userInfo : User;
  accessToken : IToken;

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
              private storage: Storage) {
  }

  ionViewWillEnter() {
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
      }
    );

    
  }

  private profileCallback(): void{
    if (this.userInfo == null && this.accessToken != null) {      
      this.showLoading();
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
          this.showError('Error cargando perfil');
          console.log(err);
        }
      )
    }
    
  }

  update(){
    console.log("Update clicked");
    // Update profile here
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
