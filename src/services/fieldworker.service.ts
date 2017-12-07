import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { Fieldworker } from '../model/fieldworker';

@Injectable()
export class FieldworkerService{
  private fieldworkerUrl = 'http://localhost:7100/fieldworkers';  // URL to web API
  private headers = new Headers({'Content-Type': 'application/json'});
  private errors;
  constructor(private http: Http){

  }

  // Get all customers
  getFieldworkers(): Observable<Fieldworker[]> {
    return this.http.get(this.fieldworkerUrl)
      .map(response => response.json())
  }

  getFieldworkerById(id: number): Observable<Fieldworker> {
    const url = `${this.fieldworkerUrl}/${id}`;
    return this.http.get(url)
      .map(response => response.json());
  }
}
