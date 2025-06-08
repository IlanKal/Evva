import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISupplier } from '../models/ISupplier';
import { environment } from '../../environments/environment';
import { IGuest } from '../models/iGuest';

export interface EventStep {
  category: string;
  status: 'pending' | 'waiting' | 'approved' | 'rejected';
  suppliers: ISupplier[];
}

@Injectable({ providedIn: 'root' })
export class EventResultsService {
  constructor(private http: HttpClient) {}

  getEventByRequestId(requestId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/events/by-request/${requestId}`);
  }

  createEventFromRequest(requestId: number): Observable<{ event_id: number }> {
    return this.http.post<{ event_id: number }>(`${environment.apiUrl}/api/events/create-from-request/${requestId}`, {});
  }

  getEventRequestOverview(requestId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/event-request/${requestId}`);
  }

  updateEventRequestOverview(requestId: number, payload: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/event-request/${requestId}`, payload);
  }

  chooseSupplier(eventId: number, supplierId: number): Observable<any> {
    console.log('[SERVICE] Sending POST to /choose with:', { event_id: eventId, supplier_id: supplierId });
    return this.http.post(`${environment.apiUrl}/api/event-suppliers/event-suppliers/choose`, {
      event_id: eventId,
      supplier_id: supplierId
    });
  }

  getEventResults(eventId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/event-suppliers/status/${eventId}`);
  }

  // guests part
  uploadGuestsFile(eventId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${environment.apiUrl}/api/guest-upload/upload/${eventId}`, formData);
  }

  getGuestsByEventId(eventId: number): Observable<IGuest[]> {
    return this.http.get<IGuest[]>(`${environment.apiUrl}/api/guests/by-event/${eventId}`);
  }

  updateGuest(guestId: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/guests/${guestId}`, data);
  }

  deleteGuest(guestId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/guests/${guestId}`);
  }
}
