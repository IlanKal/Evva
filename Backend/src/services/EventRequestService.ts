import { v4 as uuidv4 } from 'uuid';
import EventRequestRepository from '../repositories/EventRequestRepository';
import { estimateMinimumBudget } from '../utils/budgetEstimator';
import { EVENT_TYPES } from '../constants/eventTypes';
import { REGIONS } from '../constants/regions';
import { MUSIC_STYLES } from '../constants/musicStyles';


export type QuestionType = 'text' | 'number' | 'date' | 'time' | 'yes_no' | 'multiple_choice' | 'single_choice' | 'end';

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

const casualPhrases = {
  early: [
    "Let's move on to the next one!",
    "Alright, here's another question.",
    "Thanks! Let's keep going.",
    "Great! Ready for the next?",
    "Okay, next step coming up.",
    "Let’s get to know more about your event.",
    "Cool, let’s go on!",
    "Perfect. Another quick one:",
  ],
  mid: [
    "Got it! Moving on.",
    "Perfect, let's keep going.",
    "Noted. Let's continue.",
    "Thanks for that. Next one!",
    "Appreciate it! Let’s go on.",
    "Alright, continuing with the next detail.",
    "Great. Let’s keep rolling.",
    "Let’s proceed to the next part.",
  ],
  late: [
    "Almost there! Here's the next.",
    "Good stuff! Let’s proceed.",
    "Thanks! Just a few more left.",
    "You’re doing great, next question!",
    "We’re close to finishing up!",
    "One last detail before we wrap up.",
    "Let’s finish strong!",
    "Nearly done. Just a couple more.",
  ]
};


const conversationScript: ConversationQuestion[] = [
  {
    id: 'title',
    questionText: "Hello! I'm EVVA, here to assist with planning your corporate event. Let's start with a few quick questions!\n  What is the name of the event?",
    type: 'text',
  },  
  {
    id: 'companyName',
    questionText: "What is your company's name?",
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
    type: 'single_choice',
    options: [...EVENT_TYPES],
  },
  {
    id: 'location',
    questionText: 'In which area would you like to hold the event?',
    type: 'single_choice',
    options: [...REGIONS],
  },
  {
    id: 'needVenue',
    questionText: 'Will you need help finding a venue?',
    type: 'yes_no',
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
    options: [...MUSIC_STYLES],
    dependsOn: {
      questionId: 'needDJ',
      expectedAnswer: true,
    },
  },
  {
    id: 'needSpeaker',
    questionText: 'Will you need a speaker for the event?',
    type: 'yes_no',
  },
  {
    id: 'eventBudget',
    questionText: 'What is the total event budget?',
    type: 'number',
  },
  {
    id: 'additional_notes',
    questionText: 'Any additional notes or special requests?',
    type: 'text',
  },  
  {
    id: 'endMessage',
    questionText: "EVVA: Thank you for sharing all the details! I'm starting the search for the best suppliers for your event and will get back to you very soon with great options.",
    type: 'end',
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

        if (!originalQuestion) {
          return {
            conversationId,
            completed: false,
            error: 'Unknown question. Please try again.',
          };
        }

        if (originalQuestion.type === 'yes_no' && typeof inputVal === 'string') {
          const lower = inputVal.trim().toLowerCase();
          if (lower === 'true') inputVal = true;
          else if (lower === 'false') inputVal = false;
        }

        if (answerKey === 'eventBudget') {
          const minBudget = await estimateMinimumBudget(this.conversations[conversationId].answers);
          if (Number(inputVal) < minBudget) {
            return {
              conversationId,
              completed: false,
              question: originalQuestion,
              error: `The minimum required budget based on your selections is ${minBudget}₪. Please enter a higher amount.`,
            };
          }
        }

        const isValid = this.validateAnswer(originalQuestion, inputVal);
        if (!isValid) {
          const errorMessages = [
            "Hmm... that didn’t go through 😅 Let’s try again.",
            "Oops! That answer doesn’t look quite right 🤔 Give it another shot.",
            "I couldn’t process that one, Mind trying again?",
            "Something’s off with that response 😕 Let’s fix it together.",
            "Looks like that wasn’t what I expected 😅 Can you rephrase it?",
          ];
          const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];

          return {
            conversationId,
            completed: false,
            question: {
              ...originalQuestion,
              questionText: `${randomError}\n${originalQuestion.questionText}`,
            },
            error: 'Invalid answer. Please try again.',
          };
        }

        this.conversations[conversationId].answers = {
          ...this.conversations[conversationId].answers,
          [answerKey]: inputVal,
        };
      }

      const next = this.findNextQuestion(conversationId);

      if (next?.id === 'eventBudget') {
        const minBudget = await estimateMinimumBudget(this.conversations[conversationId].answers);
        next.questionText = `What is the total event budget? (Note: based on your selections, the minimum required is ${minBudget}₪)`;

        return {
          conversationId,
          completed: false,
          question: {
            ...next,
            meta: {
              minBudget,
            },
          },
        };
      }

      if (next?.id === 'endMessage') {
        const requestId = await this.finalizeEventRequest(conversationId);
        return { completed: true, question: next, requestId };
      }

      if (!next) {
        const requestId = await this.finalizeEventRequest(conversationId);
        const endMessage = conversationScript.find(q => q.id === 'endMessage');
        return { completed: true, question: endMessage, requestId };
      }

      let lastPhrase: string | null = null;

      function getRandomPhrase(stage: 'early' | 'mid' | 'late'): string {
        const options = casualPhrases[stage];
        const filtered = lastPhrase ? options.filter(p => p !== lastPhrase) : options;
        const selected = filtered[Math.floor(Math.random() * filtered.length)];
        lastPhrase = selected;
        return selected;
      }
      
      const isTitle = next.id === 'title';
      const isEnd = next.id === 'endMessage';
      
      const totalQuestions = conversationScript.filter(q => q.type !== 'end' && q.id !== 'endMessage').length;
      const answered = Object.keys(this.conversations[conversationId].answers).length;
      const progress = answered / totalQuestions;
      
      let stage: 'early' | 'mid' | 'late' = 'mid';
      if (progress < 0.3) stage = 'early';
      else if (progress > 0.8) stage = 'late';
      
      const phrase = !isTitle && !isEnd ? getRandomPhrase(stage) : '';

      return {
        conversationId,
        completed: false,
        question: {
          ...next,
          questionText: phrase ? `${phrase}\n${next.questionText}` : next.questionText
        }
      };
    }

    throw new Error('Invalid conversation state');
  }

  private static validateAnswer(question: ConversationQuestion, value: any): boolean {
    switch (question.type) {
      case 'number':
        return typeof value === 'number' && !isNaN(value) && value > 0;

      case 'yes_no':
        return typeof value === 'boolean';

      case 'single_choice':
        return typeof value === 'string' && (question.options?.includes(value) ?? false);

      case 'multiple_choice': {
        let values: string[] = [];

        if (typeof value === 'string') {
          values = value.split(',').map(v => v.trim());
        } else if (Array.isArray(value)) {
          values = value;
        } else {
          return false;
        }

        return values.every(v => question.options?.includes(v));
      }

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
      title: answers['title'],
      company_name: answers['companyName'],
      event_start_time: answers['eventStartTime'],
      event_duration_hours: answers['eventDurationHours'],
      location: answers['location'], 
      location_preferences: answers['needVenue']
        ? {
            area: answers['location'],
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
            has_magnets: answers['photoMagneticPrints'],
            has_stills: answers['photoRegular'],
            has_video: answers['photoVideoRecording'],
          }
        : undefined,      
        dj_preferences: answers['needDJ']
        ? {
            music_styles: Array.isArray(answers['djMusicGenres'])
              ? answers['djMusicGenres']
              : typeof answers['djMusicGenres'] === 'string'
              ? answers['djMusicGenres'].split(',').map((s: string) => s.trim())
              : [],
          }
        : undefined,      
      lecturer_preferences: answers['needSpeaker'] ? { required: true } : undefined,
      additional_notes: answers['additional_notes'] || null,
    });

    return eventRequest.request_id;
  }
}

export default EventConversationService;
