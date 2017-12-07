import { ViewChild, Component } from '@angular/core';
import {BaselineComponent} from "../baseline/baseline.component";
import {Events, Tabs} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild(Tabs) tabs: Tabs;

  tab1Root = BaselineComponent;

  locationRequirement = 0;
  socialGroupRequirement = 1;
  individualRequirement = 2;
  membershipRequirement = 3;
  relationshipRequirement = 4;

  requirements = [false, false, false, false, false];

  constructor(events: Events) {
    events.subscribe('conditionsSatisfied', (requirement, value ) => {
      this.requirements[requirement] = value;
    });
  }
}