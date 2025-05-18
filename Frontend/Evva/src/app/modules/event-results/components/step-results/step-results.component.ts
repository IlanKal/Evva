import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISupplier } from '../../../../models/ISupplier';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-step-results',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './step-results.component.html',
  styleUrl: './step-results.component.scss'
})
export class StepResultsComponent {
  @Input() category!: string;
  @Input() suppliers!: ISupplier[];
  @Input() selectedSupplierId?: number;

  @Output() supplierChosen = new EventEmitter<number>();
  @Output() rejectedAll = new EventEmitter<void>();

  chooseSupplier(id: number) {
    this.supplierChosen.emit(id);
  }

  rejectAll() {
    this.rejectedAll.emit();
  }
}
