import { Injectable } from '@angular/core';
import {Observable}  from "rxjs/Observable";
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {SocialGroup} from "../model/social-group";

@Injectable()
export class SocialGroupService {
  private socialUrl = 'http://localhost:8080/social/';  // URL to web API
  private headers = new Headers({'Content-Type': 'application/json'});
  private errors: Observable<string>;

  constructor(private http: Http) {
  }

  // Get all customers
  getSocialGroups(): Observable<SocialGroup[]> {
    return this.http.get(this.socialUrl)
      .map(response => response.json())
  }

  getGroupById(id: number): Observable<SocialGroup> {
    const url = `${this.socialUrl}/${id}`;
    return this.http.get(url)
      .map(response => response.json());
  }

  addGroup(group: SocialGroup): Observable<SocialGroup>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.socialUrl, JSON.stringify(group), options)
      .map( response => response.json());

  }

  removeGroup(id: number): Observable<void>{
    const url = `${this.socialUrl}/${id}`;
    return this.http.delete(url,{headers : this.headers})
      .map(response => null)
  }
}
