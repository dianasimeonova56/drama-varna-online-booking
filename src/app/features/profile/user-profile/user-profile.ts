import { Component, inject, OnInit } from '@angular/core';
import { AuthService, TicketsService } from '../../../core/services';
import { Ticket } from '../../../models';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit {
  authService = inject(AuthService);
  ticketsService = inject(TicketsService);

  editing = false;
  user = { ...this.authService.currentUser() };
  tickets: Ticket[] = [];


  ngOnInit(): void {
    if (this.user?._id) {
      this.ticketsService.getTickets(this.user._id).subscribe(t => {
        this.tickets = t;
        console.log(this.tickets.length);
        
      });
    }
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
