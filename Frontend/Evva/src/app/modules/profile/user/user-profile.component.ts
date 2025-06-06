import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userId!: number;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  isEditMode = false;
  showPassword = false;
  showConfirmPassword = false;

  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;
  }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));

    this.profileForm = this.fb.group({
      full_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newPassword: [''],
      confirmPassword: ['']
    });

    this.profileService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          full_name: user.full_name,
          phone: user.phone,
          email: user.email
        });
      },
      error: () => {
        this.errorMessage = 'Failed to load user data';
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    const { newPassword, confirmPassword, ...formData } = this.profileForm.value;

    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }
      formData.password = newPassword;
    }

    this.profileService.updateUser(this.userId, formData).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Update failed';
      }
    });
  }
}
