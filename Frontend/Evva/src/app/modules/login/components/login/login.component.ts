import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
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
  registerRole: 'supplier' | 'client' | null = null;


  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required] // <--- new control
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get role() {
    return this.loginForm.get('role');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: (res) => {
          console.log('Login success:', res);
          // שמור טוקן, נווט הלאה וכו'
        },
        error: (err) => {
          console.error('Login failed:', err);
          // הצג הודעת שגיאה למשתמש
        }
      });
      console.log(this.loginForm.value);
      // Perform login logic here
    }
  }

  onRegister() {
    if (this.registerRole) {
      console.log('Navigating to register as', this.registerRole);
      // לדוגמה - נווט למסך הרשמה לפי סוג המשתמש
      // this.router.navigate([`/register/${this.registerRole}`]);
    }
  }

}