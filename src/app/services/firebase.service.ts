import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { AngularFire, FirebaseObjectObservable } from "angularfire2";

@Injectable()
export class FirebaseService {

  constructor(
    private af: AngularFire,
    private http: Http
  ) { }

  // getContactInfo() {
  //   return this.af.database.object('/resume/contact');
  // }

  getContactInfo() {
    return this.http.get('api/contact')
      .map(res => res.json());
  }
}
