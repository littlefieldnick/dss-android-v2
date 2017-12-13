import { Component } from '@angular/core';
import {NavParams, NavController, Events, DateTime, ToastController} from 'ionic-angular';
import {SocialGroup} from "../../model/social-group";
import {Location } from "../../model/location";
import {IndividualService} from "../../services/individual.service";
import {Individual} from "../../model/individual";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'page-individual',
  templateUrl: 'individual.component.html'
})
export class IndividualComponent {
  err: boolean = false;
  individualForm: FormGroup;
  individual: Individual = new Individual();
  individualsList: Individual[];
  location: Location;
  socialGroup: SocialGroup;
  selectedIndividuals: Individual[] = [];
  displayType: string;
  id: number;

  constructor(private events: Events, public navCtrl: NavController, public params: NavParams, public individualService: IndividualService,
              formBuilder: FormBuilder, public toastControl: ToastController) {
    this.id = this.params.get('id');
    events.subscribe('changeTab', (tab, id) => {
      this.id = id;
    });

    //Forms
    this.individualForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      middleName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*')])],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      extId:['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')])],
      gender: ['', Validators.compose([Validators.required, Validators.pattern('[MF]')])],
      dob:  [''],
      age: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.min(0), Validators.max(105)])],
    });



    this.location = this.params.data.location;
    this.socialGroup = this.params.data.socialGroup;

  }

  //Control display of forms and lists
  setDisplay(type: string){
    this.displayType = type;
    if(this.displayType == "list")
      this.individualService.getIndividuals().subscribe(data => this.individualsList = data);
  }

  //Create a new individual
  createIndividual(){
    if(this.individualForm.valid){
      this.individualService.addIndividual(this.individual).subscribe(data =>{
        this.individual = data;},
        (err) => {
          this.presentToast(err._body);
          this.err = true;
        });

      if(this.err){
        this.individual = new Individual();
      } else {
        this.selectedIndividuals.push(this.individual);
        this.individual = new Individual();
        this.individualForm.reset();
        this.displayType = null;
      }
    }


  }

  //Select from a list and set
  setIndividual(individual: Individual){
    this.individual = individual;
    this.selectedIndividuals.push(this.individual);
    this.individual = new Individual();
    this.displayType = null;
  }

  //Check requirements for moving on in the form
  conditionsSatisfied() {
    this.events.publish('conditionsSatisfied', 3, true, "individuals", this.selectedIndividuals);
    this.changeTab();
  }

  //change tab
  changeTab(){
    this.navCtrl.parent.select(4);
  }

  //display error
  presentToast(message: string) {
    let toast = this.toastControl.create({
      message: "The following error occurred: " + message,
      position: 'top',
      showCloseButton: true,
      cssClass: "toast-error"
    });

    //Print message to console
    toast.onDidDismiss(() => {
      console.log("Individuals Page Error: " + message);
    });

    //present display
    toast.present();
  }
}
