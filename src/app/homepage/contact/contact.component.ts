import { Component, ElementRef, OnInit } from '@angular/core';
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
  // isReadOnly: boolean = true;

  constructor(
    private firebaseService:FirebaseService,
    private fb: FormBuilder,
    private el: ElementRef
  ) {
    this.createForm();
  }

  onClick(event) {
    // event.target.setAttribute('class', 'hiddenElement');
    // let labelFor = event.target.getAttribute('for');
    // let control = this.contactForm.get(labelFor);
    // control.setAttribute('class', 'shownElement');
  }

  onBlur(event) {
    let el = this.el.nativeElement = event.target;
    let name = el.id;
    let value = el.value;
    this.firebaseService.setContactInfo(name,value)
      .subscribe(
        status => {
          if (status === 200) {
            console.log('howdy');
          }
        }
      );
  }


  createForm(){
    this.contactForm = this.fb.group ({
      fullName: ['', Validators.required],
      address1: ['', Validators.required ],
      address2: ['', Validators.required ],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.firebaseService.getContactInfo()
      .subscribe( contact => {
          this.contactInfo =  contact;

          this.contactForm.setValue({
            fullName: contact.fullName,
            address1: contact.address1,
            address2: contact.address2,
            city: contact.city,
            state: contact.state,
            zip: contact.zip
          })
        });

  }




}
