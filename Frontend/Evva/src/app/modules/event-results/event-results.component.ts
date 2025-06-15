import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISupplier } from '../../models/ISupplier';
import { EventResultsService } from '../../services/event-results.service';
import { IMilestone } from '../../models/IMilestone';
import { CommonModule } from '@angular/common';
import { StepResultsComponent } from './components/step-results/step-results.component';
import { MilestoneComponent } from './components/milestone/milestone.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from '../shared/header/header.component';
import { IUser } from '../../models/IUser';
import { GuestUploadComponent } from './guest-upload/guest-upload.component';
import { IGuest } from '../../models/iGuest';
import { IEventSupplier } from '../../models/IEventSupplier';
import { EventStep } from '../../services/event-results.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import confetti from 'canvas-confetti';
import { Router } from '@angular/router';



@Component({
  selector: 'app-event-results',
  standalone: true,
  imports: [CommonModule,
    MilestoneComponent,
    StepResultsComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,
    HeaderComponent,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    GuestUploadComponent],
  templateUrl: './event-results.component.html',
  styleUrls: ['./event-results.component.scss']
})
export class EventResultsComponent implements OnInit {
  eventId!: number;
  milestones: IMilestone[] = [];
  suppliersMap: Record<string, ISupplier[]> = {};
  activeCategory!: string;
  eventDate: Date = new Date(); // ברירת מחדל
  guestList: string[] = [];
  guestInput: string = '';
  user!: IUser | null;
  disablesMilestones: boolean = true;
  isLocked: boolean = false;
  isCompleted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventResultsService: EventResultsService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const requestId = params.get('requestId');
      if (requestId) {
        this.requestId = +requestId;
        this.loadOverviewAndThen(() => this.loadEventIdIfExists());
      }
    });
  }

  loadOverviewAndThen(callback: () => void): void {
    this.eventResultsService.getEventRequestOverview(this.requestId).subscribe((data) => {
      this.isLocked = data.is_locked;

      this.overviewForm = this.fb.group({
        company_name: [data.company_name || ''],
        title: [data.title || ''],
        event_date: [data.event_date],
        budget: [data.budget],
        guest_count: [data.guest_count],
        event_type: [data.event_type || ''],
        event_start_time: [data.event_start_time || ''],
        event_duration_hours: [data.event_duration_hours || null],
        additional_notes: [data.additional_notes || ''],

        need_catering: [!!data.catering_preferences],
        catering_preferences: this.fb.group({
          vegan: [data.catering_preferences?.vegan ?? false],
          kosher: [data.catering_preferences?.kosher ?? false],
          vegetarian: [data.catering_preferences?.vegetarian ?? false],
          gluten_free: [data.catering_preferences?.gluten_free ?? false],
        }),

        need_photographer: [!!data.photographer_preferences],
        photographer_preferences: this.fb.group({
          has_stills: [data.photographer_preferences?.has_stills ?? false],
          has_video: [data.photographer_preferences?.has_video ?? false],
          has_magnets: [data.photographer_preferences?.has_magnets ?? false],
        }),

        need_dj: [!!data.dj_preferences],
        dj_preferences: this.fb.group({
          music_styles: [data.dj_preferences?.music_styles || []],
        }),

        need_location: [!!data.location_preferences],
        location_preferences: this.fb.group({
          area: [data.location_preferences?.area || ''],
          parking: [data.location_preferences?.parking ?? false],
        }),

        need_lecturer: [!!data.lecturer_preferences],
        lecturer_preferences: this.fb.group({
          required: [data.lecturer_preferences?.required ?? false],
        }),
      });

      if (this.isLocked) {
        this.overviewForm.disable();
        this.disablesMilestones = false;
      }

      // ניקוי שדות כשכיבוי שירותים
      this.overviewForm.get('need_catering')?.valueChanges.subscribe(val => {
        if (!val) this.overviewForm.get('catering_preferences')?.reset({
          vegan: false, kosher: false, vegetarian: false, gluten_free: false
        });
      });

      this.overviewForm.get('need_photographer')?.valueChanges.subscribe(val => {
        if (!val) this.overviewForm.get('photographer_preferences')?.reset({
          has_stills: false, has_video: false, has_magnets: false
        });
      });

      this.overviewForm.get('need_dj')?.valueChanges.subscribe(val => {
        if (!val) this.overviewForm.get('dj_preferences')?.reset({
          music_styles: []
        });
      });

      this.overviewForm.get('need_location')?.valueChanges.subscribe(val => {
        if (!val) this.overviewForm.get('location_preferences')?.reset({
          area: '', parking: false
        });
      });

      this.overviewForm.get('need_lecturer')?.valueChanges.subscribe(val => {
        if (!val) this.overviewForm.get('lecturer_preferences')?.reset({
          required: false
        });
      });

      callback();
    });
  }


  overviewForm!: FormGroup;
  requestId: number = Number(localStorage.getItem('requestId'));
  selectedSupplierId?: number;

  loadEventIdIfExists(): void {
    this.eventResultsService.getEventByRequestId(this.requestId).subscribe({
      next: (data) => {
        this.eventId = data.event_id;
        console.log('Event ID for this request is:', this.eventId);
        this.fetchResults();
      },
      error: (err) => {
        if (err.status === 404) {
          console.warn('Event not found, creating new one...');
          this.eventResultsService.createEventFromRequest(this.requestId).subscribe({
            next: (created) => {
              this.eventId = created.event_id;
              console.log('New event created with ID:', this.eventId);
              this.fetchResults();
            },
            error: (createErr) => {
              console.error('Failed to create event from request:', createErr);
            }
          });
        } else {
          console.error('Failed to check event existence:', err);
        }
      }
    });

    this.checkIfAllMilestonesApprovedAndUpdate();
  }

  supplier_status_by_type: Record<string, { status: 'NOT_CHOSEN' | 'PENDING' | 'APPROVED' | 'DECLINED' }> = {};

  readonly EVENT_TYPES = [
    "Conference",
    "Seminar",
    "Corporate event",
    "Product launch",
    "Customer event"
  ];

  readonly MUSIC_STYLES = [
    "Pop",
    "Rock",
    "House",
    "Techno",
    "Hip-hop",
    "Jazz",
    "Classical",
    "Israeli",
    "EDM",
    "Dance",
    "Latin",
    "Salsa",
    "Reggaeton"
  ];

  readonly REGIONS = ["Center", "North", "South", "All"];

  loadOverview(): void {
    this.eventResultsService.getEventRequestOverview(this.requestId).subscribe((data) => {
      this.overviewForm = this.fb.group({
        company_name: [data.company_name || ''],
        title: [data.title || ''],
        event_date: [data.event_date],
        budget: [data.budget],
        guest_count: [data.guest_count],
        event_type: [data.event_type || ''],
        event_start_time: [data.event_start_time || ''],
        event_duration_hours: [data.event_duration_hours || null],
        additional_notes: [data.additional_notes || ''],

        need_catering: [!!data.catering_preferences],
        catering_preferences: this.fb.group({
          vegan: [data.catering_preferences?.vegan ?? false],
          kosher: [data.catering_preferences?.kosher ?? false],
          vegetarian: [data.catering_preferences?.vegetarian ?? false],
          gluten_free: [data.catering_preferences?.gluten_free ?? false],
        }),

        need_photographer: [!!data.photographer_preferences],
        photographer_preferences: this.fb.group({
          has_stills: [data.photographer_preferences?.has_stills ?? false],
          has_video: [data.photographer_preferences?.has_video ?? false],
          has_magnets: [data.photographer_preferences?.has_magnets ?? false],
        }),

        need_dj: [!!data.dj_preferences],
        dj_preferences: this.fb.group({
          music_styles: [data.dj_preferences?.music_styles || []],
        }),

        need_location: [!!data.location_preferences],
        location_preferences: this.fb.group({
          area: [data.location_preferences?.area || ''],
          parking: [data.location_preferences?.parking ?? false],
        }),

        need_lecturer: [!!data.lecturer_preferences],
        lecturer_preferences: this.fb.group({
          required: [data.lecturer_preferences?.required ?? false],
        }),
      });

      // מנקים ערכים כשמשתמש מכבה שירותים
      this.overviewForm.get('need_catering')?.valueChanges.subscribe(val => {
        if (!val) this.overviewForm.get('catering_preferences')?.reset({
          vegan: false, kosher: false, vegetarian: false, gluten_free: false
        });
      });

      this.overviewForm.get('need_photographer')?.valueChanges.subscribe(val => {
        if (!val) this.overviewForm.get('photographer_preferences')?.reset({
          has_stills: false, has_video: false, has_magnets: false
        });
      });

      this.overviewForm.get('need_dj')?.valueChanges.subscribe(val => {
        if (!val) this.overviewForm.get('dj_preferences')?.reset({
          music_styles: []
        });
      });

      this.overviewForm.get('need_location')?.valueChanges.subscribe(val => {
        if (!val) this.overviewForm.get('location_preferences')?.reset({
          area: '', parking: false
        });
      });

      this.overviewForm.get('need_lecturer')?.valueChanges.subscribe(val => {
        if (!val) this.overviewForm.get('lecturer_preferences')?.reset({
          required: false
        });
      });
    });
  }

  onSubmitOverview(): void {
    this.disablesMilestones = false;
    const payload = { ...this.overviewForm.value };

    if (!payload.need_dj || payload.dj_preferences?.music_styles?.length === 0) {
      payload.dj_preferences = null;
    }

    if (!payload.need_catering || !Object.values(payload.catering_preferences || {}).some(v => v)) {
      payload.catering_preferences = null;
    }

    if (!payload.need_photographer || !Object.values(payload.photographer_preferences || {}).some(v => v)) {
      payload.photographer_preferences = null;
    }

    if (!payload.need_location || !payload.location_preferences?.area) {
      payload.location_preferences = null;
    }

    if (!payload.need_lecturer || payload.lecturer_preferences?.required === false) {
      payload.lecturer_preferences = null;
    }

    payload.is_locked = true;

    this.eventResultsService.updateEventRequestOverview(this.requestId, payload).subscribe(() => {
      this.updateMilestoneStatus('overview', 'approved');
      this.moveToNextMilestone();
    });
  }


  fetchResults() {
    const previousCategory = this.activeCategory;
    this.eventResultsService.getEventResults(this.eventId).subscribe((data) => {
      const overviewMilestone: IMilestone = {
        category: 'overview',
        status: this.isLocked ? 'approved' : 'pending'
      };

    this.eventResultsService.getEventStatus(this.eventId).subscribe((event) => {
      this.isCompleted = event.status === 'COMPLETED';
    });

      const guestsMilestone: IMilestone = { category: 'guests', status: 'pending' };
      const steps: EventStep[] = [];

      const guestCount = this.overviewForm?.get('guest_count')?.value ?? 1;
      const duration = this.overviewForm?.get('event_duration_hours')?.value ?? 1;

      this.supplier_status_by_type = data.supplier_status_by_type || {};

      for (const category of Object.keys(data.supplier_status_by_type)) {
        const entry = data.supplier_status_by_type[category];

        const suppliers = entry.suppliers.map((s: any) => {
          let price = 0;

          const pricePerPerson = s.price_per_person
            ?? s.caterings?.[0]?.price_per_person
            ?? null;

          const pricePerHour = s.price_per_hour
            ?? s.djs?.[0]?.price_per_hour
            ?? s.photographers?.[0]?.price_per_hour
            ?? null;

          const pricePerLecture = s.price_per_lecture
            ?? s.speakers?.[0]?.price_per_lecture
            ?? null;

          const priceFlat = s.price ?? s.locations?.[0]?.price ?? null;

          if (category === 'catering' && pricePerPerson) {
            price = +pricePerPerson * guestCount;
          } else if (['dj', 'photographer'].includes(category) && pricePerHour) {
            price = +pricePerHour * duration;
          } else if (category === 'speaker' && pricePerLecture) {
            price = +pricePerLecture;
          } else if (category === 'location' && priceFlat) {
            price = +priceFlat;
          }

          return {
            id: s.supplier_id,
            name: s.name,
            supplier_type: s.supplier_type,
            price,
            price_per_hour: +pricePerHour || null,
            price_per_person: +pricePerPerson || null,
            price_per_lecture: +pricePerLecture || null,
            imageUrl: s.image_url,
            description: s.additional_info || s.description || '',
            approval_status: s.approval_status,
            contact_info: s.contact_info ?? '',
            region: s.region ?? '',
            rating: s.rating ?? null,
            rating_count: s.rating_count ?? 0,
            available_days: s.available_days ?? [],

            djs: s.djs ?? [],
            caterings: s.caterings ?? [],
            photographers: s.photographers ?? [],
            speakers: s.speakers ?? [],
            locations: s.locations ?? []
          };
        });

        steps.push({
          category,
          status: entry.status || 'pending',
          suppliers
        });
      }

      const dynamicMilestones: IMilestone[] = steps.map((step) => ({
        category: step.category,
        status: step.status
      }));

      this.milestones = [overviewMilestone, ...dynamicMilestones, guestsMilestone];

      this.suppliersMap = {};
      for (let step of steps) {
        this.suppliersMap[step.category] = step.suppliers;
      }

      if (this.milestones.some(m => m.category === previousCategory)) {
        this.activeCategory = previousCategory;
      } else {
        this.activeCategory = this.milestones[0].category;
      }

      this.eventResultsService.getGuestsByEventId(this.eventId).subscribe((guests) => {
      if (guests.length > 0) {
        const guestMilestone = this.milestones.find(m => m.category === 'guests');
        if (guestMilestone) {
          guestMilestone.status = 'approved';
        }
      }
      });
    });
  }


  onMilestoneClick(category: string) {
    this.activeCategory = category;
  }

  onChooseSupplier(supplierId: number) {
    console.log('[EVENT RESULTS] Choosing supplier ID:', supplierId, 'for event:', this.eventId);

    this.eventResultsService.chooseSupplier(this.eventId, supplierId).subscribe({
      next: () => {
        console.log('[EVENT RESULTS] Supplier successfully chosen, re-fetching results');
        this.fetchResults();
      },
      error: (err) => {
        console.error('[EVENT RESULTS] Error choosing supplier:', err);
      }
    });
  }


  onRejectAll() {
    console.log('User rejected all suppliers for', this.activeCategory);
    this.updateMilestoneStatus(this.activeCategory, 'rejected');
  }

  updateMilestoneStatus(category: string, newStatus: 'waiting' | 'approved' | 'rejected') {
    this.milestones = this.milestones.map(m =>
      m.category === category ? { ...m, status: newStatus } : m
    );

     this.checkIfAllMilestonesApprovedAndUpdate();
  }

  checkIfAllMilestonesApprovedAndUpdate(): void {
  const allApproved = this.milestones.every(m => m.status.toLowerCase() === 'approved');
  if (allApproved && this.eventId) {
    this.eventResultsService.updateEventStatus(this.eventId, 'SCHEDULED').subscribe({
      next: () => console.log('✅ Event status updated to SCHEDULED'),
      error: (err) => console.error('❌ Failed to update event status to SCHEDULED:', err)
    });
  }
}

  isCategoryWithSuppliers(category: string): boolean {
    return !!this.suppliersMap[category];
  }

  onDateChosen(date: Date) {
    if (!date) return;
    this.eventDate = date;
    this.updateMilestoneStatus('date', 'approved');
    this.moveToNextMilestone();
  }

  onGuestListSubmit() {
    const newGuests = this.guestInput
      .split('\n')
      .map(g => g.trim())
      .filter(g => g && !this.guestList.includes(g));

    if (newGuests.length > 0) {
      this.guestList.push(...newGuests);
      this.guestInput = '';
      this.updateMilestoneStatus('guests', 'approved');
      this.moveToNextMilestone();
    }
  }

  moveToNextMilestone(): void {
    const currentIndex = this.milestones.findIndex(m => m.category === this.activeCategory);
    const nextMilestone = this.milestones[currentIndex + 1];

    if (nextMilestone) {
      this.activeCategory = nextMilestone.category;
    }
  }

  onGuestsConfirmed(guests: IGuest[]) {
    this.guestList = guests.map(g => g.full_name);
    this.updateMilestoneStatus('guests', 'approved');
    this.moveToNextMilestone();
  }

  editingField: string | null = null;

  startEdit(field: string) {
    this.editingField = field;
  }

  cancelEdit() {
    this.editingField = null;
  }

  saveEdit(field: string, value: any) {
    this.overviewForm.get(field)?.setValue(value);
    this.editingField = null;
  }
  toggleService(controlName: string): void {
    const control = this.overviewForm.get(controlName);
    if (control) {
      const newValue = !control.value;
      control.setValue(newValue);

      // Optional: initialize the relevant preference group if turned on
      if (newValue) {
        switch (controlName) {
          case 'need_dj':
            this.overviewForm.patchValue({
              dj_preferences: { music_styles: [] }
            });
            break;
          case 'need_catering':
            this.overviewForm.patchValue({
              catering_preferences: {
                vegan: false,
                kosher: false,
                vegetarian: false,
                gluten_free: false
              }
            });
            break;
          case 'need_photographer':
            this.overviewForm.patchValue({
              photographer_preferences: {
                has_stills: false,
                has_video: false,
                has_magnets: false
              }
            });
            break;
          case 'need_location':
            this.overviewForm.patchValue({
              location_preferences: {
                area: null,
                parking: false
              }
            });
            break;
          case 'need_lecturer':
            this.overviewForm.patchValue({
              lecturer_preferences: {
                required: false
              }
            });
            break;
        }
      }
    }
  }

  onFinishEvent(): void {
    const userId = Number(localStorage.getItem('userId')); // או מהמשתמש המחובר

    if (!this.eventId || !userId) {
      console.error('Missing eventId or userId');
      return;
    }

    this.eventResultsService.finishEvent(this.eventId).subscribe({
      next: () => {
        console.log('✅ Event marked as finished');
        window.location.href = `/rate-page/user/${userId}/${this.eventId}`;
      },
      error: (err) => {
        console.error('❌ Failed to finish event', err);
      }
    });
  }

  finishEvent(): void {
    const confirmed = confirm("Are you sure you want to finish the event? Please make sure the event has already taken place.");
    if (!confirmed) return;

    this.eventResultsService.finishEvent(this.eventId).subscribe({
      next: () => {
        // === רקע לבן עם fade-in ===
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = '#fff';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease-in-out';
        overlay.style.zIndex = '9998';
        document.body.appendChild(overlay);
        requestAnimationFrame(() => {
          overlay.style.opacity = '0.95';
        });

        // === הודעה ===
        const message = document.createElement('div');
        message.innerText = '🎊 Event successfully finished! 🎊';
        message.style.position = 'fixed';
        message.style.top = '40%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.padding = '30px 60px';
        message.style.background = 'transparent';
        message.style.borderRadius = '16px';
        message.style.fontSize = '36px';
        message.style.fontWeight = 'bold';
        message.style.color = '#333';
        message.style.zIndex = '10001';
        message.style.opacity = '0';
        message.style.transition = 'opacity 0.4s ease-in-out';
        document.body.appendChild(message);
        requestAnimationFrame(() => {
          message.style.opacity = '1';
        });

        // === קונפטי בקנבס ===
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '10000';
        document.body.appendChild(canvas);

        const myConfetti = confetti.create(canvas, { resize: true });
        myConfetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });

        // === סאונד 🎵 ===
        const audio = new Audio('assets/sounds/Confetti _Sound_ effect.mp3');
        audio.play().catch(err => console.warn('Audio play failed:', err));

        // === אחרי שנייה - עדכון DB + ניווט
        setTimeout(() => {
          this.eventResultsService.updateEventStatus(this.eventId, 'COMPLETED').subscribe({
            next: () => {
              console.log('✅ Event status set to COMPLETED');
              message.remove();
              overlay.remove();
              canvas.remove();
              const userId = localStorage.getItem('userId');
              this.router.navigate([`/rate-page/user/${userId}/${this.eventId}`]);
            },
            error: (err) => {
              console.error('❌ Failed to update event status:', err);
              alert('Failed to update event status. Please try again.');
            }
          });
        }, 3000);
      },
      error: (err) => {
        console.error('❌ Failed to finish event:', err);
        alert('Something went wrong. Please try again.');
      }
    });
  }

  markMilestoneApproved(category: string) {
    const milestone = this.milestones.find(m => m.category === category);
    if (milestone) {
      milestone.status = 'approved';
    }
  }


}
