import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISupplier } from '../../models/ISupplier';
import { EventResultsService } from '../../services/event-results.service';
import { IMilestone } from '../../models/IMilestone';
import { CommonModule } from '@angular/common';
import { StepResultsComponent } from './components/step-results/step-results.component';
import { MilestoneComponent } from './components/milestone/milestone.component';

@Component({
  selector: 'app-event-results',
  standalone: true,
  imports: [CommonModule, MilestoneComponent, StepResultsComponent],
  templateUrl: './event-results.component.html',
  styleUrls: ['./event-results.component.scss']
})
export class EventResultsComponent implements OnInit {
  eventId!: number;
  milestones: IMilestone[] = [];
  suppliersMap: Record<string, ISupplier[]> = {};
  activeCategory!: string;

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
      this.milestones = data.steps.map((step: any) => ({
        category: step.category,
        status: step.status
      }));

      this.suppliersMap = {};
      for (let step of data.steps) {
        this.suppliersMap[step.category] = step.suppliers;
      }

      this.activeCategory = data.steps[0].category;
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

  updateMilestoneStatus(category: string, newStatus: 'waiting' | 'approved') {
    this.milestones = this.milestones.map(m =>
      m.category === category ? { ...m, status: newStatus } : m
    );
  }

  onRejectAll() {
    // אפשר לפתוח דיאלוג או פשוט לשנות סטטוס/להשאיר ריק
    console.log('User rejected all suppliers for', this.activeCategory);
  }
}
