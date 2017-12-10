import { Component } from '@angular/core';
import { NavParams, NavController, Events} from 'ionic-angular';
import {SocialGroup} from "../../model/social-group";
import {Location } from "../../model/location";
import {SocialGroupService} from "../../services/social-group.service";

@Component({
  selector: 'page-group',
  templateUrl: 'social-group.component.html'
})
export class SocialGroupComponent {
  socialGroup: SocialGroup = new SocialGroup();
  socialGroupsList: SocialGroup[];
  location: Location;
  pageParams: any;
  displayType: string;
  id: number;

  constructor(private events: Events, public navCtrl: NavController, public params: NavParams, public sgService: SocialGroupService) {
    this.id = this.params.get('id');
    this.pageParams = this.params.get('params');
    events.subscribe('changeTab', (tab, id) => {
      this.id = id;
    });

    this.location = this.params.data["location"];

    this.sgService.getSocialGroups().subscribe(data => this.socialGroupsList);
  }

  setDisplay(type: string){
    this.displayType = type;
  }

  createSocialGroup(){
    this.sgService.addGroup(this.socialGroup).subscribe(data =>{
      this.socialGroup = data;
    });

    this.displayType = null;
  }

  setSocialGroup(sg: SocialGroup){
    this.socialGroup = sg;
    this.displayType = null;
  }
  conditionsSatisfied() {
    this.events.publish('conditionsSatisfied', 2, true, "socialGroup", this.socialGroup);
    this.changeTab();
  }

  changeTab(){
    this.navCtrl.parent.select(3);
  }
}
