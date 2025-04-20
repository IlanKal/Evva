import { v4 as uuidv4 } from 'uuid';
import EventRequestRepository from '../repositories/EventRequestRepository';

export type QuestionType = 'text' | 'number' | 'date' | 'time' | 'yes_no' | 'multiple_choice' | 'message';

export interface ConversationQuestion {
  id: string;
  questionText: string;
  type: QuestionType;
  options?: string[];
  dependsOn?: {
    questionId: string;
    expectedAnswer: any;
  };
}

const conversationScript: ConversationQuestion[] = [
  {
    id: 'companyName',
    questionText: "Hello! I'm EVVA, here to assist with planning your corporate event. Let's start with a few quick questions\nWhat is your company's name?",
    type: 'text',
  },
  {
    id: 'eventDate',
    questionText: 'What is the event date?',
    type: 'date',
  },
  {
    id: 'eventStartTime',
    questionText: 'What is the event start time?',
    type: 'time',
  },
  {
    id: 'eventDurationHours',
    questionText: 'How many hours will the event last?',
    type: 'number',
  },
  {
    id: 'guestCount',
    questionText: 'How many guests are expected?',
    type: 'number',
  },
  {
    id: 'eventType',
    questionText: 'What type of event are you planning?',
    type: 'multiple_choice',
    options: ['conference', 'Seminar', 'Corporate event', 'Product launch', 'Customer event'],
  },
  {
    id: 'eventBudget',
    questionText: 'What is the total event budget?',
    type: 'number',
  },
  {
    id: 'needVenue',
    questionText: 'Will you need help finding a venue?',
    type: 'yes_no',
  },
  {
    id: 'venueArea',
    questionText: 'In which area would you like to hold the event?',
    type: 'multiple_choice',
    options: ['Center', 'South', 'North'],
    dependsOn: {
      questionId: 'needVenue',
      expectedAnswer: true,
    },
  },
  {
    id: 'venueParking',
    questionText: 'Will you need parking for guests?',
    type: 'yes_no',
    dependsOn: {
      questionId: 'needVenue',
      expectedAnswer: true,
    },
  },
  {
    id: 'needCatering',
    questionText: 'Will you need catering services?',
    type: 'yes_no',
  },
  {
    id: 'cateringKosher',
    questionText: 'Should the catering be kosher?',
    type: 'yes_no',
    dependsOn: {
      questionId: 'needCatering',
      expectedAnswer: true,
    },
  },
  {
    id: 'cateringVegetarian',
    questionText: 'Do you require vegetarian options?',
    type: 'yes_no',
    dependsOn: {
      questionId: 'needCatering',
      expectedAnswer: true,
    },
  },
  {
    id: 'cateringVegan',
    questionText: 'Do you require vegan options?',
    type: 'yes_no',
    dependsOn: {
      questionId: 'needCatering',
      expectedAnswer: true,
    },
  },
  {
    id: 'cateringGlutenFree',
    questionText: 'Do you require gluten-free options?',
    type: 'yes_no',
    dependsOn: {
      questionId: 'needCatering',
      expectedAnswer: true,
    },
  },
  {
    id: 'needPhotography',
    questionText: 'Will you need a photographer?',
    type: 'yes_no',
  },
  {
    id: 'photoMagneticPrints',
    questionText: 'Would you like magnetic photo prints?',
    type: 'yes_no',
    dependsOn: {
      questionId: 'needPhotography',
      expectedAnswer: true,
    },
  },
  {
    id: 'photoRegular',
    questionText: 'Would you like regular photos?',
    type: 'yes_no',
    dependsOn: {
      questionId: 'needPhotography',
      expectedAnswer: true,
    },
  },
  {
    id: 'photoVideoRecording',
    questionText: 'Would you like a video recording?',
    type: 'yes_no',
    dependsOn: {
      questionId: 'needPhotography',
      expectedAnswer: true,
    },
  },
  {
    id: 'needDJ',
    questionText: 'Will you need a DJ for the event?',
    type: 'yes_no',
  },
  {
    id: 'djMusicGenres',
    questionText: 'Which music genres would you like?',
    type: 'multiple_choice',
    options: ['Pop', 'Rock', 'Jazz', 'Electronic', 'Classical', 'Hip-hop', 'Other'],
    dependsOn: {
      questionId: 'needDJ',
      expectedAnswer: true,
    },
  },
  {
    id: 'endMessage',
    questionText: "EVVA: Thank you for sharing all the details! I'm starting the search for the best suppliers for your event and will get back to you very soon with great options.",
    type: 'message',
  },
];

class EventConversationService {
  private static conversations: Record<string, any> = {};

  static async continueConversation(input: {
    userId?: number;
    conversationId?: string;
    answer?: Record<string, any>;
  }) {
    const { userId, conversationId, answer } = input;

    if (userId && !conversationId) {
      const newId = uuidv4();
      this.conversations[newId] = { user_id: userId, answers: {} };
      return {
        conversationId: newId,
        completed: false,
        question: this.findNextQuestion(newId),
      };
    }

    if (conversationId && this.conversations[conversationId]) {
      const answerKey = answer && Object.keys(answer).length > 0 ? Object.keys(answer)[0] : null;
      const currentQuestion = this.findNextQuestion(conversationId);

      if (answerKey && answer) {
        let inputVal = answer[answerKey];
        const originalQuestion = conversationScript.find(q => q.id === answerKey);

        if (originalQuestion?.type === 'yes_no' && typeof inputVal === 'string') {
          const lower = inputVal.trim().toLowerCase();
          if (lower === 'true') inputVal = true;
          else if (lower === 'false') inputVal = false;
        }

        const isValid = originalQuestion ? this.validateAnswer(originalQuestion, inputVal) : true;
        if (!isValid) {
          return {
            conversationId,
            completed: false,
            question: originalQuestion,
            error: 'Invalid answer. Please try again.',
          };
        }

        this.conversations[conversationId].answers = {
          ...this.conversations[conversationId].answers,
          [answerKey]: inputVal,
        };
      }

      const next = this.findNextQuestion(conversationId);

      if (next?.id === 'endMessage') {
        const requestId = await this.finalizeEventRequest(conversationId);
        return { completed: true, question: next, requestId };
      }

      if (!next) {
        const requestId = await this.finalizeEventRequest(conversationId);
        const endMessage = conversationScript.find(q => q.id === 'endMessage');
        return { completed: true, question: endMessage, requestId };
      }

      return { conversationId, completed: false, question: next };
    }

    throw new Error('Invalid conversation state');
  }

  private static validateAnswer(question: ConversationQuestion, value: any): boolean {
    switch (question.type) {
      case 'number':
        return typeof value === 'number' && !isNaN(value);
      case 'yes_no':
        return typeof value === 'boolean';
      case 'multiple_choice':
        return question.options?.includes(value) ?? false;
      case 'text':
        return typeof value === 'string' && value.trim().length > 0;
      case 'date':
        return /^\d{4}-\d{2}-\d{2}$/.test(value);
      case 'time':
        return /^\d{2}:\d{2}$/.test(value);
      default:
        return true;
    }
  }

  private static findNextQuestion(conversationId: string): ConversationQuestion | null {
    const allAnswers = this.conversations[conversationId].answers;
    for (const question of conversationScript) {
      if (question.id in allAnswers) continue;
      if (!question.dependsOn || allAnswers[question.dependsOn.questionId] === question.dependsOn.expectedAnswer) {
        return question;
      }
    }
    return null;
  }

  private static async finalizeEventRequest(conversationId: string): Promise<number> {
    const { user_id, answers } = this.conversations[conversationId];

    console.log('\n🔎 Finalizing conversation with the following data:');
    console.log('User ID:', user_id);
    console.log('Answers:', JSON.stringify(answers, null, 2));

    const eventRequest = await EventRequestRepository.create({
      user_id,
      event_type: answers['eventType'],
      event_date: answers['eventDate'],
      budget: answers['eventBudget'],
      guest_count: answers['guestCount'],
      location_preferences: answers['needVenue']
        ? {
            area: answers['venueArea'],
            parking: answers['venueParking'],
          }
        : undefined,
      catering_preferences: answers['needCatering']
        ? {
            kosher: answers['cateringKosher'],
            vegetarian: answers['cateringVegetarian'],
            vegan: answers['cateringVegan'],
            gluten_free: answers['cateringGlutenFree'],
          }
        : undefined,
      photographer_preferences: answers['needPhotography']
        ? {
            magnetic_prints: answers['photoMagneticPrints'],
            regular_photos: answers['photoRegular'],
            video_recording: answers['photoVideoRecording'],
          }
        : undefined,
      dj_preferences: answers['needDJ']
        ? {
            genres: answers['djMusicGenres'],
          }
        : undefined,
      additional_notes: answers['additional_notes'] || null,
      status: 'finalized',
    });

    return eventRequest.request_id;
  }
}

export default EventConversationService;
