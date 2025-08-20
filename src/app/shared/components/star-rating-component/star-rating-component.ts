import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { PlaysService } from '../../../core/services/plays.service';
import { CommonModule } from '@angular/common';
import { AuthService, ErrorService } from '../../../core/services';

@Component({
  selector: 'app-star-rating-component',
  imports: [FaIconComponent, CommonModule],
  templateUrl: './star-rating-component.html',
  styleUrl: './star-rating-component.css'
})
export class StarRatingComponent implements OnInit {
  private errorService = inject(ErrorService)
  @Input() rating!: number | null;
  @Input() playId!: string;
  @Output() ratingUpdated = new EventEmitter<number>();
  protected authService = inject(AuthService);
  faStar = faStar;
  hasRated = false;
  justRated = false;
  triedToRateAgain = false;

  constructor(private playsService: PlaysService) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.hasRated = true;
      return;
    }
    this.playsService.getUserRating(this.playId).subscribe({
      next: ({ hasRated }) => {
        this.hasRated = hasRated;
      },
      error: (err) => {
        this.errorService.setError(`Failed to get ratings: ${err}`)
      }
    })
  }

  setRating(value: number) {
    if (!this.authService.isLoggedIn()) {
      this.errorService.setError("Guest cannot rate plays")
    }
    if (this.hasRated) {
      this.triedToRateAgain = true;
      return;
    };

    this.hasRated = true;

    this.playsService.addRating(this.playId, value)
      .subscribe({
        next: response => {
          const newAverage = response.averageRating;
          this.rating = Number(newAverage.toFixed(2));
          this.ratingUpdated.emit(newAverage)
          this.justRated = true;
        },
        error: err => {
          this.justRated = false;
          this.errorService.setError(`Failed to rate play: ${err}`)
        }
      })
  }
}
