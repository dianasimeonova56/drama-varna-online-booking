import { Component, inject, OnInit } from '@angular/core';
import { BookingService } from '../../../core/services/booking.service';
import { Observable } from 'rxjs';
import { PopulatedBooking } from '../../../models';
import { AuthService } from '../../../core/services';
import { BookingItem } from "../booking-item/booking-item";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  imports: [BookingItem, CommonModule],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css'
})
export class MyBookings implements OnInit {
  private bookingsService = inject(BookingService);
  private authService = inject(AuthService);

  bookings$: Observable<PopulatedBooking[]>;
  userId: string | null = '';

  constructor() {
    this.bookings$ = this.bookingsService.populatedBookings$;
  }

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
    this.bookingsService.getBookings(this.userId).subscribe({
      next: (bookings) => { },
      error: (err) => {
        console.error('Failed to load bookings', err);
      }
    });
  }

}
