import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private userSubject = new BehaviorSubject<IUser | null>(null);

  get user$(): Observable<IUser | null> {
    return this.userSubject.asObservable();
  }

  get currentUser(): IUser | null {
    return this.userSubject.value;
  }

  setUser(user: IUser) {
    this.userSubject.next(user);
  }

  clearUser() {
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }
}
