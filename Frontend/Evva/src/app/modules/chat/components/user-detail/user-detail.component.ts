import { Component } from '@angular/core';
import { mockUser } from '../../../../models/mock-data';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  user = mockUser;

  createEvent() {
    alert('Event creation not implemented yet!');
  }
}
