import { Component, OnInit } from '@angular/core';
import { ExperienceControlService } from "../services/experience-control.service";

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  //experiences: any[];

  constructor(private experiencesService: ExperienceControlService) { }

  ngOnInit() {
    //this.experiences = this.experiencesService.buildExperience();
  }




}
