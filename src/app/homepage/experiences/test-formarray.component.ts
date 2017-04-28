import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'test-formarray',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div formArrayName="cities">
        <div *ngFor="let city of cities.controls; let i=index">
          <input [formControlName]="i" placeholder="City">
        </div>
      </div>
      <div formArrayName="experiences">
        <div *ngFor="let exp of experiences.controls; let n=index">
          <div formGroupName="{{n}}">
            <div *ngFor="let e of expArray | keys">
              <input [formControlName]="e" placeholder="Experience">
            </div>
          </div>
        </div>
      </div>
      <button>Submit</button>
    </form>

    <pre>{{form.value | json}}</pre>

    <button (click)="addCity()">Add City</button>
    <button (click)="setPreset()">Set preset</button>
  `,
  styles: []
})
export class TestFormarrayComponent implements OnInit {

  expArray =
    {
      "companyName": "CNM",
      "jobTitle": "Web developer II",
      "yearsWorked": 3
    }




  get cities(): FormArray {
    return this.form.get('cities') as FormArray;
  }

  get experiences(): FormArray {
    return this.form.get('experiences') as FormArray;
  }

  addCity() {
    this.cities.push(new FormControl());
  }

  onSubmit() {
    console.log(this.cities.value);  // ['SF', 'NY']
    console.log(this.form.value);    // { cities: ['SF', 'NY'] }
    console.log(this.cities);
  }

  setPreset() {
    this.cities.patchValue(['LA', 'MTV']);
  }

  constructor() {

  }

  ngOnInit() {
    console.log('onInit')

    let fg: any = {};

    for (let control in this.expArray) {
      fg[control] = new FormControl(this.expArray[control])
    }

    this.experiences.push(new FormGroup(fg))
  }

  form = new FormGroup({
    cities: new FormArray([
      new FormControl('SF'),
      new FormControl('NY'),
    ]),
    experiences: new FormArray([])
  });

}
