import { Injectable } from '@angular/core';
import {Observable}  from "rxjs/Observable";
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Location} from "../model/location";

@Injectable()
export class LocationService{
  private locationUrl = 'http://localhost:8080/locations/';  // URL to web API
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http){

  }

  // Get all customers
  getLocations(): Observable<Location[]> {
    return this.http.get(this.locationUrl)
      .map(response => response.json(), err => err.json())
  }

  getLocationById(id: number): Observable<Location> {
    const url = `${this.locationUrl}/${id}`;
    return this.http.get(url)
      .map(response => response.json(), err => err.json());
  }

  addLocation(location: Location): Observable<Location>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.locationUrl, JSON.stringify(location), options)
      .map( response => response.json());
  }

  removeLocation(id: number): Observable<void>{
    const url = `${this.locationUrl}/${id}`;
    return this.http.delete(url,{headers : this.headers})
      .map(response => null)
  }

}
