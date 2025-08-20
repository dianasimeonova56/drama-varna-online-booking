import { Component, inject } from '@angular/core';
import { ErrorService } from '../../../core/services';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-error-notification',
  imports: [],
  templateUrl: './error-notification.html',
  styleUrl: './error-notification.css',
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class ErrorNotification {
  protected errorService = inject(ErrorService)

  readonly error = this.errorService.error;
}
