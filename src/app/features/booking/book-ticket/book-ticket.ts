import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common'
import { AuthService, PlaysService } from '../../../core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Booking, Play } from '../../../models';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlayItem } from "../../../shared/components";
import { BookingService } from '../../../core/services/booking.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-book-ticket',
  imports: [ReactiveFormsModule, PlayItem, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './book-ticket.html',
  styleUrl: './book-ticket.css'
})
export class BookTicket implements OnInit {
  private authService = inject(AuthService);
  private playsService = inject(PlaysService);
  private bookingService = inject(BookingService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);

  bookTicketForm: FormGroup;
  playId: string | null = null;
  playName: string | null = null;
  loading: boolean = true;

  playSubject = new BehaviorSubject<Play | null>(null);
  play$: Observable<Play | null>;

  readonly currentUser = this.authService.currentUser;

  constructor(private cdr: ChangeDetectorRef) {
    this.bookTicketForm = this.formBuilder.group({
      seats: ['', [Validators.required, Validators.min(1)]],
    })

    this.playId = this.route.snapshot.paramMap.get('playId');

    this.play$ = this.playsService.getPlay(this.playId);
    this.play$.subscribe((play) => {
      if (play) {
        this.playName = play.playName;
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 1000);
  }

  onSubmit(): void {
    if (this.bookTicketForm.valid && this.playId) {
      const seats = this.bookTicketForm.get('seats')?.value;
      
      const bookingData: Booking = {
        userId: this.authService.currentUser()?.['_id'] || '',
        playId: this.playId,
        seats: Number(seats),
      }

      this.bookingService.createBooking(bookingData).subscribe({
        next: () => this.router.navigate(['/confirmation']),
        error: (err) => {
          console.error('Failed to create booking:', err);
          this.markFormGroupTouched();
        }
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.values(this.bookTicketForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
