import { Component, Input, OnInit } from '@angular/core';
import { ExpBaseModel } from "./exp.base.model";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'dynamic-experience',
  templateUrl: './dynamic-experience.component.html',
  styleUrls: ['./dynamic-experience.component.scss']
})
export class DynamicExperienceComponent implements OnInit {

  @Input() experience: ExpBaseModel<any>;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  getIsValid() {
    return this.form.controls[this.experience.key].valid;
  }
}
