import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { IMilestone } from '../../../../models/IMilestone';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-milestone',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatTooltipModule, MatButtonModule],
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent {
  @Input() milestones!: IMilestone[];
  @Input() activeCategory!: string;
  @Input() disablesMilestones: boolean = true;
  @Input() showFinishEvent: boolean = false;

  @Output() milestoneClicked = new EventEmitter<string>();
  @Output() finishEventClicked = new EventEmitter<void>();

  getIcon(status: string): string {
    switch (status) {
      case 'approved': return 'check_circle';
      case 'waiting': return 'hourglass_empty';
      case 'rejected': return 'cancel';
      default: return 'radio_button_unchecked';
    }
  }

  getColor(status: string): string {
    switch (status) {
      case 'approved': return 'green';
      case 'waiting': return 'orange';
      case 'rejected': return 'red';
      default: return 'gray';
    }
  }

  select(category: string) {
    this.milestoneClicked.emit(category);
  }

  onFinishClick() {
    this.finishEventClicked.emit();
  }
}
