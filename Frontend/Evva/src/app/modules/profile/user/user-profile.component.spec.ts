import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { ProfileService } from '../../../services/profile.service';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let mockProfileService: jasmine.SpyObj<ProfileService>;

  beforeEach(waitForAsync(() => {
    mockProfileService = jasmine.createSpyObj('ProfileService', ['getUserById', 'updateUser']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, UserProfileComponent],
      providers: [{ provide: ProfileService, useValue: mockProfileService }],
      schemas: [NO_ERRORS_SCHEMA] // מתעלם משגיאות טמפלט אם אין קומפוננטות או מודולים מיובאים
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem('userId', '3');
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data on init', () => {
    const userData = {
      full_name: 'Alice Smith',
      phone: '0501234567',
      email: 'alice@example.com'
    };

    mockProfileService.getUserById.and.returnValue(of(userData));

    fixture.detectChanges();

    expect(component.profileForm.value.full_name).toBe('Alice Smith');
    expect(component.profileForm.value.phone).toBe('0501234567');
    expect(component.profileForm.value.email).toBe('alice@example.com');
  });

  it('should show error if passwords do not match', () => {
    fixture.detectChanges();

    component.profileForm.setValue({
      full_name: 'Test',
      phone: '123456',
      email: 'test@test.com',
      newPassword: 'abc',
      confirmPassword: 'xyz'
    });

    component.onSubmit();

    expect(component.errorMessage).toBe('Passwords do not match');
  });

  it('should call updateUser when form is valid', () => {
    fixture.detectChanges();

    component.profileForm.setValue({
      full_name: 'New Name',
      phone: '0500000000',
      email: 'new@example.com',
      newPassword: '',
      confirmPassword: ''
    });

    mockProfileService.updateUser.and.returnValue(of({}));

    component.onSubmit();

    expect(mockProfileService.updateUser).toHaveBeenCalledWith(3, {
      full_name: 'New Name',
      phone: '0500000000',
      email: 'new@example.com'
    });

    expect(component.successMessage).toBe('Profile updated successfully');
  });

  it('should handle update failure', () => {
    fixture.detectChanges();

    component.profileForm.setValue({
      full_name: 'New Name',
      phone: '0500000000',
      email: 'new@example.com',
      newPassword: '',
      confirmPassword: ''
    });

    mockProfileService.updateUser.and.returnValue(throwError(() => new Error('fail')));

    component.onSubmit();

    expect(component.errorMessage).toBe('Update failed');
  });
});
