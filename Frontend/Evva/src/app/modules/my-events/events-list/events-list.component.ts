import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event, EventCardComponent } from '../event-card/event-card.component';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, EventCardComponent],
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent {
  @Input() events: Event[] = [];
}
