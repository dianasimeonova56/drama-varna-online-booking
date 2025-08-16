import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService, TicketsService, PlaysService } from '../../../core/services';
import { Booking, Play, Ticket } from '../../../models';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit {
  authService = inject(AuthService);
  ticketsService = inject(TicketsService);
  bookingService = inject(BookingService);
  playService = inject(PlaysService);
  isOpen = signal(true);


  editing = false;
  user = { ...this.authService.currentUser() };
  tickets = signal<Ticket[]>([])
  bookings = signal<Booking[]>([]);
  plays = signal<Play[]>([]);


  ngOnInit(): void {
    if (this.user?._id) {
      this.ticketsService.getTickets(this.user._id).subscribe({
        next: (t) => this.tickets.set(t),
        error: (err) => console.error('Failed to load tickets', err)
      });
      this.bookingService.getBookings(this.user._id).subscribe({
        next: (b) => this.bookings.set(b),
        error: (err) => console.error('Failed to load bookings', err)
      });
    }
  }

  togglePlays() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  toggleEdit() {
    this.editing = !this.editing;
    if (this.editing) {
      this.user = { ...this.authService.currentUser() };
    }
  }

  // save() {
  //   this.authService.updateUser(this.userCopy).subscribe(() => {
  //     this.editing = false;
  //   });
  // }
}
