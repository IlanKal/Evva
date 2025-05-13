import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockUserService, User } from '../../services/mock-user.service';
import { MockEventService, Event } from '../../services/mock-event.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { EventsListComponent } from './events-list/events-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule, HeaderComponent, EventsListComponent, MatIconModule, MatButtonModule],
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {

  user: User | null = null;
  events: Event[] = [];
  loading: boolean = true;

  constructor(
    private userService: MockUserService,
    private eventService: MockEventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;

        this.eventService.getUserEvents().subscribe({
          next: (events) => {
            this.events = events;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error loading events', err);
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error loading user', err);
        this.loading = false;
      }
    });
  }

  navigateToCreateEvent() {
    this.router.navigate(['/chat']);

  }
}
