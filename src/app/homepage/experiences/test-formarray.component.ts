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
        <div *ngFor="let experience of experiences.controls; let n=index">

          <div formGroupName="{{n}}">
            <span>
            <input formControlName="companyName" />
            </span>
            <label>Job Title: </label>
            <input formControlName="jobTitle" /><br>
            <label>Years Worked: </label>
            <input formControlName="yearsWorked" />
          </div>
        </div>
      </div>
      <button>Submit</button>
    </form>


    <button (click)="addCity()">Add City</button>
    <button (click)="setPreset()">Set preset</button>

   <!--<div *ngFor="let x of expArray | keys">-->
     <!--<div *ngFor="let y of x | keys">-->
       <!--<pre>{{ y }}</pre>-->
     <!--</div>-->
     <!---->
   <!--</div>-->
    
  `,
  styles: []
})
export class TestFormarrayComponent implements OnInit {

  expArray = {
    "-Ki0W1AtZfqxPxEuzuB9" : {
      "companyName" : "CNM",
      "jobTitle" : "Web developer IIa",
      "yearsWorked" : 3
    },
    "-Ki0W6lGQqm5PMZeDoKf" : {
      "companyName" : "APS",
      "jobTitle" : "Web developer IIb",
      "yearsWorked" : 3
    },
    "-Ki0WFjhm917PP4mBOTT" : {
      "companyName" : "UNM",
      "jobTitle" : "Web Developer IIc",
      "yearsWorked" : "2"
    },
    "-Ki0WK592PKyBGk-GbF2" : {
      "companyName" : "Google",
      "jobTitle" : "Web Developer IId",
      "yearsWorked" : "3"
    }
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

  constructor(private firebaseService: FirebaseService) {
    // firebaseService.getExperiences()
    //   .subscribe( x => console.log(x))
  }

  ngOnInit() {

    for (let experienceObj in this.expArray ) {
      // console.log(experienceObj)
      let fg: any = {};
      for (let key in this.expArray[experienceObj]) {
        // console.log(key, this.expArray[experienceObj][key])
        // change here to read the object properties
        fg[key] = new FormControl(this.expArray[experienceObj][key])
      }

      this.experiences.push(new FormGroup(fg))
    }
    // console.log(this.expArray)
    console.log(this.experiences)

  }

  form = new FormGroup({
    cities: new FormArray([
      new FormControl('SF'),
      new FormControl('NY'),
    ]),
    experiences: new FormArray([])
  });

}
