import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { FirebaseObjectObservable } from "angularfire2";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactInfo: Observable<any>;

  constructor(private firebase:FirebaseService) { }

  ngOnInit() {
    console.log('howdy');
    this.firebase.getContactInfo()
      .subscribe( x => console.log(x));
  }


}
