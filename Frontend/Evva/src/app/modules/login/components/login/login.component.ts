import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    FormsModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = '';
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      type: ['user', Validators.required],
      rememberMe: [false] 
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get type() {
    return this.loginForm.get('type');
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (user) => {
  // שומרים את המידע בלוקאל סטורג' לשימוש בהמשך
        localStorage.setItem('userId', user.id.toString());
        localStorage.setItem('type', user.type);

        if (user.type === 'supplier') {
          this.router.navigate(['/supplier-home']);
        } else if (user.type === 'user') {
          this.router.navigate(['/my-events']);
        } else {
          this.router.navigate(['/']);
        }
      },
        error: (err) => {
          console.error('❌ Login error:', err);
          this.loginError = err.status === 401
            ? 'Invalid email or password'
            : 'An unexpected error occurred. Please try again.';
        }
      });
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
