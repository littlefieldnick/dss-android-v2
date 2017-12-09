import { Injectable } from '@angular/core';
import {Observable}  from "rxjs/Observable";
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {LocationHierarchy} from "../model/location-hierarchy";

@Injectable()
export class LocationHierarchyService{
  private hierarchyUrl = 'http://localhost:8080/hierarchies/';  // URL to web API
  private headers = new Headers({'Content-Type': 'application/json'});
  private errors: Observable<string>;
  constructor(private http: Http){
  }

  // Get all customers
  getLocationHierarchies(): Observable<LocationHierarchy[]> {
    return this.http.get(this.hierarchyUrl)
      .map(response => response.json())
  }

  getHierarchyById(id: number): Observable<LocationHierarchy> {
    const url = `${this.hierarchyUrl}/${id}`;
    return this.http.get(url)
      .map(response => response.json());
  }

  addHierarchy(hierarchy: LocationHierarchy): Observable<LocationHierarchy>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.hierarchyUrl, JSON.stringify(hierarchy), options)
      .map( response => response.json());

  }

  removeHierarchy(id: number): Observable<void>{
    const url = `${this.hierarchyUrl}/${id}`;
    return this.http.delete(url,{headers : this.headers})
      .map(response => null)
  }
}
