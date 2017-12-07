import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ServiceModule} from "../services/service.module";
import {BaselineComponent} from "../pages/baseline/baseline.component";
import {PagesModule} from "../pages/pages.module";
import {FieldworkerService} from "../services/fieldworker.service";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    BaselineComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    BaselineComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PagesModule,
    FieldworkerService,
    ServiceModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
