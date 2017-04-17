import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FirebaseService } from "../../services/firebase.service";
import { ExpBaseModel } from "./exp.base.model";
import { ExperienceControlService } from "../../services/experience-control.service";

@Component({
  selector: 'experiences-form',
  templateUrl: './experiences-form.component.html',
  styleUrls: ['./experiences-form.component.scss']
})
export class ExperiencesFormComponent implements OnInit {

  @Input() experiences: ExpBaseModel<any>[] = [];
  experienceForm: FormGroup;

  constructor(
    private firebaseService:FirebaseService,
    private fb: FormBuilder,
    private el: ElementRef,
    private ecs: ExperienceControlService
  ) {

  }

  createForm(){
    this.experienceForm = this.fb.group ({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.experienceForm = this.ecs.toFormGroup(this.experiences);

    // this.firebaseService.getSummary()
    //   .subscribe( data => {
    //     this.experienceForm.setValue({
    //       summary: data.summary
    //     })
    //   });
  }

}
