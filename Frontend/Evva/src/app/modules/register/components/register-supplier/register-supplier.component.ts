import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RegisterSupplierStep1Component } from './register-supplier-step1/register-supplier-step1.component';
import { RegisterSupplierStep2Component } from './register-supplier-step2/register-supplier-step2.component';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-supplier',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RegisterSupplierStep1Component,
    RegisterSupplierStep2Component,
  ],
  templateUrl: './register-supplier.component.html',
  styleUrls: ['./register-supplier.component.scss'],
})
export class RegisterSupplierComponent {
  currentStep = 1;
  supplierType: string = '';
  supplierId: number = 0;
  step1Data: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  onStep1Submitted(data: any) {
    this.step1Data = data;
    this.supplierType = data.supplier_type;
    this.currentStep = 2;

    const payload = {
      ...data,
      rememberMe: false,
    };

    this.authService.registerSupplier(payload).subscribe({
      next: (res) => {
        this.supplierId = res.supplier_id;
        localStorage.setItem('supplierId', res.supplier_id.toString());
      },
      error: (err) => {
        alert('שגיאה בהרשמת ספק: ' + (err.error?.message || 'לא ידוע'));
      },
    });
  }

  onStep2Submitted(details: any) {
    this.authService
      .registerSupplierDetails({
        supplier_id: this.supplierId,
        supplier_type: this.supplierType,
        details,
      })
      .subscribe({
        next: () => {
          // אחרי שהשלב השני הצליח – מתחברים אוטומטית
          this.authService
            .login({
              email: this.step1Data.email,
              password: this.step1Data.password,
              type: 'supplier',
              rememberMe: false,
            })
            .subscribe({
              next: () => {
                this.router.navigate(['/supplier-home']);
              },
              error: (err) => {
                alert(
                  'שגיאה בהתחברות לאחר ההרשמה: ' +
                    (err.error?.message || 'לא ידוע')
                );
              },
            });
        },
        error: (err) => {
          alert(
            'שגיאה בשמירת פרטי הספק: ' + (err.error?.message || 'לא ידוע')
          );
        },
      });
  }
}
