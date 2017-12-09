import { Component } from '@angular/core';
import { NavParams, NavController, Events} from 'ionic-angular';
import { Fieldworker } from "../../model/fieldworker"
import {FieldworkerService} from "../../services/fieldworker.service";

@Component({
  selector: 'page-baseline',
  templateUrl: 'baseline.component.html'
})
export class BaselineComponent {

  collectionDate: Date;
  fieldworker: Fieldworker;
  fieldworkers: Fieldworker[];
  selected: string;
  id: number;

  constructor(private events: Events, public navCtrl: NavController, public params: NavParams, fwService: FieldworkerService) {
    fwService.getFieldworkers().subscribe(data => {
      this.fieldworkers = data;
    })

    this.id = params.get('id');
    events.subscribe('changeTab', (tab, id) => {
      this.id = id;
    });
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
    this.closeFieldworkerList();
  }

  closeFieldworkerList(){
    this.selected = null;
  }
}
