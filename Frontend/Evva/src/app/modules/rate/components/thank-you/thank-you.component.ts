import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  isUser = false;
  userId: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const type = this.route.snapshot.queryParamMap.get('type');
    this.userId = localStorage.getItem('userId');
    this.isUser = type === 'user' && this.userId !== null;
  }

  goBack(): void {
    if (this.userId) {
      this.router.navigate(['/my-events']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
