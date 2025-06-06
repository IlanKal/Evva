import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from '../../../models/IUser';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() user: IUser | null = null;

  constructor(private router: Router) {}

  getProfileLink(): string {
    const type = localStorage.getItem('type');
    return type === 'supplier' ? '/profile/supplier' : '/profile/user';
  }

  logout(): void {
    
    const confirmed = confirm('Are you sure you want to logout?');
    if (!confirmed) return;
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('type');
    this.router.navigate(['/login']);
  }
}
