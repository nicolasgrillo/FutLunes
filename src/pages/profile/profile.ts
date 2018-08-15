import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider, PlayerServiceProvider } from '../../providers/providers';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  loading: Loading;
  @ViewChild('username') username: string;
  @ViewChild('firstName') firstName: string;
  @ViewChild('lastName') lastName: string;
  @ViewChild('email') email: string;
  @ViewChild('appearances') appearances: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private auth : AuthServiceProvider,
              private playerService: PlayerServiceProvider) {
  }

  ionViewWillEnter() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    var username = this.auth.CurrentUser

    if (userInfo == null) {      
      this.showLoading();
      this.playerService.getInfo()
      .subscribe(
        (info) =>
        {
          this.username = username;
          this.firstName = info.firstName;
          this.lastName = info.lastName;
          this.email = info.email;
          this.appearances = info.appearances;
          localStorage.setItem("userInfo", JSON.stringify(info));
        },
        (err) =>
        {
          this.showError('Error cargando perfil');
          console.log(err);
        }
      )
    }
    else {
      this.username = username;
      this.firstName = userInfo["firstName"];
      this.lastName = userInfo["lastName"];
      this.email = userInfo["email"];
      this.appearances = userInfo["appearances"];
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
