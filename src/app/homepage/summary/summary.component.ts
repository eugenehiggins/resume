import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FirebaseService } from "../../services/firebase.service";

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  summaryForm: FormGroup;
  summary: string;

  constructor(
    private firebaseService:FirebaseService,
    private fb: FormBuilder,
    private el: ElementRef
  ) {

  }

  ngOnInit() {
    this.createForm();

    this.firebaseService.getSummary()
      .subscribe( data => {
        console.log(data.summary);
        this.summaryForm.setValue({
          summary: data.summary
        })
      });
  }

  onBlur(event) {
    let el = this.el.nativeElement = event.target;
    let name = el.id;
    let value = el.value;
    this.firebaseService.setSummary(event.target.value)
      .subscribe(
        status => {
          if (status === 200) {
            console.log('howdy');
          }
        }
      );
  }

  createForm(){
    this.summaryForm = this.fb.group ({
      summary: ['', Validators.required]
    })
  }
}
