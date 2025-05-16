import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IChatStep } from '../models/IChatStep';

@Injectable({ providedIn: 'root' })
export class ChatMockService {
    private currentStep = 0;

    private script: IChatStep[] = [
        { message: 'Welcome! What is the name of your event?', inputType: 'text' },
        { message: 'How many participants do you expect?', inputType: 'select', options: ['Up to 50', '50-100', 'Over 100'] },
        { message: 'Do you require catering services?', inputType: 'radio', options: ['Yes', 'No'] },
        { message: 'Select the services you are interested in:', inputType: 'checkbox', options: ['DJ', 'Photographer', 'Speaker', 'Location'] },
        { message: 'Thank you! We are processing your request.', inputType: 'end' }
    ];

    getNextQuestion(): Observable<IChatStep> {
        const step = this.script[this.currentStep] || { message: 'Conversation finished!', inputType: 'end' };
        return of(step).pipe(delay(500));
    }

    submitAnswer(answer: any) {
        this.currentStep++;
    }
}
