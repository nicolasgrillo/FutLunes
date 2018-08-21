import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MatchPage, CreateMatchPage, EditMatchPage } from '../pages';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Storage } from '@ionic/storage/dist/storage';
import { Loading } from 'ionic-angular/components/loading/loading';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { LoadingProvider } from '../../providers/loading/loading';
import { MatchServiceProvider } from '../../providers/providers';
import { Match } from '../../models/models';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  createMatchPage: any;
  editMatchPage: any;
  matchPage: any;

  loading: Loading;
  match: Match;
  token: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl : AlertController,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private matchService: MatchServiceProvider,
    private loadProvider : LoadingProvider) {
    this.createMatchPage = CreateMatchPage;
    this.editMatchPage = EditMatchPage;
  }

  ionViewDidLoad(){
    this.loading = this.loadProvider.showLoading(this.loading,this.loadingCtrl);

    this.storage.get("currentAdminMatch").then(
      (currentMatch) => {
        
        if (currentMatch == null){
          this.matchService.getCurrentMatch().subscribe(
            (matchInfo) => {
              var tempMatch = new Match();
              tempMatch.Id = matchInfo.id;
              tempMatch.MapUrl = matchInfo.locationMapUrl;
              tempMatch.Title = matchInfo.locationTitle;
              tempMatch.Limit = matchInfo.playerLimit;
              tempMatch.MatchDate = matchInfo.matchDate;
              tempMatch.Open = matchInfo.open;
              tempMatch.Players = matchInfo.players;

              this.match = tempMatch;
              this.storage.set("currentAdminMatch", JSON.stringify(this.match));
            } 
          );
        }
        else {
          this.match = JSON.parse(currentMatch)
        };

        this.storage.get('access_token').then(
          (accessToken) => {
            this.token = JSON.parse(accessToken).access_token;
          }
        );

      }
    );
  }

  confirmMatch(){
    let alert = this.alertCtrl.create({
      title: 'Confirmar partido',
      message: 'Esta seguro que desea cerrar el partido? Se cerrarán las inscripciones y sumarán puntajes.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {            
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.confirmMatchCallback();
          }
        }
      ]
    });
    alert.present();
  }

  deconfirmMatch(){
    let alert = this.alertCtrl.create({
      title: 'Confirmar partido',
      message: 'Esta seguro que desea abrir el partido? Se abrirán las inscripciones y restablecerán puntajes.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {            
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.deconfirmMatchCallback();
          }
        }
      ]
    });
    alert.present();
  }

  deconfirmMatchCallback(){
    this.loading = this.loadProvider.showLoading(this.loading,this.loadingCtrl);
    this.matchService.deconfirmMatch(this.match, this.token).subscribe(
      () => {
        this.storage.remove("currentMatch");
        this.loading = this.loadProvider.dismissLoading(this.loading);
        this.navCtrl.pop();
      },
      (err) => {
        this.loading = this.loadProvider.showError(this.loading,this.alertCtrl,err.statusText);
      }
    ); 
  }

  confirmMatchCallback(){
    this.loading = this.loadProvider.showLoading(this.loading,this.loadingCtrl);
      this.matchService.confirmMatch(this.match, this.token).subscribe(
        () => {
          this.storage.remove("currentMatch");
          this.loading = this.loadProvider.dismissLoading(this.loading);
          this.navCtrl.pop();
        },
        (err) => {
          this.loading = this.loadProvider.showError(this.loading,this.alertCtrl,err.statusText);
        }
      ); 
  }
}