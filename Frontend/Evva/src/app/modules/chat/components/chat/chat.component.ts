import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatMockService } from '../../../../services/chat-mock.service';
import { HeaderComponent } from '../../../shared/header/header.component';
import { IChatStep } from '../../../../models/IChatStep';
import { DynamicInputComponent } from '../../../shared/dynamic-input/dynamic-input.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, DynamicInputComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: { from: 'bot' | 'user', text: string }[] = [];
  currentStep!: IChatStep;
  userAnswer: any = '';

  constructor(
    private chatService: ChatMockService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadNextQuestion();
  }

  get safeInputType(): 'text' | 'radio' | 'checkbox' | 'select' {
    if (!this.currentStep || this.currentStep.inputType === 'end') {
      return 'text';
    }
    return this.currentStep.inputType;
  }

  loadNextQuestion() {
    this.chatService.getNextQuestion().subscribe(step => {
      if (step.inputType === 'end') {
        this.messages.push({ from: 'bot', text: 'That’s it! Thank you for your input.' });
        this.currentStep = step;

        // 👇 כאן מתבצעת ההפניה למסך התוצאות
        const eventId = this.chatService.getCurrentEventId(); // שים לב! מחזיר mock כרגע
        setTimeout(() => {
          this.router.navigate(['/event-results', eventId]);
        }, 1500);

        return;
      }

      this.currentStep = step;
      this.messages.push({ from: 'bot', text: step.message });

      // reset userAnswer based on input type
      if (step.inputType === 'checkbox') {
        this.userAnswer = {};
        step.options?.forEach(opt => this.userAnswer[opt] = false);
      } else {
        this.userAnswer = '';
      }
    });
  }

  sendAnswer() {
    if (this.userAnswer === '' || this.userAnswer === null) return;

    const answerText = typeof this.userAnswer === 'object'
      ? JSON.stringify(this.userAnswer)
      : this.userAnswer;

    this.messages.push({ from: 'user', text: answerText });

    this.chatService.submitAnswer(this.userAnswer);
    this.userAnswer = '';
    this.loadNextQuestion();
  }
}
