import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Event {
  event_id: number;
  requestId: number;
  title: string;
  type: string;
  date: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) {}

  getUserEvents(userId: number): Observable<Event[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/events/user/${userId}`).pipe(
      map((events: any[]): Event[] =>
        events.map((event: any): Event => ({
          event_id: event.event_id,
          requestId: event.event_request_id,
          title: event.title,
          type: event.event_type,
          date: event.event_date,
          status: event.status,
        }))
      )
    );
  }
  
  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/events/${eventId}`);
  }
  
}
