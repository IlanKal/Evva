import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

export interface Event {
  event_id: number;
  title: string;
  date: string;
  status: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {
  @Input() event!: Event;
}
