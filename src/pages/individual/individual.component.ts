import { Component } from '@angular/core';
import { NavParams, NavController, Events, DateTime} from 'ionic-angular';
import {SocialGroup} from "../../model/social-group";
import {Location } from "../../model/location";
import {IndividualService} from "../../services/individual.service";
import {Individual} from "../../model/individual";

@Component({
  selector: 'page-individual',
  templateUrl: 'individual.component.html'
})
export class IndividualComponent {
  individual: Individual = new Individual();
  individualsList: Individual[];
  location: Location;
  socialGroup: SocialGroup;
  selectedIndividuals: Individual[] = [];
  displayType: string;
  id: number;

  constructor(private events: Events, public navCtrl: NavController, public params: NavParams, public individualService: IndividualService) {
    this.id = this.params.get('id');
    events.subscribe('changeTab', (tab, id) => {
      this.id = id;
    });


    this.location = this.params.data.location;
    this.socialGroup = this.params.data.socialGroup;

  }

  setDisplay(type: string){
    this.displayType = type;
    if(this.displayType == "list")
      this.individualService.getIndividuals().subscribe(data => this.individualsList = data);
  }

  createIndividual(){
    console.log(this.individual);
    this.individualService.addIndividual(this.individual).subscribe(data =>{
      this.individual = data;
    });

    this.selectedIndividuals.push(this.individual);
    this.individual = new Individual();
    this.displayType = null;
  }

  setIndividual(individual: Individual){
    this.individual = individual;
    this.selectedIndividuals.push(this.individual);
    this.individual = new Individual();
    this.displayType = null;
  }
  conditionsSatisfied() {
    this.events.publish('conditionsSatisfied', 3, true, "individuals", this.selectedIndividuals);
    this.changeTab();
  }

  changeTab(){
    this.navCtrl.parent.select(4);
  }
}
