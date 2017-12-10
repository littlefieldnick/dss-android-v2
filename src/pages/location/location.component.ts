import { Component } from '@angular/core';
import { NavParams, NavController, Events} from 'ionic-angular';
import { Location } from "../../model/location"
import { LocationHierarchy } from "../../model/location-hierarchy";
import { LocationHierarchyLevel} from "../../model/location-hierarchy-level";
import { LocationService } from "../../services/location.service";
import {Observable} from "rxjs/Observable";
import {LocationHierarchyService} from "../../services/location-hierarchy.service";

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
              private locService: LocationService, private hierarchyService: LocationHierarchyService) {
    this.id = params.get('id');
    events.subscribe('changeTab', (tab, id) => {
      this.id = id;
    });
  }

  setSelected(selectedButton: string){
    this.selected = selectedButton;
    if(this.selected == "location"){
      this.locService.getLocations().subscribe(data => {
        if (data != null) {
          this.locationList = data.filter(l => l.locationHierarchy.level = this.village.level);
        }

      });
    } else {
      this.hierarchyService.getLocationHierarchies().subscribe(data => {
        if (data != null) {
          this.locationHierarchyList = data.filter(l =>
            l.level.name == this.selected);
        }
      });
    }
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

      let r = new LocationHierarchyLevel();
      r.name = this.selected;
      r.keyIdentifier = 1;

      this.region.level = r;

      this.hierarchyService.addHierarchy(this.region).subscribe(data => {this.region = data})
    } else if(this.selected == "district"){
      this.district.parent = this.region;

      let d = new LocationHierarchyLevel();
      d.name = this.selected;
      d.keyIdentifier = 2;

      this.district.level = d;
      this.hierarchyService.addHierarchy(this.district).subscribe(data => {this.district = data})
    } else {
      this.village.parent = this.district;

      let v = new LocationHierarchyLevel();
      v.name = this.selected;
      v.keyIdentifier = 3;

      this.village.level = v;

      this.hierarchyService.addHierarchy(this.village).subscribe(data => {this.village = data})
    }

    this.resetFields();
  }

  setLocation(loc: Location){
    this.location = loc;
    this.resetFields();
  }

  setLocationHierarchy(l: LocationHierarchy){
      if(this.selected == "region")
        this.region = l;
      if(this.selected == "district")
        this.district = l;
      else if(this.selected== "village")
        this.village = l;

    this.resetFields();
  }

  createLocation(){
    this.location.locationHierarchy = this.village;
    this.locService.addLocation(this.location).subscribe(data => {
      this.location;
    });

    this.resetFields();

  }

  conditionsSatisfied() {
    this.events.publish('conditionsSatisfied', 1, true, "location", this.location);
    this.changeTab();
  }

  changeTab(){
    this.navCtrl.parent.select(2, this.location);
  }
}
