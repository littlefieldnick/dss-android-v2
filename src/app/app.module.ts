import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ServiceModule} from "../services/service.module";
import {BaselineComponent} from "../pages/baseline/baseline.component";
import {FieldworkerService} from "../services/fieldworker.service";
import {HttpModule} from "@angular/http";
import {LocationComponent} from "../pages/location/location.component";
import {LocationService} from "../services/location.service";
import {LocationHierarchyService} from "../services/location-hierarchy.service";
import {SocialGroupComponent} from "../pages/social-group/social-group.component";
import {SocialGroupService} from "../services/social-group.service";
import {IndividualService} from "../services/individual.service";
import {IndividualComponent} from "../pages/individual/individual.component";
import {RelationshipService} from "../services/relationship.service";
import {RelationshipComponent} from "../pages/relationship/relationship.component";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    BaselineComponent,
    LocationComponent,
    SocialGroupComponent,
    IndividualComponent,
    RelationshipComponent
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
    BaselineComponent,
    LocationComponent,
    SocialGroupComponent,
    IndividualComponent,
    RelationshipComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FieldworkerService,
    LocationService,
    LocationHierarchyService,
    SocialGroupService,
    IndividualService,
    RelationshipService,
    ServiceModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
