import { Component, Input } from '@angular/core';
import { Ticket } from '../../../models';
import { PlayDateFormatPipe } from "../../../shared/pipes/playDateFormat.pipe";


@Component({
  selector: 'app-ticket-component',
  imports: [PlayDateFormatPipe],
  templateUrl: './ticket-component.html',
  styleUrl: './ticket-component.css'
})
export class TicketComponent {
  @Input() ticket!: Ticket | null;


  ngOnInit(): void {
  }
}
