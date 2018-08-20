import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading } from 'ionic-angular';
import { MatchServiceProvider, AuthServiceProvider } from '../../providers/providers';
import { Match, User } from '../../models/models';
import { Storage } from '@ionic/storage';
import { LoadingProvider } from '../../providers/loading/loading';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { SignUpModel } from '../../models/SignUpModel';

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
  hasSignedUp = false;

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
            else {
              this.subscriptions = this.match.Players.length;
              this.checkIfUserHasSignedUp();
            }

            
            
            this.loading = this.loadProvider.dismissLoading(this.loading);
          }
        );
      }
    );   
  }  

  private checkIfUserHasSignedUp(){
      var result = this.match.Players.find(p => p.user == this.user.username)
      if (result != null) this.hasSignedUp = true;
      else this.hasSignedUp = false;
  }

  private matchCallback(){
    this.matchService.getCurrentMatch()
    .subscribe(
      (matchInfo) =>
      {
        var tempMatch = new Match();
        tempMatch.Id = matchInfo.id;
        tempMatch.MapUrl = matchInfo.locationMapUrl;
        tempMatch.Title = matchInfo.locationTitle;
        tempMatch.Limit = matchInfo.playerLimit;
        tempMatch.MatchDate = matchInfo.matchDate;
        tempMatch.Players = matchInfo.players;

        this.match = tempMatch;

        this.storage.set("currentMatch", JSON.stringify(this.match));
        this.subscriptions = this.match.Players.length;
        if (this.user != null) this.checkIfUserHasSignedUp();
      },
      (err) =>
      {
        this.loading = this.loadProvider.showError(this.loading, this.alertCtrl, 'Error cargando partido');
        console.log(err);
      }
    )
  }

  dismiss() {
    var subscription = new SignUpModel();
    subscription.MatchId = this.match.Id;
    subscription.UserName = this.user.username;
    // TODO : Not required, probably shouldn't send Sub Date along. Confirm, low priority. 
    subscription.DateTime = this.match.Players.find(p => p.user == this.user.username).subscriptionDate

    this.loading = this.loadProvider.showLoading(this.loading, this.loadingCtrl);
    this.storage.get('access_token').then(
      (resp) => {
        var accessToken = JSON.parse(resp).access_token;
        this.matchService.dismiss(subscription, accessToken)
        .subscribe(
          () => {
            this.storage.remove('currentMatch')
            this.loading = this.loadProvider.showSuccess(this.loading, this.alertCtrl, "Dado de baja con éxito");
            this.matchCallback();
          },
          (err) => {
            this.loading = this.loadProvider.showError(this.loading, this.alertCtrl, 'Error en la baja');
            console.log(err);
          }
        )
      });
  }

  signUp() {
    var subscription = new SignUpModel();
    subscription.DateTime = new Date();
    subscription.MatchId = this.match.Id;
    subscription.UserName = this.user.username;

    this.loading = this.loadProvider.showLoading(this.loading, this.loadingCtrl);
    this.storage.get('access_token').then(
      (resp) => {
        var accessToken = JSON.parse(resp).access_token;
        this.matchService.signUp(subscription, accessToken)
        .subscribe(
          () => {
            this.storage.remove('currentMatch')
            this.loading = this.loadProvider.showSuccess(this.loading, this.alertCtrl, "Anotado con éxito");
            this.matchCallback();
          },
          (err) => {
            this.loading = this.loadProvider.showError(this.loading, this.alertCtrl, 'Error en la inscripción');
            console.log(err);
          }
        )
      });

  }

  kick(player, match){
    console.log("should kick here");
  }

}
