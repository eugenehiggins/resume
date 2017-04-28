import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {FirebaseService} from "../../services/firebase.service";


@Component({
  selector: 'test-formarray',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" >
      <!--<div formArrayName="cities">-->
        <!--<div *ngFor="let city of cities.controls; let i=index">-->
          <!--<input [formControlName]="i" placeholder="City">-->
        <!--</div>-->
      <!--</div>-->
      <div formArrayName="experiences">
        <div *ngFor="let exp of experiences.controls; let n=index">
          <ul formGroupName="{{n}}" class="form-inline">
            <li *ngFor="let e of expArray[n] | keys" class="form-group">
              <input [formControlName]="e" placeholder="Experience" class="form-control form-control-static">
            </li>
          </ul>
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

  expArray = [
    {
      "companyName": "CNM",
      "jobTitle": "Web developer II",
      "yearsWorked": 3
    },
    {
      "companyName": "APS",
      "jobTitle": "Course designer",
      "yearsWorked": 2
    }
]




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

  constructor(private firebaseService: FirebaseService) {
    firebaseService.getExperiences()
      .subscribe( x => console.log(x))
  }

  ngOnInit() {

    for (let experience in this.expArray ) {
      let fg: any = {};
      for (let control in this.expArray[experience]) {
        // change here to read the object properties
        fg[control] = new FormControl(this.expArray[experience][control])
      }

      this.experiences.push(new FormGroup(fg))
    }
  }

  form = new FormGroup({
    cities: new FormArray([
      new FormControl('SF'),
      new FormControl('NY'),
    ]),
    experiences: new FormArray([])
  });

}
