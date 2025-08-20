import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-confirmation',
  imports: [RouterModule],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class Confirmation {
  ngOnInit() {}
}
