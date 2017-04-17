import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicExperiencesComponent } from './dynamic-experience.component';

describe('DynamicExperiencesComponent', () => {
  let component: DynamicExperiencesComponent;
  let fixture: ComponentFixture<DynamicExperiencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicExperiencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
