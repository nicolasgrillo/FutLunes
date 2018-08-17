import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MatchPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  matchPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.matchPage = MatchPage;
  }

}
