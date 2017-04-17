import { FieldBaseModel } from "./field-base.model";

export class FieldTextboxModel extends FieldBaseModel<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
