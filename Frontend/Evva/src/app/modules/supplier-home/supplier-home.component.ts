import { Component, OnInit } from '@angular/core';
import { EventSupplierService } from '../../services/event-supplier.service';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { HeaderComponent } from './../shared/header/header.component';

@Component({
  selector: 'app-supplier-home',
  standalone: true,
  templateUrl: './supplier-home.component.html',
  styleUrls: ['./supplier-home.component.scss'],
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule, HeaderComponent] 
})
export class SupplierHomeComponent implements OnInit {
  supplierId: number = 0;
  activeEvents: any[] = [];
  futureEvents: any[] = [];
  declinedEvents: any[] = [];
  pastEvents: any[] = [];

  user: any = null; 

  constructor(private eventService: EventSupplierService) {}

  ngOnInit(): void {
    // שליפת פרטי המשתמש מה־localStorage
    this.user = {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      phone: localStorage.getItem('phone')
    };

    // טעינת מזהה הספק
    this.supplierId = Number(localStorage.getItem('supplierId'));
    console.log('📦 Loaded supplierId:', this.supplierId);

    if (!this.supplierId || isNaN(this.supplierId)) {
      console.error('❌ supplierId is missing or invalid in localStorage');
      return;
    }

    // שליפת האירועים לדשבורד
    this.eventService.getDashboard(this.supplierId).subscribe({
      next: (data) => {
        console.log('✅ Fetched dashboard events:', data);
        this.activeEvents = data.active.filter((e: any) => e.status === 'CHOSEN');
        this.futureEvents = data.active.filter((e: any) => e.status === 'APPROVED');
        this.declinedEvents = data.rejected;
        this.pastEvents = data.past;
      },
      error: (err) => {
        console.error('❌ Failed to fetch dashboard events:', err);
      }
    });
  }

  approveEvent(eventId: number): void {
    this.eventService.confirmSupplier(eventId, this.supplierId).subscribe({
      next: (res) => {
        console.log('✔️ האירוע אושר:', res.message);
        this.ngOnInit(); // טוען מחדש את האירועים
        alert('✔️ האירוע אושר בהצלחה');
      },
      error: (err) => {
        console.error('❌ שגיאה באישור:', err);
        alert('שגיאה באישור האירוע');
      }
    });
  }

  declineEvent(eventId: number): void {
    this.eventService.declineSupplier(eventId, this.supplierId).subscribe({
      next: (res) => {
        console.log('⚠️ האירוע נדחה:', res.message);
        this.ngOnInit(); // טוען מחדש את האירועים
        alert('⚠️ האירוע נדחה');
      },
      error: (err) => {
        console.error('❌ שגיאה בדחייה:', err);
        alert('שגיאה בדחיית האירוע');
      }
    });
  }
}
