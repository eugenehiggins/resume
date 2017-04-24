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
        <div *ngFor="let exp of experiences.controls.FormGroup.controls">
          <!--<div *ngFor="let x of exp.controls; let n=index"><-->
            <input [formControlName]="n" placeholder="Experience">
          <!--</div>-->
        </div>
      </div>
      <button>Submit</button>
    </form>

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


  form = new FormGroup({
    cities: new FormArray([
      new FormControl('SF'),
      new FormControl('NY'),
    ]),
    experiences: new FormArray([])
  });

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
    let fg: any = {};

    for (let control in this.expArray) {
      fg[control] = new FormControl(this.expArray[control])
    }

    this.experiences.push(new FormGroup(fg))
    console.log(this.experiences)
    console.log(this.cities);
  }

  ngOnInit() {

  }

}
