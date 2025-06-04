import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ProfileService } from '../../../services/profile.service';

const REGIONS = ['Center', 'North', 'South', 'All'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

@Component({
  selector: 'app-supplier-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  templateUrl: './supplier-profile.component.html',
  styleUrls: ['./supplier-profile.component.scss']
})
export class SupplierProfileComponent implements OnInit {
  supplierForm!: FormGroup;
  supplierId!: number;
  isEditMode = false;
  showPassword = false;
  showConfirmPassword = false;
  errorMessage = '';
  successMessage = '';

  readonly weekdays = WEEKDAYS;
  readonly regions = REGIONS;

  constructor(private fb: FormBuilder, private profileService: ProfileService) {}

  extraFieldsForm!: FormGroup;
  supplierType: string = '';
  
  
  ngOnInit(): void {
    this.supplierId = Number(localStorage.getItem('userId'));
  
    if (!this.supplierId || isNaN(this.supplierId)) {
      this.errorMessage = 'Missing or invalid supplier ID';
      return;
    }
  
    this.supplierForm = this.fb.group({
      name: this.fb.control({ value: '', disabled: true }, Validators.required),
      email: this.fb.control({ value: '', disabled: true }, [Validators.required, Validators.email]),
      contact_info: this.fb.control({ value: '', disabled: true }),
      region: this.fb.control({ value: '', disabled: true }),
      additional_info: this.fb.control({ value: '', disabled: true }),
      available_days: this.fb.control({ value: [], disabled: true }),
      newPassword: [''],
      confirmPassword: [''],
      supplier_type: this.fb.control({ value: '', disabled: true })
    });
  
    this.profileService.getSupplierById(this.supplierId).subscribe({
      next: (supplier) => {
        this.supplierForm.patchValue({
          name: supplier.name,
          email: supplier.email,
          contact_info: supplier.contact_info,
          region: supplier.region,
          additional_info: supplier.additional_info,
          available_days: supplier.available_days,
          supplier_type: supplier.supplier_type
        });
  
        this.supplierType = supplier.supplier_type;
  
        const dynamicControls = {} as { [key: string]: any };

        switch (supplier.supplier_type) {
          case 'catering':
            dynamicControls['price_per_person'] = [supplier.price_per_person || ''];
            dynamicControls['menu'] = [supplier.menu || ''];
            dynamicControls['kosher'] = [supplier.kosher || false];
            dynamicControls['vegetarian'] = [supplier.vegetarian || false];
            dynamicControls['vegan'] = [supplier.vegan || false];
            dynamicControls['gluten_free'] = [supplier.gluten_free || false];
            break;
        
          case 'dj':
            dynamicControls['price_per_hour'] = [supplier.price_per_hour || ''];
            dynamicControls['music_styles'] = [supplier.music_styles || []];
            break;
        
          case 'photographer':
            dynamicControls['price_per_hour'] = [supplier.price_per_hour || ''];
            dynamicControls['has_magnets'] = [supplier.has_magnets || false];
            dynamicControls['has_stills'] = [supplier.has_stills || false];
            dynamicControls['has_video'] = [supplier.has_video || false];
            break;
        
          case 'speaker':
            dynamicControls['price_per_lecture'] = [supplier.price_per_lecture || ''];
            dynamicControls['lecture_duration'] = [supplier.lecture_duration || ''];
            dynamicControls['lecture_field'] = [supplier.lecture_field || ''];
            break;
        
          case 'location':
            dynamicControls['address'] = [supplier.address || ''];
            dynamicControls['city'] = [supplier.city || ''];
            dynamicControls['capacity'] = [supplier.capacity || ''];
            dynamicControls['price'] = [supplier.price || ''];
            dynamicControls['parking'] = [supplier.parking || false];
            dynamicControls['place_type'] = [supplier.place_type || ''];
            break;
        }        
  
        this.extraFieldsForm = this.fb.group(dynamicControls);
        this.extraFieldsForm.disable(); 
      },
      error: () => {
        this.errorMessage = 'Failed to load supplier data';
      }
    });
  }
  

  get availableDaysControl() {
    return this.supplierForm.get('available_days') as import('@angular/forms').FormControl;
  }

  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;
  
    if (this.isEditMode) {
      this.supplierForm.enable();
      this.supplierForm.get('supplier_type')?.disable();
      this.extraFieldsForm?.enable();
    } else {
      this.supplierForm.disable();
      this.extraFieldsForm?.disable();
    }
  }

  onSubmit(): void {
    if (this.supplierForm.invalid) return;

    const { newPassword, confirmPassword, ...rawValues } = this.supplierForm.getRawValue();

    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }
      rawValues.password = newPassword;
    }

    const payload = {
        ...rawValues,
        ...this.extraFieldsForm.getRawValue(),
        available_days: this.availableDaysControl.value
      };

    this.profileService.updateSupplier(this.supplierId, payload).subscribe({
      next: () => {
        this.successMessage = 'Supplier updated successfully';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Update failed';
      }
    });
  }
}
