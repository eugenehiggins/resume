import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FieldBaseModel } from "../homepage/experiences/field-base.model";
import { FieldTextboxModel } from "../homepage/experiences/field-textbox.model";
import { FieldDropdownModel } from "../homepage/experiences/field-dropdown.model";
import { FirebaseService } from "./firebase.service";
import 'rxjs/add/operator/map';

@Injectable()
export class ExperienceControlService {

  constructor(private firebaseService: FirebaseService) { }

  toFormGroup(fields: FieldBaseModel<any>[]) {
    let group: any = {};

    fields.forEach( exp => {
      group[exp.key] = exp.required ? new FormControl(exp.value, Validators.required)
                                    : new FormControl(exp.value);
    })
    return new FormGroup(group);
  }

  buildExperienceAsync() {
    let fields: FieldBaseModel<any>[] = [];
    this.firebaseService.getExperiences()
      .subscribe( experiences => {
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
          {key: '1',  value: '1'},
          {key: '2',  value: '2'},
          {key: '3',   value: '3'},
          {key: '4',   value: '4'},
          {key: '5',   value: '5'},
          {key: 'infinite', value: 'infinite'}
        ],
        order: 3
      }),
      new FieldTextboxModel({
        key: 'jobTitle',
        label: 'Job title',
        value: 'Web Developer II',
        required: true,
        order: 2
      }),
    ];

    return fields.sort((a, b) => a.order - b.order);
  }

}
