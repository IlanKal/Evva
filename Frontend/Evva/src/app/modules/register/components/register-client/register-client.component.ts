import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../services/auth.service';


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

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const payload = {
        full_name: this.form.value.fullName,
        email: this.form.value.email,
        password: this.form.value.password,
        phone: this.form.value.phoneNumber,
      };

      this.authService.registerUser(payload).subscribe({
        next: () => alert('ההרשמה הצליחה!'),
        error: (err) => {
          console.error(err);
          alert('אירעה שגיאה בהרשמה: ' + err.error?.message);
        }
      });
    }
  }
}
