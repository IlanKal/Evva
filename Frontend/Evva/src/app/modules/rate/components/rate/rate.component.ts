import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RateService } from '../../../../services/rate.service';

@Component({
  selector: 'app-rate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  guestId!: number;
  eventId!: number;
  isUser: boolean = false;
  hasRated = false;

  suppliers: any[] = [];
  rateForm!: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private rateService: RateService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pathSegments = this.route.snapshot.url.map(segment => segment.path);
    this.isUser = pathSegments.includes('user');
  
    const eventIdParam = this.route.snapshot.paramMap.get('eventId');
    if (!eventIdParam) {
      this.errorMessage = 'Missing event ID.';
      return;
    }
  
    this.eventId = +eventIdParam;
  
    if (this.isUser) {
      const userIdParam = this.route.snapshot.paramMap.get('userId');
      const userId = +(userIdParam || localStorage.getItem('userId') || 0);
      if (!userId) {
        this.errorMessage = 'User not logged in.';
        return;
      }
  
      this.rateService.getSuppliersForUser(userId, this.eventId).subscribe({
        next: (data) => {
          this.suppliers = data.suppliers;
          this.createForm();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to load suppliers.';
        }
      });
    } else {
      const guestIdParam = this.route.snapshot.paramMap.get('guestId');
      if (!guestIdParam) {
        this.errorMessage = 'Missing guest ID.';
        return;
      }
  
      this.guestId = +guestIdParam;
  
      // ✅ בדיקה אם אורח כבר דירג
      this.rateService.hasGuestRated(this.guestId, this.eventId).subscribe({
        next: (hasRated) => {
          if (hasRated) {
            this.router.navigate(['/rate-page/thank-you'], {
              queryParams: { type: 'guest' }
            });
            return;
          }
  
          // המשך רגיל – הבאת הספקים
          this.rateService.getSuppliersForGuest(this.guestId, this.eventId).subscribe({
            next: (data) => {
              this.suppliers = data.suppliers;
              this.createForm();
            },
            error: (err) => {
              console.error(err);
              this.errorMessage = 'Failed to load suppliers.';
            }
          });
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to check rating status.';
        }
      });
    }
  }  

  createForm(): void {
    const group: any = {};
    this.suppliers.forEach(supplier => {
      group[`rating_${supplier.supplier_id}`] = new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]);
    });
    this.rateForm = this.fb.group(group);
  }

  getRatingValue(supplierId: number): number {
    return this.rateForm?.get(`rating_${supplierId}`)?.value || 0;
  }

  setRating(supplierId: number, value: number): void {
    this.rateForm.get(`rating_${supplierId}`)?.setValue(value);
  }

  getStarClass(supplierId: number, star: number): string {
    const rating = this.getRatingValue(supplierId);
    if (rating >= star) {
      return 'full';
    } else if (rating >= star - 0.5) {
      return 'half';
    } else {
      return 'empty';
    }
  }

  handleStarClick(event: MouseEvent, supplierId: number, star: number): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const half = rect.width / 2;
    const rating = clickX < half ? star - 0.5 : star;
    this.setRating(supplierId, rating);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.rateForm.invalid) {
      return;
    }

    const ratings = this.suppliers.map(supplier => ({
      supplier_id: supplier.supplier_id,
      rating: this.rateForm.get(`rating_${supplier.supplier_id}`)?.value
    }));

    const payload = {
      guest_id: this.isUser ? undefined : this.guestId,
      user_id: this.isUser ? +(localStorage.getItem('userId') || 0) : undefined,
      event_id: this.eventId,
      ratings
    };

    this.rateService.submitRatings(payload).subscribe({
      next: () => {
        this.router.navigate(['/rate-page/thank-you'], {
          queryParams: { type: this.isUser ? 'user' : 'guest' }
        });
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err?.error?.message || 'Failed to submit ratings.';
      }
    });
  }
}
