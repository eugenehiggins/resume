import { Component, Input, OnInit } from '@angular/core';
import { FieldBaseModel } from "./field-base.model";
import { Form, FormArray, FormGroup } from "@angular/forms";
import { ExperienceControlService } from "../../services/experience-control.service";
import { FirebaseService } from "../../services/firebase.service";

@Component({
  selector: 'experiences-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  // @Input() fields: FieldBaseModel<any>[] = [];
  fields: FieldBaseModel<any>[] = [];
  form: FormGroup;
  payLoad = '';
  experiences: FormArray;

  constructor(
    private ecs: ExperienceControlService,
    private firebaseService: FirebaseService
  ) {  }

  ngOnInit() {
    // TODO: make getting fields async
    this.fields = this.ecs.buildExperience();
    this.ecs.buildExperienceAsync()
      .subscribe( data => {
        this.experiences = data;
        this.form.setControl('experiences', this.experiences);
      });
    // this.firebaseService.getExperiences()
    //   .subscribe( data => {
    //     this.experiences = data;
    //   })

    //this.form = this.ecs.toFormGroup(this.fields);
    //console.log(this.form);

  }

  saveExperience(event) {
    //this.payLoad = JSON.stringify(this.form.value);
    this.firebaseService.setExperience(this.form.value)
      .subscribe( x => console.log('experience saved', x))
  }


}
