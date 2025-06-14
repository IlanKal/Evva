import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { EventResultsService } from '../../../services/event-results.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IGuest } from '../../../models/iGuest';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-guest-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule
  ],
  templateUrl: './guest-upload.component.html',
  styleUrls: ['./guest-upload.component.scss']
})
export class GuestUploadComponent implements OnInit, AfterViewInit {
  @Output() guestsConfirmed = new EventEmitter<IGuest[]>();
  @Output() allGuestsApproved = new EventEmitter<void>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  requestId!: number;
  guests: IGuest[] = [];
  dataSource!: MatTableDataSource<IGuest>;
  selectedFile: File | null = null;
  editingGuest: IGuest | null = null;
  displayedColumns: string[] = ['full_name', 'email', 'phone', 'rsvp'];
  displayedColumnsWithActions = [...this.displayedColumns, 'actions'];
  searchTerm: string = '';

  constructor(
    private eventResultsService: EventResultsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('requestId');
    if (paramId) {
      this.requestId = Number(paramId);
      this.loadGuests();
    } else {
      console.error('❌ requestId not found in route');
    }
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  initializeSorting(): void {
    if (this.dataSource && this.sort) {
      const rsvpOrder: Record<string, number> = {
        'APPROVED': 1,
        'PENDING': 2,
        'REJECTED': 3
      };

      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'full_name':
          case 'email':
            return (item[property as keyof IGuest] as string)?.toLowerCase() || '';
          case 'phone':
            return item.phone || '';
          case 'rsvp':
            return rsvpOrder[(item.rsvp || '').toUpperCase()] ?? 99;
          default:
            return (item as any)[property];
        }
      };
    }
  }

  loadGuests(): void {
    this.eventResultsService.getEventByRequestId(this.requestId).subscribe({
      next: (event) => {
        this.eventResultsService.getGuestsByEventId(event.event_id).subscribe({
          next: (guests: IGuest[]) => {
            this.guests = guests;
            this.dataSource = new MatTableDataSource(this.guests);

            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.initializeSorting();
            });

            this.dataSource.filterPredicate = (data: IGuest, filter: string) => {
              return (
                data.full_name.toLowerCase().includes(filter) ||
                data.email.toLowerCase().includes(filter) ||
                data.phone.includes(filter)
              );
            };

            this.applyFilter();
          },
          error: (err) => console.error('❌ Failed to fetch guests:', err)
        });
      },
      error: (err) => console.error('❌ Failed to get eventId from requestId:', err)
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.dataSource.filter = term;
  }

  startEdit(guest: IGuest): void {
    this.editingGuest = { ...guest };
  }

  cancelEdit(): void {
    this.editingGuest = null;
  }

  saveGuest(originalGuest: IGuest): void {
    if (!this.editingGuest) return;
    this.eventResultsService.updateGuest(originalGuest.guest_id, this.editingGuest).subscribe({
      next: () => {
        Object.assign(originalGuest, this.editingGuest);
        this.editingGuest = null;
        this.checkAllGuestsApproved();
        this.applyFilter();
      },
      error: (err) => console.error('❌ Failed to update guest:', err)
    });
  }

  deleteGuest(guest: IGuest): void {
    if (!confirm(`Are you sure you want to delete ${guest.full_name}?`)) return;
    this.eventResultsService.deleteGuest(guest.guest_id).subscribe({
      next: () => {
        this.guests = this.guests.filter(g => g.guest_id !== guest.guest_id);
        this.dataSource.data = this.guests;
        this.applyFilter();
      },
      error: (err) => console.error('❌ Failed to delete guest:', err)
    });
  }

  onGuestFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    this.selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      this.guests = rows.map((r) => ({
        full_name: r[0],
        email: r[1],
        phone: r[2],
        rsvp: r[3],
      })) as IGuest[];
    };
    reader.readAsArrayBuffer(this.selectedFile);
  }

  confirmGuests(): void {
    if (!this.selectedFile) return;
    this.eventResultsService.getEventByRequestId(this.requestId).subscribe({
      next: (event) => {
        this.eventResultsService.uploadGuestsFile(event.event_id, this.selectedFile!).subscribe({
          next: () => {
            this.loadGuests();
            this.selectedFile = null;
            setTimeout(() => this.guestsConfirmed.emit(this.guests), 500);
          },
          error: (err) => {
            console.error('❌ Failed to upload guest file:', err);
            alert('Failed to upload guest list');
          }
        });
      },
      error: (err) => console.error('❌ Failed to get eventId:', err)
    });
  }

  getRsvpClass(status: string): string {
    switch (status) {
      case 'APPROVED': return 'rsvp-approved';
      case 'REJECTED': return 'rsvp-rejected';
      case 'PENDING':
      default: return 'rsvp-pending';
    }
  }

  checkAllGuestsApproved() {
    const allApproved = this.guests.length > 0 && this.guests.every(g => g.rsvp === 'APPROVED');
    if (allApproved) {
      this.allGuestsApproved.emit();
    }
  }

}
