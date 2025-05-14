import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginPayload {
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth'; // שנה לפי השרת שלך

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, payload);
  }
}
