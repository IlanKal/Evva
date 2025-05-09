import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './register-main.component.html',
  styleUrls: ['./register-main.component.scss'],
})
export class RegisterComponent {
  constructor(private router: Router) {}

  registerAs(type: 'user' | 'supplier') {
    if (type === 'user') {
      this.router.navigate(['/register/client']);
    } else {
      this.router.navigate(['/register/supplier']);
    }
  }
}
