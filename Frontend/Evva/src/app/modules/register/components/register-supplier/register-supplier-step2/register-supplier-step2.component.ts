import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register-supplier-step2',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register-supplier-step2.component.html',
  styleUrls: ['./register-supplier-step2.component.scss']
})
export class RegisterSupplierStep2Component implements OnInit, OnChanges {
  @Input() supplierType: string | null = null;

  form!: FormGroup;
  fields: any[] = [];

  supplierConfigs: any = {
    dj: [
      { name: 'music_style', label: 'Music Style', type: 'text', placeholder: 'e.g., House, Trance' },
      { name: 'equipment', label: 'Equipment', type: 'text', placeholder: 'e.g., Pioneer' },
      { name: 'years_experience', label: 'Years of Experience', type: 'number', placeholder: 'e.g., 5' }
    ],
    hall: [
      { name: 'seats', label: 'Number of Seats', type: 'number', placeholder: 'e.g., 200' },
      { name: 'parking', label: 'Parking Available', type: 'text', placeholder: 'Yes/No' },
      { name: 'accessible', label: 'Accessible', type: 'text', placeholder: 'Yes/No' }
    ]
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // יישאר ריק כי הניהול עובר ל-ngOnChanges
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['supplierType'] && this.supplierType) {
      this.buildForm();
    }
  }

  buildForm() {
    this.fields = this.supplierType ? this.supplierConfigs[this.supplierType] || [] : [];
    const group: any = {};
    this.fields.forEach(field => {
      group[field.name] = ['', Validators.required];
    });
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
