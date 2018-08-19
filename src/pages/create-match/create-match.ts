import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { CreateMatchModel } from '../../models/CreateMatchModel';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingProvider } from '../../providers/loading/loading';
import { MatchServiceProvider } from '../../providers/match-service/match-service';
import { Storage } from '@ionic/storage/dist/storage';

@IonicPage()
@Component({
  selector: 'page-create-match',
  templateUrl: 'create-match.html',
})
export class CreateMatchPage {

  loading : Loading;
  match : CreateMatchModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private loadProvider: LoadingProvider,
    private matchService: MatchServiceProvider,
    private storage : Storage
  ) {
    this.match = new CreateMatchModel();
    this.match.LocationTitle = "Solis Cano";
    this.match.LocationMapUrl = "https://goo.gl/maps/VA4AGoHYEfB2"
    this.match.PlayerLimit = 10;
   }

   confirm(){
    let alert = this.alertCtrl.create({
      title: 'Confirme partido',
      message: 'Esta seguro que desea crear el partido con estos datos? Se eliminará el partido actual, incluyendo sus inscriptos. Verifique si es necesario concluir el partido actual previamente.',
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
            this.createMatch();
          }
        }
      ]
    });
    alert.present();
   }

  createMatch() {
    this.loading = this.loadProvider.showLoading(this.loading,this.loadingCtrl);
    this.storage.get('access_token').then(
      (resp) => {
        var accessToken = JSON.parse(resp).access_token;
        this.matchService.addMatch(this.match, accessToken).subscribe(
          () => {
            this.storage.remove("currentMatch");
            this.loading = this.loadProvider.dismissLoading(this.loading);
            this.navCtrl.pop();
          },
          (err) => {
            this.loading = this.loadProvider.showError(this.loading,this.alertCtrl,err);
          }
        )

      }
    )
    
  }
}
