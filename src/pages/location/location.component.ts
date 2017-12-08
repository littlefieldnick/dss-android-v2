import { Component } from '@angular/core';
import { NavParams, NavController, Events} from 'ionic-angular';
import { Location } from "../../model/location"
import { LocationHierarchy } from "../../model/location-hierarchy";

@Component({
  selector: 'page-location',
  templateUrl: 'location.component.html'
})
export class LocationComponent {
  locationHierarchy: LocationHierarchy[]; //Used to hold the selection options, will hold region, district OR village
  region: LocationHierarchy;
  district: LocationHierarchy;
  village: LocationHierarchy;
  location: Location;
  selected: string;
  id: number;

  constructor(private events: Events, public navCtrl: NavController, public params: NavParams) {
    this.id = params.get('id');
    events.subscribe('changeTab', (tab, id) => {
      this.id = id;
    });
  }

  conditionsSatisfied() {
    this.events.publish('conditionsSatisfied', 1, true);
    this.changeTab();
  }

  changeTab(){
    this.navCtrl.parent.select(2);
  }

  setSelected(selectedButton: string){
    this.selected = selectedButton;
  }

}
