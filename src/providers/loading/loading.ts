import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Injectable()
export class LoadingProvider {

  loading: Loading;

  constructor(public loadingCtrl: LoadingController) 
  {}

  showLoading(loading : Loading, loadingCtrl : LoadingController) {
    loading = loadingCtrl.create({
      content: 'Por favor, espere...',
      dismissOnPageChange: true
    });
    loading.present();
  }

  //TODO: Probably switch alert to toast later on
  showSuccess(loading : Loading, alertCtrl : AlertController, text : string) {
    loading.dismiss();
 
    let alert = alertCtrl.create({
      title: 'Exito',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
 
  showError(loading : Loading, alertCtrl : AlertController, text : string) {
    loading.dismiss();
 
    let alert = alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  dismissLoading(loading: Loading){
    loading.dismiss();
  }

}
