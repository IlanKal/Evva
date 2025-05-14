import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSupplierStep2Component } from './register-supplier-step2.component';

describe('RegisterSupplierStep2Component', () => {
  let component: RegisterSupplierStep2Component;
  let fixture: ComponentFixture<RegisterSupplierStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSupplierStep2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSupplierStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
