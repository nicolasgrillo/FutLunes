import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CreateMatchModel, Match } from '../../models/models';
import { LoadingProvider, MatchServiceProvider } from '../../providers/providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-edit-match',
  templateUrl: 'edit-match.html',
})
export class EditMatchPage {

  loading : Loading;
  match : CreateMatchModel;
  fullMatch : Match;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private loadProvider: LoadingProvider,
    private matchService: MatchServiceProvider,
    private storage : Storage
  ) {
  }

  ionViewDidLoad() {
    this.loading = this.loadProvider.showLoading(this.loading, this.loadingCtrl)
    this.storage.get("currentMatch").then(
      (matchInfo) => {
        if (this.match == null) this.matchCallback();        
        this.fullMatch = JSON.parse(matchInfo)
        this.match = new CreateMatchModel(this.fullMatch);
        this.loading = this.loadProvider.dismissLoading(this.loading);
      }
    );
  }

  confirm(){
    let alert = this.alertCtrl.create({
      title: 'Confirme edición',
      message: 'Está seguro de enviar esta actualización?',
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
            this.updateMatch();
          }
        }
      ]
    });
    alert.present();
   }

   updateMatch() {
    this.loading = this.loadProvider.showLoading(this.loading,this.loadingCtrl);
    this.storage.get('access_token').then(
      (resp) => {
        var accessToken = JSON.parse(resp).access_token;
        this.matchService.updateMatch(this.fullMatch.id, this.match, accessToken).subscribe(
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

  private matchCallback(){
    this.matchService.getCurrentMatch()
    .subscribe(
      (match) =>
      {
        this.fullMatch = match;

        this.storage.set("currentMatch", JSON.stringify(this.match));
        
        this.match = new CreateMatchModel(this.fullMatch);
      },
      (err) =>
      {
        this.loading = this.loadProvider.showError(this.loading, this.alertCtrl, 'Error cargando partido');
        console.log(err);
      }
    )
  }

}
