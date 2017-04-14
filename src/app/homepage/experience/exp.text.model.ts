import { ExpBaseModel } from './exp.base.model';

export class ExpTextModel extends ExpBaseModel<string> {
  controlType = 'textBox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
