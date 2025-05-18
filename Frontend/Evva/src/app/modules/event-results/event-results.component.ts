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
    MatButtonModule],
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


  constructor(
    private route: ActivatedRoute,
    private eventResultsService: EventResultsService
  ) { }

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    this.fetchResults();
  }

  fetchResults() {
    this.eventResultsService.getEventResults(this.eventId).subscribe((data) => {
      const staticMilestones: IMilestone[] = [
        { category: 'date', status: 'pending' },
        { category: 'guests', status: 'pending' }
      ];

      const dynamicMilestones: IMilestone[] = data.steps.map((step: any) => ({
        category: step.category,
        status: step.status
      }));

      this.milestones = [...staticMilestones, ...dynamicMilestones];

      this.suppliersMap = {};
      for (let step of data.steps) {
        this.suppliersMap[step.category] = step.suppliers;
      }

      // תמיד מתחילים בקטגוריה הראשונה
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

}
