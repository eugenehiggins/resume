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
import { SummaryComponent } from './homepage/summary/summary.component';

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
    SummaryComponent
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
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
