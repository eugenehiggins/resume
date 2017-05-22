import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/share';
import { Contact } from "../homepage/contact/contact.model";

@Injectable()
export class FirebaseService {

  constructor(
    private http: Http
  ) { }

  // getContactInfo() {
  //   return this.af.database.object('/resume/contact');
  // }

  setContactInfo(_name,_value) {

    let body : string = JSON.stringify({ field : _name, value: _value });
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('api/contact/', body, options)
      .map(res => res.status);
  }

  getContactInfo():Observable<any> {
    return this.http.get('api/contact')
      .map(res => res.json());
  }

  getSummary():Observable<any> {
    return this.http.get('api/summary')
      .map(res => res.json());
      // .map(res => console.log(res.json().summary))
  }

  setSummary(text) {
    let body : string = JSON.stringify({ summary : text });
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('api/summary/', body, options)
      .map(res => res.status);
  }

  setExperience(obj) {
    let experience = {
      companyName: obj.companyName,
      jobTitle: obj.jobTitle,
      yearsWorked: obj.yearsWorked
    }
    // const companyName = obj.companyName;
    // const jobTitle = obj.jobTitle;
    // const yearsWorked = obj.yearsWorked;
    let body : string = JSON.stringify({ summary : "well hello" });
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('api/experiences', experience, options)
      .map( res => res.status);
  }

  updateExperience(key, field, value){
    let body: string = JSON.stringify({key: key, field: field, value: value})
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.patch(`api/experiences/`, body, options)
      .map( res => res.status);
  }

  getExperiences() {
    return this.http.get('api/experiences')
      .map( res => res.json())
      //.subscribe( x => console.log(x))
  }
}
