import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepResultsComponent } from './step-results.component';

describe('StepResultsComponent', () => {
  let component: StepResultsComponent;
  let fixture: ComponentFixture<StepResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
