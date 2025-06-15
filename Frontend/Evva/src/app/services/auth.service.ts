import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserStateService } from './user-state.service';

interface LoginPayload {
  email: string;
  password: string;
  type: 'user' | 'supplier';
  rememberMe: boolean;
}

interface LoginResponse {
  id: number;
  type: 'user' | 'supplier';
  accessToken: string;
  refreshToken: string;
  email: string;
  full_name: string;
  phone: string;
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

  constructor(private http: HttpClient, private userState: UserStateService) { }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload).pipe(
      tap((res) => {
        // Save tokens in localStorage
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('userId', res.id.toString());
        localStorage.setItem('type', res.type);


        // Update in-memory user state
        this.userState.setUser({
          user_id: res.id,
          email: res.email,
          name: res.full_name,
          phone: res.phone,
        });
      })
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('type');

    this.userState.clearUser();
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  refreshAccessToken(): Observable<{ accessToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<{ accessToken: string }>(`${this.baseUrl}/refresh`, { refreshToken });
  }
  registerUser(payload: RegisterUserPayload): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/register-user`, payload);
}

registerSupplier(data: any): Observable<{ supplier_id: number }> {
  return this.http.post<{ supplier_id: number }>(
    `${this.baseUrl}/register-supplier`, data
  );
}

registerSupplierDetails(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/register-supplier-details`, data);
}

refreshToken(refreshToken: string): Observable<{ accessToken: string, refreshToken: string }> {
  return this.http.post<{ accessToken: string, refreshToken: string }>(
    '/api/refresh-token',
    { refreshToken }
  );
}

}
