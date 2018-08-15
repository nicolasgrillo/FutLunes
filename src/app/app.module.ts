import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { FutLunesApp } from './app.component';
import { HomePage, LoginPage, AdminPage, ProfilePage, MatchPage, RegisterPage} from '../pages/pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider, PlayerServiceProvider, MatchServiceProvider } from '../providers/providers';
import { LoginPageModule, HomePageModule, AdminPageModule, ProfilePageModule, MatchPageModule, RegisterPageModule } from '../pages/modules';

@NgModule({
  declarations: [
    FutLunesApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(FutLunesApp),
    LoginPageModule,
    HomePageModule,
    AdminPageModule,
    ProfilePageModule,
    MatchPageModule,
    RegisterPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FutLunesApp,
    HomePage,
    LoginPage,
    AdminPage,
    ProfilePage,
    MatchPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    PlayerServiceProvider,
    MatchServiceProvider
  ]
})
export class AppModule {}
