import { Injectable } from '@angular/core';
import {Observable}  from "rxjs/Observable";
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Individual} from "../model/individual";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class IndividualService{
  private individualUrl = 'http://localhost:8080/individuals/';  // URL to web API
  private headers = new Headers({'Content-Type': 'application/json'});
  private errors: Observable<string>;
  constructor(private http: Http){

  }

  // Get all customers
  getIndividuals(): Observable<Individual[]> {
    return this.http.get(this.individualUrl)
      .map(response => response.json())
  }

  getIndividualById(id: number): Observable<Individual> {
    const url = `${this.individualUrl}/${id}`;
    return this.http.get(url)
      .map(response => response.json());
  }

  addIndividual(individual: Individual): Observable<Individual>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.individualUrl, JSON.stringify(individual), options)
      .map( response => response.json());

  }

  removeIndividual(id: number): Observable<void>{
    const url = `${this.individualUrl}/${id}`;
    return this.http.delete(url,{headers : this.headers})
      .map(response => null)
  }
}
