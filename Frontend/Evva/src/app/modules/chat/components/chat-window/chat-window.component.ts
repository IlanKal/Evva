import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; // לייבא את FormsModule
import { mockChat } from '../../../../models/mock-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, CommonModule], // הוספת FormsModule
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent {
  chatMessages = mockChat;
  newMessage: string = ''; // הוספת משתנה ל-ngModel

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatMessages.push({ sender: 'User', message: this.newMessage });
      this.newMessage = ''; // ניקוי התיבה לאחר שליחה
    }
  }
}
