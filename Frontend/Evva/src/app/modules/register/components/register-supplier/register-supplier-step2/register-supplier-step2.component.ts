import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-register-supplier-step2',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,       
    MatOptionModule,
    MatCheckboxModule,
  ],
  templateUrl: './register-supplier-step2.component.html',
  styleUrls: ['./register-supplier-step2.component.scss']
})
export class RegisterSupplierStep2Component implements OnInit, OnChanges {
  @Input() supplierType: string | null = null;
  @Output() formSubmitted = new EventEmitter<any>();

  form!: FormGroup;
  fields: any[] = [];

  supplierConfigs: any = {
    dj: [
      { name: 'price_per_hour', label: 'Price per Hour', type: 'number' },
      { name: 'music_styles', label: 'Music Styles (comma-separated)', type: 'text' }
    ],
    catering: [
      { name: 'price_per_person', label: 'Price per Person', type: 'number' },
      { name: 'menu', label: 'Menu Description', type: 'textarea' },
      { name: 'kosher', label: 'Kosher', type: 'checkbox' },
      { name: 'vegetarian', label: 'Vegetarian', type: 'checkbox' },
      { name: 'vegan', label: 'Vegan', type: 'checkbox' },
      { name: 'gluten_free', label: 'Gluten Free', type: 'checkbox' }
    ],
    photographer: [
      { name: 'price_per_hour', label: 'Price per Hour', type: 'number' },
      { name: 'has_magnets', label: 'Includes Magnets', type: 'checkbox' },
      { name: 'has_stills', label: 'Still Photography', type: 'checkbox' },
      { name: 'has_video', label: 'Video Recording', type: 'checkbox' }
    ],
    speaker: [
      { name: 'price_per_lecture', label: 'Price per Lecture', type: 'number' },
      { name: 'lecture_duration', label: 'Duration (minutes)', type: 'number' },
      { name: 'lecture_field', label: 'Field', type: 'text' }
    ],
    location: [
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'capacity', label: 'Capacity', type: 'number' },
      { name: 'price', label: 'Price', type: 'number' },
      { name: 'parking', label: 'Has Parking', type: 'checkbox' },
      { name: 'place_type', label: 'Place Type', type: 'text' }
    ]
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['supplierType'] && this.supplierType) {
      this.buildForm();
    }
  }

  buildForm() {
    this.fields = this.supplierType ? this.supplierConfigs[this.supplierType] || [] : [];
    const group: any = {};
    this.fields.forEach(field => {
      group[field.name] = field.type === 'checkbox' ? [false] : ['', Validators.required];
    });
    this.form = this.fb.group(group);
  }

onSubmit() {
  if (this.form.valid) {
     console.log('Submitting form step 2...');
    const result = { ...this.form.value };
    // המרה של music_styles לרשימה (אם מדובר ב-DJ)
    if (this.supplierType === 'dj' && result.music_styles) {
      result.music_styles = result.music_styles.map((s: string) => s.trim());
    }

    // המרה של שדות מספריים לטיפוס Number
    const numericFields = ['price_per_person', 'price_per_hour', 'price_per_lecture', 'lecture_duration', 'capacity', 'price'];
    numericFields.forEach(field => {
      if (result[field] !== undefined) {
        result[field] = Number(result[field]);
      }
    });
    this.formSubmitted.emit(result); 
  }
}
} 