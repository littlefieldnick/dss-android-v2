import { ViewChild, Component } from '@angular/core';
import {BaselineComponent} from "../baseline/baseline.component";
import {Events, NavParams, Tabs} from "ionic-angular";
import {LocationComponent} from "../location/location.component";
import {SocialGroupComponent} from "../social-group/social-group.component";
import {IndividualComponent} from "../individual/individual.component";
import {RelationshipComponent} from "../relationship/relationship.component";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild(Tabs) tabs: Tabs;

  tab1Root = BaselineComponent;
  tab2Root = LocationComponent;
  tab3Root = SocialGroupComponent;
  tab4Root = IndividualComponent;
  tab5Root = RelationshipComponent;

  locationRequirement = 0;
  socialGroupRequirement = 1;
  individualRequirement = 2;
  relationshipRequirement = 3;


  requirements = [false, false, false, false, false];

  pageParams = {
    "fieldworker": "",
    "location": "",
    "socialGroup": "",
    "individuals": "",
    "relationships": ""
  };

  constructor(events: Events, public navParams: NavParams) {
    events.subscribe('conditionsSatisfied', (requirement, value, passField, fieldValue) => {
      this.requirements[requirement] = value;
      this.pageParams[passField] = fieldValue;
    });
  }
}
