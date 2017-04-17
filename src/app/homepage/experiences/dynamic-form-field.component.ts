import { Component, Input, OnInit } from '@angular/core';
import { FieldBaseModel } from "./field-base.model";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'df-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss']
})
export class DynamicFormFieldComponent {

  @Input() field: FieldBaseModel<any>;
  @Input() form: FormGroup;

  get isValid() {
    return this.form.controls[this.field.key].valid;
  }

}
