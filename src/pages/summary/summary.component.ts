import { Component } from '@angular/core';
import {NavParams, NavController, Events, ToastController} from 'ionic-angular';
import {SocialGroup} from "../../model/social-group";
import {Location } from "../../model/location";
import {SocialGroupService} from "../../services/social-group.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Fieldworker} from "../../model/fieldworker";
import {Individual} from "../../model/individual";
import {BaselineComponent} from "../baseline/baseline.component";

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.component.html'
})

export class SummaryComponent{
  fieldworker: Fieldworker;
  location: Location;
  social: SocialGroup;
  individuals: Individual[];
  id: number;

  constructor(private events: Events, public navCtrl: NavController, public params: NavParams) {
    this.id = this.params.get('id');
    events.subscribe('changeTab', (tab, id) => {
      this.id = id;
    });


    this.location = this.params.data.location;
    this.social = this.params.data.socialGroup;
    this.individuals = this.params.data.individuals;
  }

  conditionsSatisfied() {
    this.events.publish('reset');
  }

  changeTab(){
    this.navCtrl.parent.select(1);
  }

}
