import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISupplier } from '../../../../models/ISupplier';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-step-results',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule
  ],
  templateUrl: './step-results.component.html',
  styleUrl: './step-results.component.scss'
})
export class StepResultsComponent {
  @Input() category!: string;
  @Input() suppliers!: ISupplier[];
  @Input() selectedSupplierId?: number;

  @Output() supplierChosen = new EventEmitter<number>();
  @Output() rejectedAll = new EventEmitter<void>();

  selectSupplier(id: number) {
    this.selectedSupplierId = id;
  }

  confirmSelection() {
    if (this.selectedSupplierId != null) {
      this.supplierChosen.emit(this.selectedSupplierId);
    }
  }

  rejectAll() {
    this.rejectedAll.emit();
  }
}
