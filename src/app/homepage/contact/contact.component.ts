import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { FirebaseObjectObservable } from "angularfire2";
import { Observable } from "rxjs/Observable";
import { Contact } from "./contact.model";
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactInfo: Observable<Contact>;
  contactForm: FormGroup;

  constructor(
    private firebase:FirebaseService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm(){
    this.contactForm = this.fb.group ({
      address1: ['', Validators.required ]
    })
  }

  ngOnInit() {
    this.firebase.getContactInfo()
      .subscribe( contact => {
          this.contactInfo =  contact;
          this.contactForm.setValue({
            address1: contact.address1
          })
        });

  }


}
