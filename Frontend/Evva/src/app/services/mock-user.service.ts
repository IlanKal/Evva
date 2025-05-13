import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  user_id: number;
  name: string;
  avatarUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockUserService {
  constructor() {}

  getCurrentUser(): Observable<User> {
    const mockUser: User = {
      user_id: 1,
      name: 'John Doe',
      avatarUrl: 'assets/images/user-avatar.png'
    };

    return of(mockUser);
  }
}
