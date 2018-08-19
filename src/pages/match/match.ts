import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading } from 'ionic-angular';
import { MatchServiceProvider, AuthServiceProvider } from '../../providers/providers';
import { Match, User } from '../../models/models';
import { Storage } from '@ionic/storage';
import { LoadingProvider } from '../../providers/loading/loading';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

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
              private matchService: MatchServiceProvider,
              private auth: AuthServiceProvider,
              private storage: Storage,
              private loadingCtrl: LoadingController,
              private loadProvider: LoadingProvider) {
  }

  ionViewWillEnter() {
    this.loading = this.loadProvider.showLoading(this.loading, this.loadingCtrl)
    
    this.storage.get("userInfo").then(
      (userInfo) => {
        if(userInfo)
        {      
          this.user = JSON.parse(userInfo)
          this.isAdmin = this.user.username == 'admin';
        }

        this.storage.get("currentMatch").then(
          (matchInfo) => {
            this.match = JSON.parse(matchInfo)
            if (this.match == null) this.matchCallback();
            else this.subscriptions = this.match.Players.length;
            this.loading = this.loadProvider.dismissLoading(this.loading);
          }
        );
      }
    );   
  }  

  private matchCallback(){
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
        this.loading = this.loadProvider.showError(this.loading, this.alertCtrl, 'Error cargando partido');
        console.log(err);
      }
    )
  }

  kick(player, match){
    console.log("should kick here");
  }

}
