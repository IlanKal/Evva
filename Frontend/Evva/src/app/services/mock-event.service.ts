import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Event {
  event_id: number;
  title: string;
  date: string;
  status: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockEventService {
  constructor() {}

  getUserEvents(): Observable<Event[]> {
    const mockEvents: Event[] = [
      {
        event_id: 101,
        title: 'Company Annual Meeting',
        date: '2025-06-20',
        status: 'Scheduled',
        imageUrl: 'assets/images/event1.jpg'
      },
      {
        event_id: 102,
        title: 'Product Launch Party',
        date: '2025-07-10',
        status: 'Planning',
        imageUrl: 'assets/images/event2.jpg'
      }
    ];

    return of(mockEvents);
  }
}
