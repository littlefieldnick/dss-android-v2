import { Component } from '@angular/core';
import {Events, Platform} from 'ionic-angular';

import {TabsPage} from "../pages/tabs/tabs";
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, private events: Events) {
    platform.ready().then(() => {

    });


  }
}

