import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISupplier } from '../models/ISupplier';



export interface EventStep {
    category: string;
    status: 'pending' | 'waiting' | 'approved' | 'rejected';
    suppliers: ISupplier[];
}

@Injectable({ providedIn: 'root' })
export class EventResultsService {
    constructor() { }

    getEventResults(eventId: number): Observable<{ steps: EventStep[] }> {
        const mock: EventStep[] = [
            {
                category: 'location',
                status: 'pending',
                suppliers: [
                    {
                        id: 1,
                        name: 'Tel Aviv Venue',
                        price: 5000,
                        city: 'Tel Aviv',
                        imageUrl: 'https://via.placeholder.com/300x180.png?text=Location+1',
                        description: 'Modern venue with full AV equipment.'
                    },
                    {
                        id: 2,
                        name: 'Rooftop TLV',
                        price: 4800,
                        city: 'Tel Aviv',
                        imageUrl: 'https://via.placeholder.com/300x180.png?text=Location+2',
                        description: 'Open air with skyline view.'
                    },
                    {
                        id: 3,
                        name: 'Classic Hall',
                        price: 4500,
                        city: 'Ramat Gan',
                        imageUrl: 'https://via.placeholder.com/300x180.png?text=Location+3',
                        description: 'Classic interior, good for 100 guests.'
                    }
                ]
            },
            {
                category: 'catering',
                status: 'pending',
                suppliers: [
                    {
                        id: 4,
                        name: 'Foodies Catering',
                        price: 120,
                        city: 'Petah Tikva',
                        imageUrl: 'https://via.placeholder.com/300x180.png?text=Catering+1',
                        description: 'Gourmet meals with vegan options.'
                    },
                    {
                        id: 5,
                        name: 'ChefBox',
                        price: 135,
                        city: 'Tel Aviv',
                        imageUrl: 'https://via.placeholder.com/300x180.png?text=Catering+2',
                        description: 'Chef-prepared live stations.'
                    },
                    {
                        id: 6,
                        name: 'Family Style',
                        price: 100,
                        city: 'Holon',
                        imageUrl: 'https://via.placeholder.com/300x180.png?text=Catering+3',
                        description: 'Homestyle buffet, kosher certified.'
                    }
                ]
            },
            {
                category: 'dj',
                status: 'pending',
                suppliers: [
                    {
                        id: 7,
                        name: 'DJ Max',
                        price: 3000,
                        city: 'Herzliya',
                        imageUrl: 'https://via.placeholder.com/300x180.png?text=DJ+1',
                        description: 'Club-style beats, lights included.'
                    },
                    {
                        id: 8,
                        name: 'SoundWaves',
                        price: 2800,
                        city: 'Netanya',
                        imageUrl: 'https://via.placeholder.com/300x180.png?text=DJ+2',
                        description: '90s, 2000s and Israeli hits.'
                    },
                    {
                        id: 9,
                        name: 'DJ Liron',
                        price: 2700,
                        city: 'Tel Aviv',
                        imageUrl: 'https://via.placeholder.com/300x180.png?text=DJ+3',
                        description: 'Experienced in corporate events.'
                    }
                ]
            }
        ];

        return of({ steps: mock });
    }

    chooseSupplier(eventId: number, category: string, supplierId: number): Observable<any> {
        console.log(`Mock choosing supplier ${supplierId} for category "${category}" in event ${eventId}`);
        return of({ success: true });
    }
}
