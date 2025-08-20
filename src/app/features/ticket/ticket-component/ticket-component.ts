import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Ticket } from '../../../models';
import { PlayDateFormatPipe } from "../../../shared/pipes/playDateFormat.pipe";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-ticket-component',
  imports: [PlayDateFormatPipe, MatProgressSpinnerModule],
  templateUrl: './ticket-component.html',
  styleUrl: './ticket-component.css'
})
export class TicketComponent {
  @Input() ticket!: Ticket | null;
  loading =  true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 1000);
  }
}
