import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register-supplier-step1',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './register-supplier-step1.component.html',
  styleUrls: ['./register-supplier-step1.component.scss']
})
export class RegisterSupplierStep1Component {
  @Output() supplierTypeSelected = new EventEmitter<string>();
  form: FormGroup;
  supplierTypes = ['dj', 'hall'];


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      available_days: ['', Validators.required],
      region: ['', Validators.required],
      image_url: ['', Validators.required],
      additional_info: [''],
      contact_info: ['', Validators.required],
      supplier_type: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.supplierTypeSelected.emit(this.form.value.supplier_type);
    }
  }
}
