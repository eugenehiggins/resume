import { TestBed, inject } from '@angular/core/testing';

import { ExperienceControlService } from './experience-control.service';

describe('ExperienceControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExperienceControlService]
    });
  });

  it('should ...', inject([ExperienceControlService], (service: ExperienceControlService) => {
    expect(service).toBeTruthy();
  }));
});
