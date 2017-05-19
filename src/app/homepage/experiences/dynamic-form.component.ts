import { Component, Input, OnInit } from '@angular/core';
import { FieldBaseModel } from "./field-base.model";
import { Form, FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ExperienceControlService } from "../../services/experience-control.service";
import { FirebaseService } from "../../services/firebase.service";
import 'rxjs';
import { FieldTextboxModel } from "./field-textbox.model";
import { FieldDropdownModel } from "./field-dropdown.model";

@Component({
  selector: 'old-experiences-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  // @Input() fields: FieldBaseModel<any>[] = [];
  fields: FieldBaseModel<any>[] = [];
  form: FormGroup = new FormGroup({
    experiences: new FormArray([])
  });
  payLoad = '';
  // experiences: FormArray;

  get experiences() { return this.form.get('experiences') as FormArray; }

  constructor(
    private ecs: ExperienceControlService,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService
  ) {

    this.firebaseService.getExperiences()
      .subscribe( data => {
        let fields: FieldBaseModel<any>[] = [];
        for( let experience in data) {
          let field: any;
          switch (experience) {
            case 'companyName':
              field = new FieldTextboxModel({
                key: 'companyName',
                label: 'Company name',
                value: data[experience],
                required: true,
                order: 1
              });
              break;
            case 'yearsWorked':
              field = new FieldDropdownModel({
                key: 'yearsWorked',
                label: 'Years worked',
                options: [
                  {key: '1', value: '1'},
                  {key: '2', value: '2'},
                  {key: '3', value: '3'},
                  {key: '4', value: '4'},
                  {key: '5', value: '5'},
                  {key: 'infinite', value: 'infinite'}
                ],
                order: 3
              });
              break;
            case 'jobTitle':
              field = new FieldTextboxModel({
                key: 'jobTitle',
                label: 'Job title',
                value: data[experience],
                required: true,
                order: 2
              });
              break;
            default:
              console.log('default');
          }
          fields.push(field);
          //this.experiences.push(new FormControl());
          // this.fields.push( data[experience])
          // this.form.addControl(this.ecs.toFormGroup(data[experience]), ) //= this.ecs.toFormGroup(this.fields);
        }

      })
    //this.fields = this.ecs.buildExperience();

    // this.form = this.formBuilder.group({
    //   experiences: this.formBuilder.array([])
    // })
    // this.ecs.buildExperienceAsync()
    //   .subscribe( data => {
    //     this.experiences.push(data as FormArray);
    //     console.log(this.experiences)
    //   },
    //     error => console.log("Error: ", error),
    //     function() {
    //       console.log('success')
    //     }
    //   );
  }



  ngOnInit() {
    // TODO: make getting fields async
    //this.fields = this.ecs.buildExperience();


    //this.form = this.ecs.toFormGroup(this.fields);

  }

  saveExperience(event) {
    //this.payLoad = JSON.stringify(this.form.value);
    this.firebaseService.setExperience(this.form.value)
      .subscribe( x => console.log('experience saved', x))
  }


}
