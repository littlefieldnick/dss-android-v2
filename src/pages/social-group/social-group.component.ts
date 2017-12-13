import { Component } from '@angular/core';
import {NavParams, NavController, Events, ToastController} from 'ionic-angular';
import {SocialGroup} from "../../model/social-group";
import {Location } from "../../model/location";
import {SocialGroupService} from "../../services/social-group.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'page-group',
  templateUrl: 'social-group.component.html'
})
export class SocialGroupComponent {
  err: boolean = false;
  formSubmitted: boolean = false;
  groupForm: FormGroup;
  socialGroup: SocialGroup = new SocialGroup();
  socialGroupsList: SocialGroup[];
  location: Location;
  displayType: string;
  id: number;

  constructor(private events: Events, public navCtrl: NavController, public params: NavParams, public sgService: SocialGroupService,
            formBuilder: FormBuilder, public toastControl: ToastController) {
    this.id = this.params.get('id');
    events.subscribe('changeTab', (tab, id) => {
      this.id = id;
    });


    this.location = this.params.data.location;

    this.groupForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z 0-9]*')])],
      extId:['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')])],
      type: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
    });
  }


  //Determine display
  setDisplay(type: string){
    this.displayType = type;

    if(this.displayType == "list") {
      this.sgService.getSocialGroups().subscribe(data => this.socialGroupsList = data);
    }
  }

  //Create a new form
  createSocialGroup(){
    if(this.groupForm.valid){
      this.formSubmitted = true;
      this.socialGroup.location = this.location;
      this.sgService.addGroup(this.socialGroup).subscribe(data =>{
        this.socialGroup = data; this.err= false;},
        (err) => {
          this.presentToast(err._body);
          this.err = true;
        });

      if (this.err) {
        this.socialGroup = new SocialGroup();
      } else {
        this.formSubmitted = false;
        this.displayType = null;
      }
    }
  }

  //Set social group
  setSocialGroup(sg: SocialGroup){
    this.socialGroup = sg;
    this.displayType = null;
  }

  //Check if can move on
  conditionsSatisfied() {
    this.events.publish('conditionsSatisfied', 2, true, "socialGroup", this.socialGroup);
    this.changeTab();
  }

  //Change tab
  changeTab(){
    this.navCtrl.parent.select(3);
  }


  //Display errors.
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
