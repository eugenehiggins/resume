import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FieldBaseModel } from "../homepage/experiences/field-base.model";
import { FieldTextboxModel } from "../homepage/experiences/field-textbox.model";
import { FieldDropdownModel } from "../homepage/experiences/field-dropdown.model";
import { FirebaseService } from "./firebase.service";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ExperienceControlService {

  rawExperiences = [];

  constructor(
    private firebaseService: FirebaseService,
    private fb: FormBuilder
  ) {
  }

  toFormGroup(fields: FieldBaseModel<any>[]) {

    let group: any = {};

    fields.forEach(exp => {
      group[exp.key] = exp.required ? new FormControl(exp.value, Validators.required)
        : new FormControl(exp.value);
    })

    return new FormGroup(group);
  }

  buildExperienceAsync() {

    // let experiences = [];
    let experiences = this.fb.array([]);
    return this.firebaseService.getExperiences()
      .map(data => {
        // get all experiences and create an array of them
        this.rawExperiences = Object.keys(data).map(x => data[x]);


        // process each exprience
        this.rawExperiences.forEach(item => {
          let fields: FieldBaseModel<any>[] = [];
          // for each value in this experience, convert it into a form field
          for (let key in item) {
            let field: any;
            switch (key) {
              case 'companyName':
                field = new FieldTextboxModel({
                  key: 'companyName',
                  label: 'Company name',
                  value: item[key],
                  required: true,
                  order: 1
                });
                break;
              case 'yearsWorked':
                field = new FieldDropdownModel({
                  key: 'yearsWorked',
                  label: 'Years worked',
                  options: [
                    {key: '1', value: '1'},
                    {key: '2', value: '2'},
                    {key: '3', value: '3'},
                    {key: '4', value: '4'},
                    {key: '5', value: '5'},
                    {key: 'infinite', value: 'infinite'}
                  ],
                  order: 3
                });
                break;
              case 'jobTitle':
                field = new FieldTextboxModel({
                  key: 'jobTitle',
                  label: 'Job title',
                  value: item[key],
                  required: true,
                  order: 2
                });
                break;
              default:
                console.log('default');
            }
            fields.push(field);
          }
          fields.sort((a, b) => a.order - b.order);
          experiences.push(this.toFormGroup(fields));
        })
        //let x: FormArray = experiences;
        // convert experiences
        return experiences;
      })


  }

  // Todo: get from a remote source of experiences metadata
  // Todo: make asynchronous
  buildExperience() {
    let fields: FieldBaseModel<any>[] = [
      new FieldTextboxModel({
        key: 'companyName',
        label: 'Company name',
        value: 'CNM',
        required: true,
        order: 1
      }),
      new FieldDropdownModel({
        key: 'yearsWorked',
        label: 'Years worked',
        options: [
          {key: '1', value: '1'},
          {key: '2', value: '2'},
          {key: '3', value: '3'},
          {key: '4', value: '4'},
          {key: '5', value: '5'},
          {key: 'infinite', value: 'infinite'}
        ],
        order: 3
      }),
      new FieldTextboxModel({
        key: 'jobTitle',
        label: 'Job title',
        value: 'Web Developer III',
        required: true,
        order: 2
      }),
    ];

    return fields.sort((a, b) => a.order - b.order);
  }

}
