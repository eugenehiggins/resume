export class ExpBaseModel<T> {
  value: T;
  key: string;
  companyName: string;
  positionTitle: string;
  required: boolean;
  order: number;
  controlType: string;
  constructor(options: {
    value?: T,
    key?: string,
    companyName?: string,
    positionTitle?: string,
    required?: boolean,
    order?: number,
    controlType?: string
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.companyName = options.companyName || '';
    this.positionTitle = options.positionTitle || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}
