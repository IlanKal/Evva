import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register-main.component.html',
  styleUrls: ['./register-main.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class RegisterComponent {
  selectedType: 'user' | 'supplier' | null = null;

  constructor(private router: Router) { }

  goToRegister() {
    if (this.selectedType === 'user') {
      this.router.navigate(['/register/client']);
    } else if (this.selectedType === 'supplier') {
      this.router.navigate(['/register/supplier/step1']);
    }
  }
}