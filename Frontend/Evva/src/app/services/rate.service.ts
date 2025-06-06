import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface RatingPayload {
  guest_id?: number;
  user_id?: number;
  event_id: number;
  ratings: {
    supplier_id: number;
    rating: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class RateService {
  constructor(private http: HttpClient) {}

  // Get suppliers for a guest
  getSuppliersForGuest(guestId: number, eventId: number) {
    return this.http.get<{ suppliers: any[] }>(
      `${environment.apiUrl}/api/suppliers/rate?type=guest&id=${guestId}&event_id=${eventId}`
    );
  }

  // Get suppliers for a user
  getSuppliersForUser(userId: number, eventId: number) {
    return this.http.get<{ suppliers: any[] }>(
      `${environment.apiUrl}/api/suppliers/rate?type=user&id=${userId}&event_id=${eventId}`
    );
  }

  // Submit ratings for guest or user
  submitRatings(data: RatingPayload) {
    return this.http.post(`${environment.apiUrl}/api/rate/multi`, data);
  }

  // Check if a guest has already rated
  hasGuestRated(guestId: number, eventId: number) {
    return this.http.get<boolean>(
      `${environment.apiUrl}/api/rate/has-rated?guest_id=${guestId}&event_id=${eventId}`
    );
  }
}
