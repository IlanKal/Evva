import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-supplier-step2',
  standalone: true,
  templateUrl: './register-supplier-step2.component.html',
  styleUrls: ['./register-supplier-step2.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class RegisterSupplierStep2Component implements OnInit {
  form!: FormGroup;
  type!: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.type = this.route.snapshot.queryParamMap.get('type') || '';
    this.buildForm(this.type);
  }

  buildForm(type: string) {
    if (type === 'dj') {
      this.form = this.fb.group({
        genre: ['', Validators.required],
        experienceYears: ['', Validators.required],
        equipment: ['']
      });
    } else if (type === 'location') {
      this.form = this.fb.group({
        capacity: ['', Validators.required],
        hasParking: [false]
      });
    } else if (type === 'catering') {
      this.form = this.fb.group({
        cuisineType: ['', Validators.required],
        veganOptions: [false]
      });
    }
  }

  onSubmit() {
    console.log({ type: this.type, details: this.form.value });
    // TODO: send to API endpoint /api/register/supplier/:type
  }
}