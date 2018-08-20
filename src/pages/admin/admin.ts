import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MatchPage, CreateMatchPage, EditMatchPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  createMatchPage: any;
  editMatchPage: any;

  matchPage: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.createMatchPage = CreateMatchPage;
    this.editMatchPage = EditMatchPage;
  }

}
