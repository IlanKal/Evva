import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-supplier-step1',
  standalone: true,
  templateUrl: './register-supplier-step1.component.html',
  styleUrls: ['./register-supplier-step1.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],


})
export class RegisterSupplierStep1Component {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      businessName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      supplierType: ['', Validators.required],
    });
  }

  onSubmit() {
    const data = this.form.value;
    console.log(data);
    // TODO: send to API to create supplier base entry
    this.router.navigate([`/register/supplier/step2`], {
      queryParams: { type: data.supplierType }
    });
  }
}