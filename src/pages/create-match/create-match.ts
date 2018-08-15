import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CreateMatchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-match',
  templateUrl: 'create-match.html',
})
export class CreateMatchPage {

  match = {
    locationTitle: '',
    mapUrl: '',
    playerLimit: 0,
    matchDate: Date.now()
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) { }

  createMatch() {
    console.log("should create match here")
  }
}
