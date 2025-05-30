import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-guest-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './guest-upload.component.html',
  styleUrls: ['./guest-upload.component.scss']
})
export class GuestUploadComponent {
  guestList: string[] = [];

  @Output() guestsConfirmed = new EventEmitter<string[]>();

  onGuestFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      this.guestList = rows
        .map((r: any[]) => r[0])
        .filter((val: any) => typeof val === 'string' && val.trim().length > 0);
    };

    reader.readAsArrayBuffer(file);
  }

  confirmGuests(): void {
    if (this.guestList.length > 0) {
      this.guestsConfirmed.emit(this.guestList);
    }
  }
}
