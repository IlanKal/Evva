import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSupplierStep1Component } from './register-supplier-step1.component';

describe('RegisterSupplierStep1Component', () => {
  let component: RegisterSupplierStep1Component;
  let fixture: ComponentFixture<RegisterSupplierStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSupplierStep1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSupplierStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
