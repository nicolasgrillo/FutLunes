import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMatchPage } from './edit-match';

@NgModule({
  declarations: [
    EditMatchPage,
  ],
  imports: [
    IonicPageModule.forChild(EditMatchPage),
  ],
})
export class EditMatchPageModule {}
