import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FirebaseService } from "../../services/firebase.service";

@Component({
  selector: 'experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  expForm: FormGroup;

  constructor(
    private firebaseService:FirebaseService,
    private fb: FormBuilder,
    private el: ElementRef
  ) {

  }

  createForm(){
    this.expForm = this.fb.group ({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.createForm();

    this.firebaseService.getSummary()
      .subscribe( data => {
        this.expForm.setValue({
          summary: data.summary
        })
      });
  }

}
