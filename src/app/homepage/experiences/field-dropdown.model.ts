import { FieldBaseModel } from "./field-base.model";

export class FieldDropdownModel extends FieldBaseModel<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
