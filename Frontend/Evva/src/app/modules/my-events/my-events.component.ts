import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { EventsListComponent } from './events-list/events-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Event, EventService } from '../../services/event.service';
import { UserStateService } from '../../services/user-state.service';
import { IUser } from '../../models/iUser';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule, HeaderComponent, EventsListComponent, MatIconModule, MatButtonModule],
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {

  events: Event[] = [];
  loading: boolean = true;
  user!: IUser | null;

  constructor(
    private eventService: EventService,
    private router: Router,
    private userState: UserStateService
  ) { }

  ngOnInit(): void {
    this.user = this.userState.currentUser;

    if (!this.user) {
      // אין משתמש בזיכרון — נניח שפג התוקף של הטוקן או הרענון נכשל
      this.router.navigate(['/login']);
      return;
    }

    this.loadData(this.user.user_id);
  }

  loadData(userId: number): void {
    this.loading = true;

    this.eventService.getUserEvents(userId).subscribe({
      next: (events) => {
        this.events = events;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading events', err);
        this.loading = false;
      }
    });
  }

  navigateToCreateEvent() {
    this.router.navigate(['/chat']);
  }
}
