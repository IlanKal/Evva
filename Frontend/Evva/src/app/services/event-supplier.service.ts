// event-supplier.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventSupplierService {
  private baseUrl = 'http://localhost:3000/api/event-suppliers';

  constructor(private http: HttpClient) {}

  getDashboard(supplierId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${supplierId}/dashboard`);
  }
  

 confirmSupplier(event_id: number, supplier_id: number): Observable<any> {
  return this.http.post('http://localhost:3000/api/event-suppliers/event-suppliers/confirm', {
    event_id,
    supplier_id
  });
}

declineSupplier(event_id: number, supplier_id: number): Observable<any> {
  return this.http.post('http://localhost:3000/api/event-suppliers/event-suppliers/decline', {
    event_id,
    supplier_id
  });
}
}
