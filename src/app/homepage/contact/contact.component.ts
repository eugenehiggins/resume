import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { FirebaseObjectObservable } from "angularfire2";
import { Observable } from "rxjs/Observable";
import { Contact } from "./contact.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactInfo: Contact;
  contactForm: FormGroup;
  isReadOnly: boolean = true;

  constructor(
    private firebase:FirebaseService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  onClick(event) {
    event.target.setAttribute('class', 'hiddenElement');
    let labelFor = event.target.getAttribute('for');
    let control = this.contactForm.get(labelFor);
    // control.setAttribute('class', 'shownElement');
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
          console.log(contact.address1)
          this.contactForm.setValue({
            address1: contact.address1
          })
        });

  }


}
