import { Component, Input, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from '../../../models/IUser';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NotificationService } from './../../../services/notification.service';
import { SupplierService } from '../../../services/supplier.service';

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

export class HeaderComponent implements OnInit{
  @Input() user: IUser | null = null;

  notifications: { message: string; eventId: number }[] = [];
  showDropdown = false;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private supplierService: SupplierService
  ) {}


  async ngOnInit() {
    if (!this.user) return;

    // שליפה ראשונית של התראות
    await this.loadNotifications();

    // 🔁 בדיקה חוזרת כל 30 שניות (30000 מ”ש)
    setInterval(() => {
      this.loadNotifications();
    }, 300000);
  }

   // ✅ פונקציה לשליפת התראות לפי סוג המשתמש
  private async loadNotifications() {
  const userType = localStorage.getItem('type');
  const userId = userType === 'supplier'
    ? Number(localStorage.getItem('supplierId'))
    : Number(localStorage.getItem('userId'));

  console.log('🔍 userType:', userType);
  console.log('🔍 userId:', userId);

  if (userType === 'supplier') {
    this.notifications = await this.notificationService.getSupplierNotifications(userId);

    // ✅ נוסיף את שליפת שם הספק
    const supplier = await this.supplierService.getSupplierById(userId);
    if (this.user) {
      this.user.name = supplier.name;
    }
  } else {
    this.notifications = await this.notificationService.getUserNotifications(userId);
  }

  console.log('📢 Notifications:', this.notifications);
}


  goToEvent(eventId: number) {
    const userType = localStorage.getItem('type');
    if (userType === 'supplier') {
      this.router.navigate(['/supplier-home']); 
    } else {
      this.router.navigate(['/my-events']);
    }
    this.showDropdown = false;
  }

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

  navigateHome(): void {
  const userType = localStorage.getItem('type');
  if (userType === 'supplier') {
    this.router.navigateByUrl('/supplier-home');
  } else {
    this.router.navigateByUrl('/my-events');
  }
}
}
