import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { UserStateService } from '../../../../services/user-state.service';

@Component({
  selector: 'app-register-client',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss'],
})
export class RegisterClientComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router,private userState: UserStateService ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const payload = {
        full_name: this.form.value.fullName,
        email: this.form.value.email,
        password: this.form.value.password,
        phone: this.form.value.phoneNumber,
        role: this.form.value.role,
      };

      this.authService.registerUser(payload).subscribe({
        next: (user) => {
          console.log('🔍 User response from backend:', user); 
          localStorage.setItem('userId', user.id.toString());
          localStorage.setItem('type', 'customer');
          // ⬅️ הוספת עדכון המשתמש לשירות הגלובלי
    this.userState.setUser({
      user_id: user.id,
      name: this.form.value.fullName,
      email: this.form.value.email,
      phone: this.form.value.phone,
    });
          alert('ההרשמה הצליחה!');
          this.router.navigate(['/my-events']);
        },
        error: (err) => {
          console.error(err);
          alert('אירעה שגיאה בהרשמה: ' + err.error?.message);
        }
      });
    }
  }
}
