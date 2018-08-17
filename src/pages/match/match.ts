import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { MatchServiceProvider, AuthServiceProvider } from '../../providers/providers';
import { Match, User } from '../../models/models';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {

  loading: Loading;
  match: Match;
  user: User;
  subscriptions: number;
  isAdmin: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private matchService: MatchServiceProvider,
              private auth: AuthServiceProvider,
              private storage: Storage) {
  }

  ionViewWillEnter() {
    this.storage.get("currentMatch").then(
      (matchInfo) => {
        this.match = JSON.parse(matchInfo)
        if (this.match == null) this.matchCallback();
        else this.subscriptions = this.match.Players.length;
      }
    );
    this.storage.get("userInfo").then(
      (userInfo) => {
        this.user = JSON.parse(userInfo)
        this.isAdmin = this.user.username == 'admin';
      }
    );   
  }  

  private matchCallback(){
    this.showLoading();
    this.matchService.getCurrentMatch()
    .subscribe(
      (matchInfo) =>
      {
        var tempMatch = new Match();
        tempMatch.MapUrl = matchInfo.locationMapUrl;
        tempMatch.Title = matchInfo.locationTitle;
        tempMatch.Limit = matchInfo.playerLimit;
        tempMatch.MatchDate = matchInfo.matchDate;
        tempMatch.Players = matchInfo.players;

        this.match = tempMatch;

        this.storage.set("currentMatch", JSON.stringify(this.match));
        this.subscriptions = this.match.Players.length;
      },
      (err) =>
      {
        this.showError('Error cargando partido');
        console.log(err);
      }
    )
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

  kick(player, match){
    console.log("should kick here");
  }

}
