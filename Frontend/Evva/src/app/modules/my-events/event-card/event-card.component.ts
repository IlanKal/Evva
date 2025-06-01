import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface Event {
  event_id: number;
  requestId: number;
  title: string;
  date: string;
  status: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {
  @Input() event!: Event;
  @Output() deleteEvent = new EventEmitter<number>(); // שולח את requestId

  constructor(private router: Router) {}

  navigateToDetails(): void {
    this.router.navigate(['/event-results', this.event.requestId]);
  }

  confirmDelete(e: MouseEvent): void {
    e.stopPropagation();
    const confirm1 = confirm('Are you sure you want to delete this event?');
    if (confirm1) {
        this.deleteEvent.emit(this.event.event_id);
      }
    }
  }

