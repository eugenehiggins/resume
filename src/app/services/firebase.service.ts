import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { AngularFire, FirebaseObjectObservable } from "angularfire2";
import { Observable } from "rxjs/Observable";
import { Contact } from "../homepage/contact/contact.model";

@Injectable()
export class FirebaseService {

  constructor(
    private af: AngularFire,
    private http: Http
  ) { }

  // getContactInfo() {
  //   return this.af.database.object('/resume/contact');
  // }

  getContactInfo():Observable<any> {
    return this.http.get('api/contact')
      .map(res => res.json());
  }
}
