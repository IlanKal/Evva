import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = 'Check the account information you entered and try again.';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      type: ['', Validators.required], // <--- new control
      rememberMe: [true] // ← הוספה נדרשת
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

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }
  

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: (res) => {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('userType', res.type);
          localStorage.setItem('userId', res.id.toString());
          console.log('Login success:', res);
          this.router.navigate([`/my-events`]);
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.loginError = err?.error?.message || 'Login failed';
          console.error('Login failed:', err);        }
      });
      console.log(this.loginForm.value);
      // Perform login logic here
    }
  }

  onRegister() {
    this.router.navigate([`/register`]);
  }

}