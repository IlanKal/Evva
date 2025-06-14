import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private BASE_URL = `${environment.apiUrl}/api`; 

  constructor(private http: HttpClient) {}
getSupplierNotifications(supplierId: number): Promise<{ message: string; eventId: number }[]> {
  return this.http
    .get<{ message: string; eventId: number }[]>(`${this.BASE_URL}/notifications/supplier/${supplierId}`)
    .toPromise()
    .then((res) => res ?? []); // אם undefined, נחזיר []
}

getUserNotifications(userId: number): Promise<{ message: string; eventId: number }[]> {
  return this.http
    .get<{ message: string; eventId: number }[]>(`${this.BASE_URL}/notifications/user/${userId}`)
    .toPromise()
    .then((res) => res ?? []);
}
}
