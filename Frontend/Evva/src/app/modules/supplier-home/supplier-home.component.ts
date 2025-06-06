import { Component, OnInit } from '@angular/core';
import { EventSupplierService } from '../../services/event-supplier.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { HeaderComponent } from './././../shared/header/header.component';

@Component({
  selector: 'app-supplier-home',
  standalone: true,
  templateUrl: './supplier-home.component.html',
  styleUrls: ['./supplier-home.component.scss'],
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule,HeaderComponent] 
})
export class SupplierHomeComponent implements OnInit {
  supplierId = Number(localStorage.getItem('supplierId'));
  activeEvents: any[] = [];
  futureEvents: any[] = [];
  declinedEvents: any[] = [];
  pastEvents: any[] = [];

   user: any = null; 

  constructor(private eventService: EventSupplierService) {}

  ngOnInit(): void {
    // שליפת פרטי הספק מה־localStorage
    this.user = {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      phone: localStorage.getItem('phone')
    };

    // שליפת ה־ID
    this.supplierId = Number(localStorage.getItem('userId'));

    // טעינת האירועים
    this.eventService.getDashboard(this.supplierId).subscribe((data) => {
      this.activeEvents = data.active.filter((e: any) => e.status === 'CHOSEN');
      this.futureEvents = data.active.filter((e: any) => e.status === 'APPROVED');
      this.declinedEvents = data.rejected;
      this.pastEvents = data.past;
    });
  }

  approveEvent(eventId: number): void {
  this.eventService.confirmSupplier(eventId, this.supplierId).subscribe({
    next: (res) => {
      console.log('אושר:', res.message);
      this.ngOnInit();
      // אופציונלי: הסתרת האירוע מהרשימה או סימון כמאושר
      this.activeEvents = this.activeEvents.filter(e => e.event_id !== eventId);
      alert('✔️ האירוע אושר בהצלחה');
    },
    error: (err) => {
      console.error('שגיאה באישור:', err);
      alert('❌ שגיאה באישור האירוע');
    }
  });
}

declineEvent(eventId: number): void {
  this.eventService.declineSupplier(eventId, this.supplierId).subscribe({
    next: (res) => {
      console.log('נדחה:', res.message);
      this.ngOnInit();
      this.activeEvents = this.activeEvents.filter(e => e.event_id !== eventId);
      alert('⚠️ האירוע נדחה');
    },
    error: (err) => {
      console.error('שגיאה בדחייה:', err);
      alert('❌ שגיאה בדחיית האירוע');
    }
  });
}

}
