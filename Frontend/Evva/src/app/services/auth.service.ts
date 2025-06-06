import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginPayload {
  email: string;
  password: string;
  role: string;
}

interface RegisterUserPayload {
  full_name: string;
  email: string;
  password: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, payload);
  }

  registerUser(payload: RegisterUserPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/register-user`, payload);
  }

  registerSupplier(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register-supplier`, payload);
  }

  registerSupplierDetails(payload: {
  supplier_id: number;
  supplier_type: string;
  details: any;
}): Observable<any> {
  return this.http.post(`${this.baseUrl}/register-supplier-details`, payload);
}
}
