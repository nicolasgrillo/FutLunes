import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { MatchServiceProvider, AuthServiceProvider } from '../../providers/providers';
import { MatchModel, PlayerModel } from '../../models/models';

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
  match: MatchModel;
  subscriptions: number;
  isAdmin: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private matchService: MatchServiceProvider,
              private auth: AuthServiceProvider) {
  }

  ionViewWillEnter() {
    this.isAdmin = this.auth.isAdmin();

    var matchInfo = JSON.parse(localStorage.getItem("currentMatch"));
    this.match = new MatchModel();

    if (matchInfo == null) {
      this.showLoading();
      this.matchService.getCurrentMatch()
      .subscribe(
        (info) =>
        {
          this.match.MapUrl = info["locationMapUrl"];
          this.match.Title = info["locationTitle"];
          this.match.Limit = info["playerLimit"];
          this.match.MatchDate = info["matchDate"];
          this.match.Players = this.loadPlayers(info["players"]);
          localStorage.setItem("currentMatch", JSON.stringify(this.match));
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
      this.subscriptions = this.match.Players.length;
    }
  }

  loadPlayers(playerJson : any[] ): PlayerModel[] {
    var playerList : PlayerModel[] = [];
    playerJson.forEach(player => {
      var p = new PlayerModel();
      p.username = player["user"];
      p.subscriptionDate = player["subscriptionDate"];
      playerList.push(p);
    })

    this.subscriptions = playerList.length;
    return playerList;
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
