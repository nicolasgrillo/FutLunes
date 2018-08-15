import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { MatchServiceProvider } from '../../providers/providers';

/**
 * Generated class for the MatchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {

  //@ViewChild('username') username: string;
  loading: Loading;
  match: any;
  players: any[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private matchService: MatchServiceProvider) {
  }

  ionViewWillEnter() {
    var matchInfo = JSON.parse(localStorage.getItem("currentMatch"));

    if (matchInfo == null) {
      this.showLoading();
      this.matchService.getCurrentMatch()
      .subscribe(
        (info) =>
        {
          this.match = info;
          this.players = info["players"];
          localStorage.setItem("currentMatch", JSON.stringify(info));
        },
        (err) =>
        {
          this.showError('Error cargando partido');
          console.log(err);
        }
      )
    }
    else {
      this.match = matchInfo;
      this.players = matchInfo["players"];
    }
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
