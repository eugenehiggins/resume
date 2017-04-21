import { Component, Input, OnInit } from '@angular/core';
import { FieldBaseModel } from "./field-base.model";
import { FormGroup } from "@angular/forms";
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
  experiences = [];

  constructor(
    private ecs: ExperienceControlService,
    private firebaseService: FirebaseService
  ) {  }

  ngOnInit() {
    // TODO: make getting fields async
    this.fields = this.ecs.buildExperience();
    // this.ecs.getExperiences();
    this.firebaseService.getExperiences()
      .subscribe( data => {
        this.experiences = data;
        console.log(this.experiences);
      })

    this.form = this.ecs.toFormGroup(this.fields);

  }

  saveExperience(event) {
    //this.payLoad = JSON.stringify(this.form.value);
    this.firebaseService.setExperience(this.form.value)
      .subscribe( x => console.log('experience saved', x))
  }


}
