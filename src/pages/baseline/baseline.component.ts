import { Component } from '@angular/core';
import { NavParams, NavController, Events} from 'ionic-angular';
import { Fieldworker } from "../../model/fieldworker"
import {FieldworkerService} from "../../services/fieldworker.service";

@Component({
  selector: 'page-baseline',
  templateUrl: 'baseline.component.html'
})
export class BaselineComponent {

  fields: Array<String> = ["collectionDate", "fieldworker"];

  collectionDate: string;
  fieldworker: Fieldworker;
  fieldworkers: Fieldworker[];
  selected: string;

  constructor(private events: Events, public navCtrl: NavController, public params: NavParams, fwService: FieldworkerService) {
    fwService.getFieldworkers().subscribe(data => {
      this.fieldworkers=data;
    })
  }

  conditionsSatisfied() {
    this.events.publish('conditionsSatisfied', 0, true);
    this.changeTab();
  }

  changeTab(){
    this.navCtrl.parent.select(1);
  }

  setSelected(selectedButton: string){
    this.selected = selectedButton;
  }

  setFieldworker(fieldworker: Fieldworker){
    this.fieldworker = fieldworker;
  }

  submitDate(month, day, year){
    this.collectionDate= (month + "/" + day + "/" + year).toString();
  }
}
