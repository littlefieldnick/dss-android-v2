import { Injectable } from '@angular/core';
import {Observable}  from "rxjs/Observable";
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Relationship} from "../model/relationship";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RelationshipService{
  private relationUrl = 'http://localhost:8080/relationships/';  // URL to web API
  private headers = new Headers({'Content-Type': 'application/json'});
  private errors: Observable<string>;
  constructor(private http: Http){

  }

  // Get all customers
  getRelationship(): Observable<Relationship[]> {
    return this.http.get(this.relationUrl)
      .map(response => response.json())
  }

  getRelationshipById(id: number): Observable<Relationship> {
    const url = `${this.relationUrl}/${id}`;
    return this.http.get(url)
      .map(response => response.json());
  }

  addRelationship(relationship: Relationship): Observable<Relationship>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.relationUrl, JSON.stringify(relationship), options)
      .map( response => response.json());

  }

  removeRelationship(id: number): Observable<void>{
    const url = `${this.relationUrl}/${id}`;
    return this.http.delete(url,{headers : this.headers})
      .map(response => null)
  }
}
