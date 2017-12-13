import { Component } from '@angular/core';
import { NavParams, NavController, Events, ToastController} from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from "../../model/location"
import { LocationHierarchy } from "../../model/location-hierarchy";
import { LocationHierarchyLevel} from "../../model/location-hierarchy-level";
import { LocationService } from "../../services/location.service";
import {LocationHierarchyService} from "../../services/location-hierarchy.service";

@Component({
  selector: 'page-location',
  templateUrl: 'location.component.html'
})
export class LocationComponent {
  errors: Response = null;
  err: boolean = false;
  errMess: any = null;
  regionForm: FormGroup;
  districtForm: FormGroup;
  villageForm: FormGroup;
  locationForm: FormGroup;

  formSubmitted: boolean = false;
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
              private locService: LocationService, private hierarchyService: LocationHierarchyService,
              formBuilder: FormBuilder, public toastControl: ToastController) {
    this.id = params.get('id');
    events.subscribe('changeTab', (tab, id) => {
      this.id = id;
    });


    //Create Forms for page
    this.regionForm = formBuilder.group({
      regionName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')])],
    });

    this.districtForm = formBuilder.group({
      districtName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')])],
    });

    this.villageForm = formBuilder.group({
      villageName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')])],
    });

    this.locationForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')])],
      extId:['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')])],
      type: ['', Validators.compose([Validators.required])],
      latitude:['', Validators.compose([Validators.required, Validators.pattern('[0-9]*.[0-9]*'),
        Validators.min(-90), Validators.max(90)])],
      longitude:['', Validators.compose([Validators.required, Validators.pattern('[0-9]*.[0-9]*'),
        Validators.min(-180), Validators.max(180)])],
    });
  }


  //Determine selected, load required lists,
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

  //Set the display for the forms. Four different options: region, district, village, location
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

  //Reset the fields
  resetFields(){
    this.selected = null;
    this.displayType = null;
    this.err = true;
    this.errMess = null;
  }


  //Create the heirarchy level
  createLevel(){
    this.formSubmitted = true;

      if(this.selected == "region") {
        if(this.regionForm.valid){
          this.region.parent = null;

          let r = new LocationHierarchyLevel();
          r.name = this.selected;
          r.keyIdentifier = 1;

          this.region.level = r;

          //Add heirarchy, catch error
          this.hierarchyService.addHierarchy(this.region).subscribe(data => {this.region = data},
            (err) => {
              this.presentToast(err._body);
              this.err = true;
            });
          this.formSubmitted = false;
        }

      } else if(this.selected == "district"){
        if(this.districtForm.valid){
          //Set parent
          this.district.parent = this.region;

          //Create and set level.
          let d = new LocationHierarchyLevel();
          d.name = this.selected;
          d.keyIdentifier = 2;

          this.district.level = d;

          //Add heirarchy, catch errors
          this.hierarchyService.addHierarchy(this.district).subscribe(data => {this.district = data},
            (err) => {
              this.presentToast(err._body);
              this.err = true;
            });

          this.formSubmitted = false;
        }

      } else {
        if(this.villageForm.valid){
          //Set parent
          this.village.parent = this.district;

          //Village level
          let v = new LocationHierarchyLevel();
          v.name = this.selected;
          v.keyIdentifier = 3;

          this.village.level = v;

          //Add heirarchy, catch error
          this.hierarchyService.addHierarchy(this.village).subscribe(data => {this.village = data},
            (err) => {
              this.presentToast(err._body);
              this.err = true;
            });

          this.formSubmitted = false;

        }
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

  //Create a location
  createLocation(){
    this.location.locationHierarchy = this.village;
    if(this.locationForm.valid) {
      this.locService.addLocation(this.location).subscribe((data) => {
          this.location = data;
          this.err = false;
        },
        (err) => {
          this.presentToast(err._body);
          this.err = true;
        });

      //Errors: reset form, or create new location
      if (this.err) {
        this.location = new Location();
      } else {
        this.formSubmitted = false;
        this.resetFields();
      }
    }
  }


  //Move on?
  conditionsSatisfied() {
    this.events.publish('conditionsSatisfied', 1, true, "location", this.location);
    this.changeTab();
  }

  //Change the tab
  changeTab(){
    this.navCtrl.parent.select(2, this.location);
  }


  //Present the errors, if any.
  presentToast(message: string) {
    let toast = this.toastControl.create({
      message: "The following error occurred: " + message,
      position: 'top',
      showCloseButton: true,
      cssClass: "toast-error"
    });

    toast.onDidDismiss(() => {
        console.log("Locations Page: " + message);
    });

    toast.present();
  }

}
