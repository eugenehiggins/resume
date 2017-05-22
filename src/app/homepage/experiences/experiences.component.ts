import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { FirebaseService } from "../../services/firebase.service";


@Component({
  selector: 'experiences-form',
  template: `
    <form class="form-inline col-6" [formGroup]="form" (ngSubmit)="onSubmit()">
      <div formArrayName="cities">
        <div *ngFor="let city of cities.controls; let i=index">
          <input [formControlName]="i" placeholder="City">
        </div>
      </div>
      <div class="container" formArrayName="experiences" *ngFor="let experience of experiences.controls; let n=index">

        <div formGroupName="{{n}}" class="form-group row">
          <label class="sr-only" for="companyName">Job Title: </label>
          <input formControlName="companyName" id="companyName-{{n}}"
                 class="form-control form-control-static col-sm-3 mb-2 mr-sm-2 mb-sm-0"/>

          <label class="sr-only" for="jobTitle">Job Title: </label>
          <input formControlName="jobTitle" id="jobTitle"
                 class="form-control form-control-static col-sm-4 mb-2 mr-sm-2 mb-sm-0"/>

          <label class="sr-only" for="yearsWorked">Years Worked: </label>
          <input (focus)=onFocus($event) (blur)=onBlur($event) formControlName="yearsWorked" id="yearsWorked"
                 class="form-control form-control-static col-sm-4 mb-2 mr-sm-2 mb-sm-0"/>

          <input type="hidden" formControlName="key" id="key">

          <!--<label class="sr-only" for="summary">Summary </label>-->
          <!--<textarea formControlName="summary" id="summary" class="form-control form-control-static mb-2 mr-sm-2 mb-sm-0"></textarea>-->


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
export class ExperiencesComponent implements OnInit {

  focusedFieldValue: string;

  expObj = {};

  // local object for testing if firebase isn't available
  expArray = {
    "-Ki0W1AtZfqxPxEuzuB9": {
      "companyName": "CNM",
      "jobTitle": "Web developer IIa",
      "yearsWorked": 3
    },
    "-Ki0W6lGQqm5PMZeDoKf": {
      "companyName": "APS",
      "jobTitle": "Web developer IIb",
      "yearsWorked": 3
    },
    "-Ki0WFjhm917PP4mBOTT": {
      "companyName": "UNM",
      "jobTitle": "Web Developer IIc",
      "yearsWorked": "2"
    },
    "-Ki0WK592PKyBGk-GbF2": {
      "companyName": "Google",
      "jobTitle": "Web Developer IId",
      "yearsWorked": "3"
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

  constructor(private firebaseService: FirebaseService,
              private el: ElementRef) {

  }

  // when user clicks into this field, record its value
  // so later when the blur event happens it can be compared to see if
  // the db needs to be updated
  onFocus(event) {
    let el = this.el.nativeElement = event.target;
    this.focusedFieldValue = el.value;
  }

  // when user clicks away from the field, save the value
  // but only if it is a new value
  onBlur(event) {
    let el = this.el.nativeElement = event.target;
    if (this.focusedFieldValue !== el.value) {
      let key = el.parentElement.children['key'].value;
      let field = el.id;
      let value = el.value;

      this.firebaseService.updateExperience(key, field, value)
        .subscribe();
    }
    this.focusedFieldValue = "";
  }

  ngOnInit() {

    this.firebaseService.getExperiences()
      .subscribe(
        experiencesObj => {
          this.expObj = experiencesObj;
          this.transformExperiences();
        }
      )

  }

  transformExperiences() {
    for (let experienceObj in this.expObj) {
      // console.log(experienceObj)
      let fg: any = {};
      for (let key in this.expObj[experienceObj]) {

        // change here to read the object properties
        fg[key] = new FormControl(this.expObj[experienceObj][key])
      }
      fg["key"] = new FormControl(experienceObj);
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
