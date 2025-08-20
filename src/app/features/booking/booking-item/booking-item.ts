import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { PopulatedBooking, Ticket } from '../../../models';
import { PlayDateFormatPipe } from "../../../shared/pipes/playDateFormat.pipe";
import { TicketComponent } from '../../ticket/ticket-component/ticket-component';
import { TicketsService } from '../../../core/services';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-booking-item',
  imports: [PlayDateFormatPipe, TicketComponent, CommonModule, MatProgressSpinnerModule],
  templateUrl: './booking-item.html',
  styleUrl: './booking-item.css'
})
export class BookingItem implements OnInit{
  @Input() booking!: PopulatedBooking;
  tickets: Ticket[] | null = null;
  expanded = false;
  loading = true;

  private ticketsService = inject(TicketsService);

  constructor(private cdr: ChangeDetectorRef) {
    //this.tickets$ = this.ticketsService.tickets$;
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 1000);
  }

  toggleTickets() {
    this.expanded = !this.expanded;

    if (!this.tickets) {
      this.ticketsService.getTickets(this.booking._id).subscribe({
        next: (tickets) => {
          this.tickets = tickets;
          this.cdr.markForCheck()
        },
        error: (err) => console.error(err)
      });
    }
  }
}
