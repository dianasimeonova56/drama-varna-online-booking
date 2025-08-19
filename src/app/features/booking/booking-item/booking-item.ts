import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { PopulatedBooking, Ticket } from '../../../models';
import { PlayDateFormatPipe } from "../../../shared/pipes/playDateFormat.pipe";
import { TicketComponent } from '../../ticket/ticket-component/ticket-component';
import { TicketsService } from '../../../core/services';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-item',
  imports: [PlayDateFormatPipe, TicketComponent, CommonModule],
  templateUrl: './booking-item.html',
  styleUrl: './booking-item.css'
})
export class BookingItem {
  @Input() booking!: PopulatedBooking;
  tickets: Ticket[] | null = null;
  expanded = false;

  private ticketsService = inject(TicketsService);

  constructor(private cdr: ChangeDetectorRef) {
    //this.tickets$ = this.ticketsService.tickets$;
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
