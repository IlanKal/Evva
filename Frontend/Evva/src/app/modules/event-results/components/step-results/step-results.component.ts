import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { IEventResultSupplier } from '../../../../models/IEventResultSupplier';
import { SupplierDetailsDialogComponent } from '../../supplier-details/supplier-details-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';



@Component({
  selector: 'app-step-results',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatDialogModule,
    SupplierDetailsDialogComponent
  ],
  templateUrl: './step-results.component.html',
  styleUrls: ['./step-results.component.scss']
})
export class StepResultsComponent implements OnChanges {

  @Input() category!: string;
  @Input() suppliers!: IEventResultSupplier[];
  @Input() guestCount: number = 1;
  @Input() eventDurationHours: number = 1;
  @Input() selectedSupplierId?: number;
  @Input() stepStatus!: 'NOT_CHOSEN' | 'PENDING' | 'APPROVED' | 'DECLINED';
  @Output() supplierChosen = new EventEmitter<number>();
  @Output() rejectedAll = new EventEmitter<void>();

  preferredSupplier: IEventResultSupplier | null = null;
  alternativeSuppliers: IEventResultSupplier[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('suppliers' in changes && this.suppliers?.length) {
      console.log('[CHANGES] Suppliers:', this.suppliers.map(s => ({
        name: s.name,
        price: s.price
      })));

      const chosen = this.suppliers.find(s => s.approval_status === 'CHOSEN')
        || this.suppliers.find(s => s.approval_status === 'SUGGESTED')
        || this.suppliers[0];

      this.preferredSupplier = chosen ?? null;
      this.selectedSupplierId ??= chosen?.id;

      this.alternativeSuppliers = this.suppliers.filter(s => s.id !== chosen?.id);
    }
  }

  getSupplierButtonState(supplier: IEventResultSupplier): {
    disabled: boolean,
    label: string,
    cssClass: string
  } {
    switch (supplier.approval_status) {
      case 'APPROVED':
        return { disabled: true, label: 'Supplier approved ✔️', cssClass: 'approved-button' };
  
      case 'CHOSEN':
        return { disabled: true, label: 'Waiting for approval ⌛', cssClass: 'pending-button' };
  
      case 'DECLINED':
        return { disabled: true, label: 'Request declined ✖️', cssClass: 'declined-button' };
  
      default:
        return { disabled: false, label: 'Choose this supplier', cssClass: 'default-button' };
    }
  }
  

  openDetails(event: MouseEvent, supplier: IEventResultSupplier): void {
    event.stopPropagation();
    this.dialog.open(SupplierDetailsDialogComponent, {
      data: supplier,
      width: '600px',
      autoFocus: false
    });
  }
  

  selectSupplier(id: number) {
    const selected = this.suppliers.find(s => s.id === id);
    if (!selected) return;

    this.preferredSupplier = selected;
    this.selectedSupplierId = id;
    this.alternativeSuppliers = this.suppliers.filter(s => s.id !== id);
  }

  confirmSelection(supplier: IEventResultSupplier) {
    console.log('[STEP] Confirming selection for supplier:', supplier.id, supplier.approval_status, 'Step status:', this.stepStatus);
  
    if (supplier.approval_status === 'APPROVED') {
      console.log('[STEP] Supplier is already approved – cannot change selection');
      return;
    }
  
    this.selectedSupplierId = supplier.id;
    this.preferredSupplier = supplier;
    this.alternativeSuppliers = this.suppliers.filter(s => s.id !== supplier.id);
  
    this.supplierChosen.emit(supplier.id);
  }
  
  

  rejectAll() {
    this.rejectedAll.emit();
  }
}
