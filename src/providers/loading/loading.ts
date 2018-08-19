import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingProvider {

  loading: Loading;

  constructor(public loadingCtrl: LoadingController) 
  {}

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor, espere...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
