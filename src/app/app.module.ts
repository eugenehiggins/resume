import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { RouterModule } from "@angular/router";
import { PostsService } from "./posts.service";
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './homepage/contact/contact.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { FirebaseService } from "./services/firebase.service";
import { InlineEditDirective } from './inline-edit.directive';
import { AutoWidthDirective } from "./auto-width.directive";
import { SummaryComponent } from './homepage/summary/summary.component';
import { ExperienceControlService } from "./services/experience-control.service";
import { DynamicFormComponent } from './homepage/experiences/dynamic-form.component';
import { DynamicFormFieldComponent } from './homepage/experiences/dynamic-form-field.component';
import { TestFormarrayComponent } from './homepage/experiences/test-formarray.component';
import { KeysPipe } from './keys.pipe';

const ROUTES = [
  {
    path: '',
    component: HomepageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HomepageComponent,
    ContactComponent,
    InlineEditDirective,
    AutoWidthDirective,
    SummaryComponent,
    DynamicFormComponent,
    DynamicFormFieldComponent,
    TestFormarrayComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    PostsService,
    FirebaseService,
    ExperienceControlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
