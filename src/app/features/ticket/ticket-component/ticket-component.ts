import { Component, Input } from '@angular/core';
import { Ticket } from '../../../models';
// import { PlayDateFormatPipe } from "../../pipes/playDateFormat.pipe";

@Component({
  selector: 'app-ticket-component',
  imports: [],
  templateUrl: './ticket-component.html',
  styleUrl: './ticket-component.css'
})
export class TicketComponent {
@Input() ticket!: Ticket | null;
  

  ngOnInit(): void {
  }
}
