import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Injectable()
export class LoadingProvider {

  loading: Loading;

  constructor(public loadingCtrl: LoadingController) 
  {}

  showLoading(loading : Loading, loadingCtrl : LoadingController) : Loading {
    loading = loadingCtrl.create({
      content: 'Por favor, espere...',
      dismissOnPageChange: true
    });
    loading.present();
    return loading;
  }

  //TODO: Probably switch alert to toast later on
  showSuccess(loading : Loading, alertCtrl : AlertController, text : string) : Loading {
    loading.dismiss();
 
    let alert = alertCtrl.create({
      title: 'Exito',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
    return loading;
  }

  showIdentitySuccess(loading : Loading, navCtrl : NavController, alertCtrl : AlertController, text : string) : Loading {
    loading.dismiss();
 
    let alert = alertCtrl.create({
      title: 'Exito',
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            navCtrl.popToRoot();
          }
      }
      ],
    });
    alert.present();
    return loading;
  }
 
  showError(loading : Loading, alertCtrl : AlertController, text : string) : Loading {
    loading.dismiss();
 
    let alert = alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
    return loading;
  }

  dismissLoading(loading: Loading) : Loading {
    loading.dismiss();
    return loading;
  }

}
