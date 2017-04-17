import { Injectable } from '@angular/core';
import { ExpBaseModel } from "../homepage/experience/exp.base.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ExpTextModel } from "../homepage/experience/exp.text.model";

@Injectable()
export class ExperienceControlService {

  constructor() { }

  toFormGroup(experiences: ExpBaseModel<any>[]) {
    let group: any = {};

    experiences.forEach( exp => {
      group[exp.key] = exp.required ? new FormControl(exp.value, Validators.required)
                                    : new FormControl(exp.value);
    })
    return new FormGroup(group);
  }

  // Todo: get from a remote source of experience metadata
  // Todo: make asynchronous
  getExperiences() {
    let experiences: ExpBaseModel<any>[] = [
      new ExpTextModel({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        companyName: 'CNM',
        positionTitle: 'Web Developer II',
        required: true,
        order: 1
      }),
    ];

    return experiences.sort((a, b) => a.order - b.order);
  }

}
