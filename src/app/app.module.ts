import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { FutLunesApp } from './app.component';
import { HomePage, LoginPage, AdminPage, ProfilePage, MatchPage, RegisterPage, CreateMatchPage} from '../pages/pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider, PlayerServiceProvider, MatchServiceProvider, LoadingProvider } from '../providers/providers';
import { LoginPageModule, HomePageModule, AdminPageModule, ProfilePageModule, MatchPageModule, RegisterPageModule, CreateMatchPageModule } from '../pages/modules';

@NgModule({
  declarations: [
    FutLunesApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(FutLunesApp),
    IonicStorageModule.forRoot(),
    LoginPageModule,
    HomePageModule,
    AdminPageModule,
    ProfilePageModule,
    MatchPageModule,
    RegisterPageModule,
    CreateMatchPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FutLunesApp,
    HomePage,
    LoginPage,
    AdminPage,
    ProfilePage,
    MatchPage,
    RegisterPage,
    CreateMatchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    PlayerServiceProvider,
    MatchServiceProvider,
    LoadingProvider
  ]
})
export class AppModule {}
