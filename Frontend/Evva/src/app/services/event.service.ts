import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Event {
  event_id: number;
  title: string;
  date: string;
  status: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) {}

  getUserEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('/api/events/my');
  }
}
