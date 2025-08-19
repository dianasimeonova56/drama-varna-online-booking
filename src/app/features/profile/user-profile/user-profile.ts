import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService, BookingService } from '../../../core/services';
import { RouterLink } from '@angular/router';
import { PopulatedBooking, User } from '../../../models';

@Component({
  selector: 'app-user-profile',
  imports: [RouterLink],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit {
  private bookingService = inject(BookingService);
  private authService = inject(AuthService);
  isOpen = signal(true);
  bookedPlaysNum = signal(0);
  user = { ...this.authService.currentUser() };

  editing = false;

  ngOnInit(): void {
    this.bookingService.getBookings(this.user._id ?? null).subscribe({
      next: (plays: PopulatedBooking[]) => this.bookedPlaysNum.set((plays?.length) ?? 0),
      error: (err) => {
        throw new Error(err);
      }
    });
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
