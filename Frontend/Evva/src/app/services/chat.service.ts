import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ChatStep {
  message: string;
  inputType: 'text' | 'radio' | 'checkbox' | 'select';
  options?: string[];
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private currentStep = 0;
  private answers: any[] = [];

  constructor(private http: HttpClient) {}

  getNextQuestion(): Observable<ChatStep> {
    return this.http.post<ChatStep>('/api/chat', {
      currentStep: this.currentStep,
      answers: this.answers,
    });
  }

  submitAnswer(answer: any) {
    this.answers.push(answer);
    this.currentStep++;
  }
}
