import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RegisterSupplierStep1Component } from './register-supplier-step1/register-supplier-step1.component';
import { RegisterSupplierStep2Component } from './register-supplier-step2/register-supplier-step2.component';

@Component({
  selector: 'app-register-supplier',
  standalone: true,
  imports: [CommonModule, MatCardModule, RegisterSupplierStep1Component, RegisterSupplierStep2Component],
  templateUrl: './register-supplier.component.html',
  styleUrls: ['./register-supplier.component.scss']
})
export class RegisterSupplierComponent {
  currentStep = 1;
  supplierType: string = '';

  goToStep2(type: string) {
    this.supplierType = type;
    this.currentStep = 2;
  }
}
