import { Component } from '@angular/core';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { ChatWindowComponent } from '../chat-window/chat-window.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [UserDetailComponent, ChatWindowComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent { }
