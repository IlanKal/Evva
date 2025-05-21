import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ServerResponse } from '../../../../services/chat.service';
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
  @ViewChild('chatBottom') chatBottom!: ElementRef;

  messages: { from: 'bot' | 'user', text: string }[] = [];
  currentStep!: IChatStep & { id?: string };
  userAnswer: any = '';
  errorText: string | null = null;

  constructor(
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadNextQuestion();
  }

  get safeInputType(): 'text' | 'radio' | 'checkbox' | 'select' | 'number' | 'date' | 'time' {
    if (!this.currentStep || this.currentStep.inputType === 'end') {
      return 'text';
    }
    return this.currentStep.inputType;
  }

  loadNextQuestion(answer?: Record<string, any>) {
    this.chatService.getNextQuestion(answer).subscribe({
      next: (res: ServerResponse) => {
        const q = res.question;

        if (q.type === 'message' || res.completed) {
          this.messages.push({ from: 'bot', text: q.questionText });
          this.scrollToBottom();

          const eventId = this.chatService.getCurrentEventId();
          setTimeout(() => {
            if (eventId) {
              this.router.navigate(['/event-results', eventId]);
            }
          }, 2000);
          return;
        }

        this.currentStep = {
          id: q.id,
          message: q.questionText,
          inputType: this.mapInputType(q.type),
          options: q.options || []
        };

        if (q.errorMessage) {
          this.messages.push({ from: 'bot', text: q.errorMessage });
        }

        this.messages.push({ from: 'bot', text: q.questionText });
        this.scrollToBottom();

        this.userAnswer = this.currentStep.inputType === 'checkbox'
          ? Object.fromEntries((this.currentStep.options || []).map(opt => [opt, false]))
          : '';
      },
      error: () => {
        this.messages.push({ from: 'bot', text: '❌ Something went wrong. Please try again later.' });
        this.scrollToBottom();
      }
    });
  }

  sendAnswer() {
    if (this.userAnswer === '' || this.userAnswer === null) return;

    let answerText: string;
    if (this.safeInputType === 'checkbox') {
      const selected = Object.entries(this.userAnswer).filter(([_, v]) => v).map(([k]) => k);
      answerText = selected.join(', ');
    } else if (typeof this.userAnswer === 'boolean') {
      answerText = this.userAnswer ? 'Yes' : 'No';
    } else {
      answerText = this.userAnswer;
    }

    this.messages.push({ from: 'user', text: answerText });
    this.scrollToBottom();

    const questionId = this.currentStep?.id;
    if (!questionId) return;

    const answerPayload = { [questionId]: this.userAnswer };
    this.userAnswer = '';
    this.loadNextQuestion(answerPayload);
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.chatBottom?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  private mapInputType(serverType: string): 'text' | 'radio' | 'checkbox' | 'select' | 'number' | 'date' | 'time' {
    switch (serverType) {
      case 'yes_no': return 'radio';
      case 'number': return 'number';
      case 'date': return 'date';
      case 'time': return 'time';
      case 'multiple_choice': return 'checkbox';
      case 'single_choice': return 'select';
      default: return 'text';
    }
  }
}
