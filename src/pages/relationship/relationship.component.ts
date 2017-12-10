import { Component } from '@angular/core';
import { NavParams, NavController, Events} from 'ionic-angular';
import {SocialGroup} from "../../model/social-group";
import {Location } from "../../model/location";
import {Individual} from "../../model/individual";
import {Relationship} from "../../model/relationship";
import {RelationshipService} from "../../services/relationship.service";

@Component({
  selector: 'page-relationship',
  templateUrl: 'relationship.component.html'
})
export class RelationshipComponent {
  relationshipTypes = ["self", "spouse", "sonOrDaughter", "brotherOrSister", "parent", "grandchild", "notRelated",
    "otherRelative", "unknownRelationshop"];
  individualsList: Individual[];
  relationshipList: Relationship[];
  relationship: Relationship = new Relationship();
  location: Location;
  socialGroup: SocialGroup;
  selectedRelationships: Relationship[] = [];
  pageParams: any;
  displayType: string;
  id: number;

  constructor(private events: Events, public navCtrl: NavController, public params: NavParams, public relationshipService: RelationshipService) {
    this.id = this.params.get('id');
    this.pageParams = this.params.get('params');
    events.subscribe('changeTab', (tab, id) => {
      this.id = id;
    });

    this.location = this.params.data.location;
    this.socialGroup = this.params.data.socialGroup;
    this.individualsList = this.params.data.individuals;

    console.log(this.individualsList);

  }

  setDisplay(type: string){
    this.displayType = type;
    if(this.displayType == "list")
      this.relationshipService.getRelationship().subscribe(data => this.relationshipList);
  }

  createRelationship(){
    this.relationshipService.addRelationship(this.relationship).subscribe(data =>{
      this.relationship = data;
    });

    this.selectedRelationships.push(this.relationship);
    this.displayType = null;
  }

  setRelationship(relationship: Relationship){
    this.relationship = relationship;
    this.selectedRelationships.push(this.relationship);
    this.relationship = new Relationship();
    this.displayType = null;
  }
  conditionsSatisfied() {
    this.events.publish('conditionsSatisfied', 4, true, "relationships", this.selectedRelationships);
    this.changeTab();
  }

  changeTab(){
    this.navCtrl.parent.select();
  }
}
