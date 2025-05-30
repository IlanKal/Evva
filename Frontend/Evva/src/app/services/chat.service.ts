import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ServerQuestion {
  id: string;
  questionText: string;
  type: 'text' | 'number' | 'date' | 'time' | 'yes_no' | 'multiple_choice' | 'single_choice' | 'message' | 'end';
  options?: string[];
  errorMessage?: string;
  meta?: any;
}

export interface ServerResponse {
  conversationId: string;
  completed: boolean;
  question: ServerQuestion;
  requestId?: number;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private conversationId: string | null = null;
  private eventRequestId: number | null = null;

  constructor(private http: HttpClient) {}

  getNextQuestion(answer?: Record<string, any>): Observable<ServerResponse> {
    const userId = localStorage.getItem('userId');
    const payload: any = this.conversationId
      ? { conversationId: this.conversationId, answer }
      : { userId: Number(userId) };

    return this.http.post<ServerResponse>(`${environment.apiUrl}/api/conversation`, payload).pipe(
      map(res => {
        this.conversationId = res.conversationId;
        if (res.requestId) this.eventRequestId = res.requestId;
        return res;
      })
    );
  }

  getCurrentEventId(): number | null {
    return this.eventRequestId;
  }
}
