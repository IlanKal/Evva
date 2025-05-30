import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../../../services/event.service';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, EventCardComponent],
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent {
  @Input() events: Event[] = [];

  constructor(private eventService: EventService) {}

  onDeleteEvent(eventId: number): void {
    this.eventService.deleteEvent(eventId).subscribe({
      next: () => {
        this.events = this.events.filter(e => e.event_id !== eventId);
      },
      error: (err) => {
        console.error('❌ Failed to delete event', err);
        alert('Failed to delete the event. Please try again later.');
      }
    });
  }
}
