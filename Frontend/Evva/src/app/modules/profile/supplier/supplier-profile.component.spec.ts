import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SupplierProfileComponent } from './supplier-profile.component';
import { ProfileService } from '../../../services/profile.service';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule, FormArray } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SupplierProfileComponent', () => {
  let component: SupplierProfileComponent;
  let fixture: ComponentFixture<SupplierProfileComponent>;
  let mockProfileService: jasmine.SpyObj<ProfileService>;

  beforeEach(waitForAsync(() => {
    mockProfileService = jasmine.createSpyObj('ProfileService', ['getSupplierById', 'updateSupplier']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SupplierProfileComponent],
      providers: [{ provide: ProfileService, useValue: mockProfileService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem('userId', '1');
    fixture = TestBed.createComponent(SupplierProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load supplier data on init', () => {
    const supplierData = {
      name: 'Test Supplier',
      email: 'test@supplier.com',
      contact_info: '050-0000000',
      region: 'North',
      additional_info: 'Some info',
      supplier_type: 'catering',
      available_days: ['Sunday', 'Wednesday']
    };

    mockProfileService.getSupplierById.and.returnValue(of(supplierData));
    fixture.detectChanges();

    expect(component.supplierForm.value.name).toBe('Test Supplier');
    expect(component.supplierForm.value.email).toBe('test@supplier.com');

    const availableDays = component.supplierForm.get('available_days') as FormArray;
    expect(availableDays.controls[0].value).toBeTrue();   // Sunday
    expect(availableDays.controls[1].value).toBeFalse();  // Monday
    expect(availableDays.controls[3].value).toBeTrue();   // Wednesday
  });

  it('should reject mismatched passwords', () => {
    component.isEditMode = true;
    component.ngOnInit(); // create form
    fixture.detectChanges();

    component.supplierForm.patchValue({
      newPassword: 'pass123',
      confirmPassword: 'pass999'
    });

    component.onSubmit();
    expect(component.errorMessage).toBe('Passwords do not match');
  });

  it('should call updateSupplier with correct payload', () => {
    component.isEditMode = true;
    component.ngOnInit();
    fixture.detectChanges();

    mockProfileService.getSupplierById.and.returnValue(of({
      name: 'S',
      email: 'e@s.com',
      contact_info: '',
      region: 'South',
      additional_info: '',
      supplier_type: 'dj',
      available_days: ['Sunday', 'Monday']
    }));

    fixture.detectChanges();

    const form = component.supplierForm;
    form.patchValue({
      name: 'Updated Name',
      email: 'updated@s.com',
      contact_info: '050-9999999',
      region: 'Center',
      additional_info: 'Updated info',
      newPassword: '',
      confirmPassword: ''
    });

    const checkboxes = form.get('available_days') as FormArray;
    checkboxes.controls.forEach((ctrl, index) => ctrl.setValue(index % 2 === 0)); // סמן ימים זוגיים

    mockProfileService.updateSupplier.and.returnValue(of({}));

    component.onSubmit();

    expect(mockProfileService.updateSupplier).toHaveBeenCalled();
    expect(component.successMessage).toBe('Supplier updated successfully');
  });

  it('should show error on update failure', () => {
    component.isEditMode = true;
    component.ngOnInit();
    fixture.detectChanges();

    mockProfileService.updateSupplier.and.returnValue(throwError(() => new Error('fail')));

    component.onSubmit();

    expect(component.errorMessage).toBe('Update failed');
  });
});
