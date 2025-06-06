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
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from '../shared/header/header.component';
import { IUser } from '../../models/IUser';
import { GuestUploadComponent } from './guest-upload/guest-upload.component';
import { IGuest } from '../../models/iGuest';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

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

  constructor(
    private route: ActivatedRoute,
    private eventResultsService: EventResultsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const requestId = params.get('requestId');
      if (requestId) {
        this.requestId = +requestId;
        this.loadOverview();
        this.loadEventIdIfExists();
        this.fetchResults();
      }
    });
  }

  overviewForm!: FormGroup;
  requestId: number = Number(localStorage.getItem('requestId'));

  loadEventIdIfExists(): void {
    this.eventResultsService.getEventByRequestId(this.requestId).subscribe({
      next: (data) => {
        if (data?.event_id) {
          this.eventId = data.event_id;
          this.fetchResults();
          console.log('Event ID for this request is:', this.eventId);
        }
      },
      error: (err) => {
        console.warn('No event found for this request yet');
      }
    });
  }

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

    if (payload.lecturer_preferences && payload.lecturer_preferences.required === false) {
      payload.lecturer_preferences = null;
    }

    this.eventResultsService.updateEventRequestOverview(this.requestId, payload).subscribe(() => {
      this.updateMilestoneStatus('overview', 'approved');
      this.moveToNextMilestone();
    });
  }

  fetchResults() {
    this.eventResultsService.getEventResults(this.eventId).subscribe((data) => {
      const overviewMilestone: IMilestone = { category: 'overview', status: 'pending' };
      const guestsMilestone: IMilestone = { category: 'guests', status: 'pending' };
  
      const dynamicMilestones: IMilestone[] = data.steps.map((step: any) => ({
        category: step.category,
        status: step.status
      }));
  
      this.milestones = [overviewMilestone, ...dynamicMilestones, guestsMilestone];
  
      this.suppliersMap = {};
      for (let step of data.steps) {
        this.suppliersMap[step.category] = step.suppliers;
      }
  
      this.activeCategory = this.milestones[0].category;
    });
  }
  

  onMilestoneClick(category: string) {
    this.activeCategory = category;
  }

  onChooseSupplier(supplierId: number) {
    this.eventResultsService
      .chooseSupplier(this.eventId, this.activeCategory, supplierId)
      .subscribe(() => {
        this.updateMilestoneStatus(this.activeCategory, 'waiting');
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



}
