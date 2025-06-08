import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


// טיפוס מורחב שכולל את כל האפשרויות לכל סוגי הספקים
interface ExtendedSupplier extends Record<string, any> {
  supplier_type: 'dj' | 'photographer' | 'catering' | 'speaker' | 'location';
  image_url: string;
  name: string;
  region: string;
  available_days: string[];
  rating: number;
  rating_count: number;
  additional_info: string;
  contact_info: string;
  djs?: any[];
  caterings?: any[];
  photographers?: any[];
  speakers?: any[];
  locations?: any[];
}

@Component({
  selector: 'app-supplier-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './supplier-details-dialog.component.html',
  styleUrls: ['./supplier-details-dialog.component.scss']
})
export class SupplierDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SupplierDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public supplier: ExtendedSupplier
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
