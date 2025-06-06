import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  // ---------- USER ----------
  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}`);
  }

  updateUser(userId: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}`, data);
  }

  // ---------- SUPPLIER ----------
  getSupplierById(supplierId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/suppliers/${supplierId}`);
  }

  updateSupplier(supplierId: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/suppliers/${supplierId}`, data);
  }
}
