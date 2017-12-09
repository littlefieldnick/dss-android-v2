import { Component } from '@angular/core';
import { NavParams, NavController, Events} from 'ionic-angular';
import { Location } from "../../model/location"
import { LocationHierarchy } from "../../model/location-hierarchy";
import {LocationHierarchyLevel} from "../../model/location-hierarchy-level";
import {LocationService} from "../../services/location.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'page-location',
  templateUrl: 'location.component.html'
})
export class LocationComponent {
  locationHierarchyList: LocationHierarchy[]; //Used to hold the selection options, will hold region, district OR village
  region: LocationHierarchy;
  district: LocationHierarchy;
  village: LocationHierarchy;
  location: Location;
  locationList: Location[];
  selected: string;
  displayType: string;
  id: number;

  constructor(private events: Events, public navCtrl: NavController, public params: NavParams,
              private locService: LocationService) {

    locService.getLocations().subscribe(data => {
      this.locationList = data;
    });

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
    this.displayType = null; //form could be displayed for previous field, reset to unselect in case.
  }

  setDisplay(type: string){
    this.displayType = type;

    //Create new item for forms to set fields.
    if(this.displayType == "form"){
      if(this.selected == "region")
        this.region = new LocationHierarchy();
      if(this.selected == "district")
        this.district = new LocationHierarchy();
      else if(this.selected== "village")
        this.village = new LocationHierarchy();
      else if(this.selected == "location")
        this.location = new Location();
    }
  }

  resetFields(){
    this.selected = null;
    this.displayType = null;
  }

  createLevel(){
    if(this.selected == "region") {
      this.region.parent = null;

      let l = new LocationHierarchyLevel();
      l.name = this.selected;
      l.keyIdentifier = 1;

      this.region.level = l;
    } else if(this.selected == "district"){
      this.district.parent = this.region;

      let l = new LocationHierarchyLevel();
      l.name = this.selected;
      l.keyIdentifier = 2;

      this.district.level = l;
    } else {
      this.village.parent = this.district;

      let l = new LocationHierarchyLevel();
      l.name = this.selected;
      l.keyIdentifier = 1;

      this.village.level = l;
    }

    this.resetFields();
  }

  setLocation(loc: Location){
    this.location = loc;
  }

  setLocationHierarchy(l: LocationHierarchy){
      if(this.selected == "region")
        this.region = l;
      if(this.selected == "district")
        this.district = l;
      else if(this.selected== "village")
        this.village = l;
  }

  createLocation(){
    let locations: Location[];
    this.location.locationHierarchy = this.village;
    this.locService.addLocation(this.location).subscribe(data => {
      
    });
  }
}
