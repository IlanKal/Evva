import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-client',
  standalone: true,
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],



})
export class RegisterClientComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.form.value);
    // TODO: send to API
  }
}