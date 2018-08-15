import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { ProfilePage } from './profile';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
  ],
})
export class ProfilePageModule {}
